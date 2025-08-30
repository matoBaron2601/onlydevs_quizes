<script lang="ts">
  export let title: string = 'Your Application Title';
</script>

<header
  class="bg-[var(--color4)] text-[var(--color2)] shadow-md p-4 rounded-b-lg"
>
  <div class="flex justify-between items-center max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold">{title}</h1>
    <nav class="space-x-4 text-lg">
      <a href="/" class="hover:text-[var(--color5)] transition-colors">
        Home
      </a>
      <a href="/typesense" class="hover:text-[var(--color5)] transition-colors">
        Typesense
      </a>
      <a href="/quiz" class="hover:text-[var(--color5)] transition-colors">
        Quiz
      </a>
      <a href="/login" class="hover:text-[var(--color5)] transition-colors">
        Login
      </a>
    </nav>
  </div>
</header>
