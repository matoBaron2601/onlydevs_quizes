<script lang="ts">
  import { goto } from '$app/navigation';
  import { createQuery } from '@tanstack/svelte-query';
  import { onMount } from 'svelte';
  import CollectionCardContainer from '../common/components/CollectionCardContainer.svelte';

  import CollectionsCard from '../common/components/CollectionsCard.svelte';
  import getCustomUniqueTechnologies from './services/getCustomUniqueTechnologies';

  onMount(async () => {
    const res2 = await fetch('/api/auth/user');
    if (res2.status === 401) {
      goto('/login');
    }
  });

  const getUniqueTechnologiesQuery = createQuery({
    queryKey: ['get-unique-technologies'],
    queryFn: async () => await getCustomUniqueTechnologies(),
  });
</script>

<div class="h-full bg-customColor6">
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
