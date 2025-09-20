<script lang="ts">
  import Spinner from '../../../../components/Spinner.svelte';

  export let name: string | null = null;
  export let documentsCount: number | null = null;
  export let isDefault: boolean | null = null;
  export let onDelete: (() => Promise<void>) | null = null;
  export let isDeletePending: boolean | null = null;
</script>

<div
  class="bg-[var(--color3)] rounded-3xl shadow-xl p-8 not-visited:w-full text-center flex flex-col gap-4 justify-between min-h-[100px] cursor-pointer"
>
  <h1 class="text-3xl font-bold text-[var(--color4)]">
    {name}
  </h1>
  <div>
    <div class="flex justify-between text-[var(--color4)]">
      <span>Number of documents</span>
      <span>{documentsCount}</span>
    </div>
  </div>

  {#if !isDefault}
    <button
      on:click={onDelete}
      class="w-full py-4 rounded-lg shadow-lg font-semibold transition-colors cursor-pointer mt-auto bg-red-500 text-[var(--color1)]"
    >
      {#if isDeletePending}
        <Spinner />
      {:else}
        Delete collection
      {/if}
    </button>
  {/if}
</div>
