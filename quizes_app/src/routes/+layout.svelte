<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import '../app.css';
  import Header from '../components/Header.svelte';

  import { queryClient } from '../lib/queryClient';

  const { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
  <Header title="OnlyDevs Quizzes" />
  <main class="p-4 w-full h-full">
    {@render children()}
  </main>
</QueryClientProvider>
