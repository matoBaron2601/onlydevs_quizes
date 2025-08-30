<script lang="ts">
  import { onMount } from 'svelte';
  import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';
  import handleFetchCollections from './handlers/handleGetCollections';
  import { handleCreateCollectionV1 } from './handlers/handleCreateCollections';
  import { CollectionName } from '../../typesense/types';
  import { handleDeleteCollectionV1 } from './handlers/handleDeleteCollections';
  import Modal from '../../components/Modal.svelte';
  import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
  import { createMutation } from '@tanstack/svelte-query';
  import fetchAllCollectionDocuments from './handlers/fetchAllCollectionDocuments';

  let collections: CollectionSchema[] | null = null;
  let isModalOpen = false;
  let selectedFile: File | null = null;
  let currentCollectionFoundDocuments = 0;
  let currentCollectionSchema: string = '';
  let isFileUploadLoading = false;
  onMount(async () => {
    const res = await fetch('http://localhost:5173/api/auth/user', {
      method: 'GET',
      credentials: 'include', // Important for sending cookies
    });

    if (!res.ok) {
      // Handle error response
      console.log('Error response:', res.status, res.statusText);
      return;
    }

    // Read the response body as JSON
    const data = await res.json();
    console.log(data); // This will log the actual response data
  });
  const mutation = createMutation({
    mutationFn: fetchAllCollectionDocuments,
    onSuccess(data: SearchResponse<object>) {
      currentCollectionFoundDocuments = data.found;
    },
    onError(error: Error) {
      console.error('Error fetching data:', error);
    },
  });
  const uploadFileMutation = createMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('api/chunker', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      return response.json();
    },
    onMutate() {
      isFileUploadLoading = true; // Set loading state before mutation starts
    },
    onSuccess(data) {
      console.log('File uploaded successfully:', data);
      // Handle any additional logic after a successful upload
    },
    onError(error: Error) {
      console.error('Error uploading file:', error);
    },
    onSettled() {
      isFileUploadLoading = false; // Reset loading state after mutation finishes
    },
  });

  const handleModalOpen = (collection: CollectionSchema) => {
    $mutation.mutate();
    currentCollectionSchema = JSON.stringify(
      collection.fields.map((field) => ({
        name: field.name,
        type: field.type,
      })),
      null,
      2
    );
  };

  const collectionExists = (name: string) => {
    return collections?.some((collection) => collection.name === name);
  };

  const BUTTONS = [
    {
      label: `Create and populate ${CollectionName.collectionV1}`,
      action: async () => {
        await handleCreateCollectionV1();
        // await handlePopulateCollectionV1();
        collections = await handleFetchCollections();
      },
      condition: () => !collectionExists(CollectionName.collectionV1),
    },
    {
      label: `Delete ${CollectionName.collectionV1}`,
      action: async () => {
        await handleDeleteCollectionV1();
        collections = await handleFetchCollections();
      },
      condition: () => collectionExists(CollectionName.collectionV1),
    },
  ];

  onMount(async () => {
    collections = await handleFetchCollections();
  });

  const handleFileUpload = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      selectedFile = fileInput.files[0];

      const formData = new FormData();
      formData.append('file', selectedFile);
      await $uploadFileMutation.mutateAsync(formData);
    }
  };
  function triggerFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
</script>

<div
  class="flex justify-center items-center min-h-screen bg-[var(--color1)] gap-20"
>
  <div
    class="bg-[var(--color4)] rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
  >
    <h1 class="text-4xl font-bold text-[var(--color2)] mb-8">
      Default Collections
    </h1>

    {#if collections && collections.length > 0}
      <ul class="mt-8 space-y-4">
        {#each collections as collection}
          <li class="flex gap-4">
            <button
              type="button"
              class="w-full text-center text-[var(--color2)] bg-[var(--color1)] p-4 rounded-lg shadow cursor-pointer"
              on:click={() => {
                handleModalOpen(collection);
                isModalOpen = true;
              }}
            >
              {collection.name}
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
        {/each}
      </ul>
    {/if}
    {#each BUTTONS as button}
      {#if button.condition()}
        <button
          on:click={button.action}
          class="w-full py-4 rounded-lg shadow-lg font-semibold transition-colors mb-4 cursor-pointer mt-4"
          class:bg-[var(--color3)]={button.label.startsWith('Create')}
          class:bg-[var(--color6)]={button.label.startsWith('Delete')}
          class:text-[var(--color1)]={true}
          class:focus:outline-none={true}
          class:focus:ring-2={true}
          class:focus:ring-[var(--color3)]={true}
        >
          {button.label}
        </button>
      {/if}
    {/each}
  </div>
  <Modal onClose={() => (isModalOpen = false)} isOpen={isModalOpen}>
    <p>
      Documents found: {currentCollectionFoundDocuments}
    </p>
    <p>
      Schema: {currentCollectionSchema}
    </p>
  </Modal>
</div>
