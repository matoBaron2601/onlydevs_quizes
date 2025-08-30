<script lang="ts">
  export let isOpen: boolean;
  export let onClose: () => void;

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });
</script>

{#if isOpen}
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100 backdrop-blur-sm"
  >
    <div
      class="md:w-1/3 bg-[var(--color3)] rounded-lg shadow-lg relative text-[var(--color1)] p-4"
    >
      <slot></slot>
      <button
        class="absolute top-1 right-2 text-color6 hover:text-color3 cursor-pointer"
        on:click={onClose}
      >
        x
      </button>
    </div>
  </div>
{/if}
