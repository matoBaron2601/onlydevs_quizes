<script lang="ts">
  import { goto } from '$app/navigation';
  import { createQuery } from '@tanstack/svelte-query';
  import Spinner from './Spinner.svelte';

  export let title: string = 'Your Application Title';

  const fetchUserProfile = async () => {
    const res = await fetch('/api/auth/user');
    if (!res.ok) {
      throw new Error('Fetch error: ' + res.statusText);
    }
    const userData = await res.json();
    return userData;
  };
  const userQuery = createQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });
</script>

<header class="bg-black text-white shadow-md p-4 rounded-b-lg">
  <div
    class="flex justify-between items-center max-w-7xl mx-auto font-bold "
  >
    <h1 class="text-3xl">{title}</h1>
    <nav class="flex gap-8 text-lg items-center">
      <a href="/dataset/default">Default Datasets</a>
      <a href="/dataset/custom">Custom Datasets</a>
      <a href="/quiz">Quiz</a>
      {#if $userQuery.isLoading}
        <Spinner />
      {:else if $userQuery.data && $userQuery.data.picture}
        <img
          src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
          alt="User profile"
          class="w-10 h-10 rounded-full"
        />
      {:else}
        <a href="/login">Login</a>
      {/if}
    </nav>
  </div>
</header>
