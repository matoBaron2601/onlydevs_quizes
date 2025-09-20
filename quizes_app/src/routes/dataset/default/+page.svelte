<script lang="ts">
  import { goto } from '$app/navigation';
  import { queryClient } from '$lib/queryClient';
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import { onMount } from 'svelte';
  import CollectionCardContainer from '../common/components/CollectionCardContainer.svelte';
  import Spinner from '../../../components/Spinner.svelte';

  import populateDefaultCollection from './services/populateDefaultCollection';
  import getDefaultUniqueTechnologies from './services/getDefaultUniqueTechnologies';
  import CollectionsCard from '../common/components/CollectionsCard.svelte';
  import createDefaultCollection from './services/createDefaultCollection';
  import deleteDefaultCollection from './services/deleteDefaultCollection';
  import getDefaultCollection from './services/getDefaultCollection';

  onMount(async () => {
    const res2 = await fetch('/api/auth/user');
    if (res2.status === 401) {
      goto('/login');
    }
  });

  const getDefaultCollectionQuery = createQuery({
    queryKey: ['get-collection'],
    queryFn: async () => await getDefaultCollection(),
  });

  const getUniqueTechnologiesQuery = createQuery({
    queryKey: ['get-unique-technologies'],
    queryFn: async () => await getDefaultUniqueTechnologies(),
  });

  const createDefaultCollectionMutation = createMutation({
    mutationFn: async () => await createDefaultCollection(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-collection'] });
    },
  });

  const deleteDefaultCollectionMutation = createMutation({
    mutationFn: async () => await deleteDefaultCollection(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-collection'] });
    },
  });

  const populateDefaultCollectionMutation = createMutation({
    mutationFn: async () => await populateDefaultCollection(),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['get-unique-technologies'] });
    },
  });
</script>

<div class="h-full">
  {#if $getDefaultCollectionQuery.isLoading}
    <Spinner />
  {:else if $getDefaultCollectionQuery.data && $getDefaultCollectionQuery.data.length > 0}
    <div class="flex gap-4 mx-auto justify-center items-center">
      <button
        class="cursor-pointer text-[var(--color1)] h-20 w-40 bg-red-500 rounded-md"
        on:click={async () =>
          await $deleteDefaultCollectionMutation.mutateAsync()}
      >
        Delete default collection
      </button>
      <button
        on:click={async () =>
          await $populateDefaultCollectionMutation.mutateAsync()}
        class="text-[var(--color1)] bg-[var(--color3)] p-2 rounded-lg shadow-lg cursor-pointer transition-colors hover:bg-[var(--color2)] hover:text-[var(--color1)] h-20 w-40"
      >
        {#if $populateDefaultCollectionMutation.isPending}
          <Spinner />
        {:else}
          Populate default data
        {/if}
      </button>
    </div>
  {:else}
    <div
      class="flex bg-[var(--color3)] mx-auto h-20 w-40 justify-center items-center rounded-md"
    >
      <button
        class="cursor-pointer text-[var(--color1)] w-full h-full"
        on:click={async () =>
          await $createDefaultCollectionMutation.mutateAsync()}
      >
        Create default collection
      </button>
    </div>
  {/if}

  <CollectionCardContainer>
    {#if $getUniqueTechnologiesQuery.data && $getUniqueTechnologiesQuery.data.length > 0}
      {#each $getUniqueTechnologiesQuery.data as tech}
        <CollectionsCard
          name={tech.technology}
          isDefault
          documentsCount={tech.count}
        ></CollectionsCard>
      {/each}
    {/if}
  </CollectionCardContainer>
</div>
