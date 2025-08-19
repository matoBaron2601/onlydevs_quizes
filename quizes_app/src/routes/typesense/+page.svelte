<script lang="ts">
  import { onMount } from 'svelte';
  import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';
  import handleFetchCollections from './handlers/handleGetCollections';
  import { handleCreateCollectionV1 } from './handlers/handleCreateCollections';
  import { CollectionName } from '../../typesense/types';
  import { handleDeleteCollectionV1 } from './handlers/handleDeleteCollections';
  import { handlePopulateCollectionV1 } from './handlers/handlePopulateCollections';
  import Modal from '../../components/Modal.svelte';
  import chunkFile from '../../server/chunkerServer';
  import { fetchData } from '../api/utils';

  let collections: CollectionSchema[] | null = null;
  let isModalOpen = false;
  let selectedFile: File | null = null;

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

  const handleFileUpload = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      selectedFile = fileInput.files[0]; // Store the selected file
      console.log('File selected:', selectedFile.name);
    }
  };
  const uploadFile = async () => {
    if (!selectedFile) {
      console.log('No file selected for upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    await fetch('api/chunker', {
      method: 'POST',
      body: formData, 
    });
  };
</script>

<div
  class="flex justify-center items-center min-h-screen bg-[var(--color1)] gap-20"
>
  <div
    class="bg-[var(--color4)] rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
  >
    <h1 class="text-4xl font-bold text-[var(--color2)] mb-8">Collections</h1>
    {#if collections && collections.length > 0}
      <ul class="mt-8 space-y-4">
        {#each collections as collection}
          <li>
            <button
              type="button"
              class="w-full text-left text-[var(--color2)] bg-[var(--color1)] p-4 rounded-lg shadow cursor-pointer"
              on:click={() => {
                isModalOpen = true;
              }}
            >
              {collection.name}
            </button>
            <div class="ml-5 mt-2 text-gray-300">
              {JSON.stringify(
                collection.fields.map((field) => ({
                  name: field.name,
                  type: field.type,
                })),
                null,
                2
              )}
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-center text-[var(--color2)] mt-4">No collections found.</p>
    {/if}
  </div>

  <div
    class="bg-[var(--color4)] rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
  >
    <h1 class="text-4xl font-bold text-[var(--color2)] mb-8">
      Manage Collections
    </h1>

    {#each BUTTONS as button}
      {#if button.condition()}
        <button
          on:click={button.action}
          class="w-full py-4 rounded-lg shadow-lg font-semibold transition-colors mb-4 cursor-pointer"
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
  <div
    class="bg-[var(--color4)] rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
  >
    <h1 class="text-4xl font-bold text-[var(--color2)] mb-8">
      Import materials
    </h1>

    <button class="cursor-pointer" on:click={uploadFile}>
      <span class="text-[var(--color2)]">Import</span>
    </button>
    <input
      id="fileInput"
      type="file"
      accept=".txt"
      style=""
      on:change={handleFileUpload}
    />
  </div>
  <Modal
    onClose={() => (isModalOpen = false)}
    isOpen={isModalOpen}
    content="This is the content of the modal."
  />
</div>
