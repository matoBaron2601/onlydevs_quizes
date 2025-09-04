<script lang="ts">
  const { title = 'Default Collections', children } = $props();
</script>

<div
  class="bg-[var(--color4)] rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
>
  <h1 class="text-4xl font-bold text-[var(--color2)] mb-8">
    {title}
  </h1>
  {@render children()}
</div>
