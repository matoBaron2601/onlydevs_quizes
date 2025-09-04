<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import '../app.css';
  import Header from '../components/Header.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  const queryClient = new QueryClient();

  const { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
  <Header title="OnlyDevs Quizzes" />
  <main class="p-4">
    {@render children()}
  </main>
</QueryClientProvider>
