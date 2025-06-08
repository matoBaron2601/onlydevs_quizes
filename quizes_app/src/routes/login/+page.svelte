<script lang="ts">
  const login = () => {
    window.open('http://localhost:5173/api/login', '_self');
  };
</script>

<div class="flex justify-center items-center h-screen bg-[var(--color1)]">
  <div class="bg-[var(--color2)] max-w-md w-full p-6 rounded-lg shadow-xl">
    <h2 class="text-[var(--color4)] text-2xl font-bold mb-4 text-center">
      Welcome to OnlyDevs Quizzes
    </h2>
    <p class="text-[var(--color1)] text-lg mb-6 text-center">
      Click the button below to login using your Google account and start
      enjoying the benefits of our service.
    </p>
    <button
      on:click={login}
      class="bg-[var(--color3)] text-[var(--color4)] font-medium uppercase tracking-wide w-full py-4 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color3)] focus:ring-opacity-50 cursor-pointer"
    >
      Login with Google
    </button>
  </div>
</div>
