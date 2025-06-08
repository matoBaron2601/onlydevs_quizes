<script lang="ts">
  import { onMount } from 'svelte';
  import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';
  import handleFetchCollections from './handlers/handleGetCollections';
  import { handleCreateCollectionV1 } from './handlers/handleCreateCollections';
  import { CollectionName } from '../../typesense/types';
  import { handleDeleteCollectionV1 } from './handlers/handleDeleteCollections';
  import { handlePopulateCollectionV1 } from './handlers/handlePopulateCollections';
  
  let collections: CollectionSchema[] | null = null;

  const collectionExists = (name: string) => {
    return collections?.some(collection => collection.name === name);
  };

  const BUTTONS = [
    {
      label: `Create and populate ${CollectionName.collectionV1}`,
      action: async () => {
        await handleCreateCollectionV1();
        await handlePopulateCollectionV1();
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
          <li
            class="text-[var(--color2)] bg-[var(--color1)] p-4 rounded-lg shadow"
          >
            {collection.name}
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
    <h1 class="text-4xl font-bold text-[var(--color2)] mb-8">Manage Collections</h1>

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
</div>