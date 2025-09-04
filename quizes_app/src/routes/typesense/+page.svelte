<script lang="ts">
  import { onMount } from 'svelte';
  import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';
  import { createMutation } from '@tanstack/svelte-query';
  import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
  import handleGetCollectionDocuments from './handlers/handleGetCollectionDocuments';
  import handleChunkFile from './handlers/handleChunkFile';
  import Card from '../../components/Card.svelte';
  import handleGetCollections from './handlers/handleGetCollections';
  import { CollectionNames } from './constants';
  import handleCreateCollection from './handlers/handleCreateCollection';
  import { goto } from '$app/navigation';
  import Modal from '../../components/Modal.svelte';
  import { handleDeleteCollectionV1 } from './handlers/handleDeleteCollection';

  let collections: CollectionSchema[] | null = null;
  let collectionDocumentCount: number | null = null;
  let isLoadingCreateCollection = false;
  let isFileUploadLoading = false;
  let currentCollectionSchema: string = '';
  let selectedFile: File | null = null;
  let isModalOpen = false;
  let defaultCollections = [CollectionNames.collectionV1];

  onMount(async () => {
    const res2 = await fetch('api/auth/user');
    if (res2.status === 401) {
      goto('/login');
    }
    collections = await handleGetCollections();
  });

  const getCollectionDocumentsMutation = createMutation({
    mutationFn: handleGetCollectionDocuments,
    onSuccess(data: SearchResponse<object>) {
      collectionDocumentCount = data.found;
    },
  });

  const uploadFileMutation = createMutation({
    mutationFn: async (formData: FormData) => {
      await handleChunkFile(formData);
    },
    onMutate() {
      isFileUploadLoading = true;
    },
    onSettled() {
      isFileUploadLoading = false;
    },
  });

  const handleOpenModal = (collection: CollectionSchema) => {
    $getCollectionDocumentsMutation.mutate();
    currentCollectionSchema = JSON.stringify(
      collection.fields.map((field) => ({
        name: field.name,
        type: field.type,
      })),
      null,
      2
    );
  };

  const handleFileUpload = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      selectedFile = fileInput.files[0];

      const formData = new FormData();
      formData.append('file', selectedFile);
      await $uploadFileMutation.mutateAsync(formData);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  $: defaultCollectionsMap = defaultCollections.map((name) => {
    const collection = collections?.find(
      (collection) => collection.name === name
    );
    return { name, collection: collection || null };
  });
</script>

<div>
  <div
    class="flex justify-center items-center min-h-screen bg-[var(--color1)] gap-20"
  >
    <Card title="Default Collections">
      {#if defaultCollectionsMap.length === 0}
        <span>No collections found</span>
      {:else}
        {#each defaultCollectionsMap as { name, collection }}
          <div>
            {#if !collection}
              <button
                on:click={async () => {
                  isLoadingCreateCollection = true;
                  await handleCreateCollection(name);
                  collections = await handleGetCollections();
                  isLoadingCreateCollection = false;
                }}
                class="w-full py-4 rounded-lg shadow-lg font-semibold transition-colors mb-4 cursor-pointer mt-4 bg-[var(--color3)] text-[var(--color1)]"
                >{isLoadingCreateCollection ? 'Creating...' : 'Create collection'}</button
              >
            {:else}
              <div class="flex flex-col w-full gap-2">
                <li class="flex gap-4">
                  <button
                    type="button"
                    class="w-full text-center text-[var(--color2)] bg-[var(--color1)] p-4 rounded-lg shadow cursor-pointer"
                    on:click={() => {
                      handleOpenModal(collection);
                      isModalOpen = true;
                    }}
                  >
                    {name}
                  </button>
                  <button
                    type="button"
                    on:click={triggerFileInput}
                    class="text-[var(--color2)] bg-[var(--color1)] p-2 rounded-lg shadow-lg cursor-pointer transition-colors hover:bg-[var(--color2)] hover:text-[var(--color1)]"
                    aria-label="Upload File"
                  >
                    {#if isFileUploadLoading}
                      <span>Loading...</span>
                    {:else}
                      <span>Upload File</span>
                    {/if}
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".txt"
                    class="hidden"
                    on:change={handleFileUpload}
                  />
                </li>
                <button
                  on:click={async () => {
                    await handleDeleteCollectionV1();
                    collections = await handleGetCollections();
                  }}
                  class="w-full py-4 rounded-lg shadow-lg font-semibold transition-colors mb-4 cursor-pointer mt-4 bg-red-500 text-[var(--color1)]"
                  >Delete collection</button
                >
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </Card>
  </div>
  <Modal onClose={() => (isModalOpen = false)} isOpen={isModalOpen}>
    <p>
      Documents found: {collectionDocumentCount}
    </p>
    <p>
      Schema: {currentCollectionSchema}
    </p>
  </Modal>
</div>
