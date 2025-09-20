<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import handleGetCollections from './typesense/handlers/handleGetCollections';

  onMount(async () => {
    // const res2 = await fetch('api/auth/user');
    // if (res2.status === 401) {
    //   goto('/login');
    // }

    const res = await fetch('/api/ollama');
    console.log(res)
  });
</script>
