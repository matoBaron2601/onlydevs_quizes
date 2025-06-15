<script lang="ts">
  import type { Quiz } from '../../types/quizTypes';
  import { handleCreateQuiz } from './handlers/handleCreateQuiz';

  let tags: string = '';
  let createdQuiz: Quiz = { questions: [] };
  let errorMessage: string = '';
  let loading: boolean = false;
  let selectedAnswers: Record<string, string> = {};
  let score: number | null = null;

  // const handleCreateQuiz = async ()=> {
  //     loading = true;
  //     errorMessage = '';
  //     createdQuiz = { questions: [] };
  //     selectedAnswers = {};
  //     score = null;
  //     try {
  //         const response = await handleCrea({tags: parseTags(tags)});
  //         if(response){
  //             createdQuiz = response;
  //         } else {
  //             createdQuiz = { questions: [] };
  //             errorMessage = 'Quiz has not been created';
  //         }
  //     } catch (error) {
  //         errorMessage = `Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`;
  //     } finally {
  //         loading = false;
  //     }
  // };

  const onSubmit = async () => {
    loading = true;
    errorMessage = '';
    createdQuiz = { questions: [] };
    selectedAnswers = {};
    score = null;
    const response = await handleCreateQuiz(tags);
    if (response) {
      createdQuiz = response;
    } else {
      createdQuiz = { questions: [] };
      errorMessage = 'Quiz has not been created';
    }
    loading = false;
  };

  function selectAnswer(questionId: string, optionId: string) {
    selectedAnswers = {
      ...selectedAnswers,
      [questionId]: optionId,
    };
  }

  function submitAnswers() {
    let correct = 0;
    for (const question of createdQuiz.questions) {
      const selectedOptionId = selectedAnswers[question.id!];
      const correctOption = question.options.find((o) => o.isCorrect);
      if (selectedOptionId && selectedOptionId === correctOption?.id) {
        correct++;
      }
    }
    score = correct;
  }
</script>

<main class="flex justify-center p-6 bg-[var(--color1)]">
  <div class="w-full max-w-lg bg-[var(--color4)] rounded-2xl shadow-lg p-8">
    <h1 class="text-3xl font-bold text-center text-[var(--color2)] mb-8">
      Create quiz by entering tags
    </h1>

    <div class="flex gap-4 items-center mb-6 justify-between">
      <input
        type="text"
        bind:value={tags}
        placeholder="Enter tags (comma separated)"
        class="border rounded p-2 transition-colors text-[var(--color2)] bg-[var(--color1)] focus:outline-none focus:ring-2 focus:ring-[var(--color3)] w-full"
        disabled={loading}
        on:keydown={(e) => e.key === 'Enter' && onSubmit()}
      />
      <button
        on:click={() => onSubmit()}
        class="w-[40%] border rounded p-2 bg-[var(--color3)] text-[var(--color1)] cursor-pointer hover:bg-[var(--color2)] focus:outline-none focus:ring-2 focus:ring-[var(--color3)] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {#if loading}
          Creating quiz...
        {:else}
          Create Quiz
        {/if}
      </button>
    </div>

    {#if errorMessage}
      <p class="text-xl font-bold text-[var(--color3)] mb-6">{errorMessage}</p>
    {/if}

    {#if createdQuiz && createdQuiz.questions.length > 0}
      <ul class="space-y-6">
        {#each createdQuiz.questions as question}
          <li
            class="p-6 bg-[var(--color1)] rounded-2xl transition-colors border border-[var(--color5)]"
          >
            <h2 class="text-xl font-semibold text-[var(--color2)]">
              {question.text}
            </h2>
            <ul class="mt-4 space-y-2">
              {#each question.options as option}
                <button
                  type="button"
                  class="w-full text-left rounded p-2 border cursor-pointer transition-colors
                      bg-[var(--color1)]
                      border-[var(--color5)]
                      text-[var(--color2)]
                      hover:bg-[var(--color3)]
                      hover:text-[var(--color1)]"
                  style="
                      background-color: {selectedAnswers[question.id!] ===
                  option.id
                    ? 'var(--color3)'
                    : 'var(--color1)'};
                      border-color: {selectedAnswers[question.id!] === option.id
                    ? 'var(--color2)'
                    : 'var(--color5)'};
                      color: {selectedAnswers[question.id!] === option.id
                    ? 'var(--color1)'
                    : 'var(--color2)'};
                    "
                  on:click={() => selectAnswer(question.id!, option.id!)}
                >
                  {option.text}
                  {#if option.isCorrect}
                    <span class="text-green-500 ml-2">✓</span>
                  {/if}
                </button>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    {:else if !loading}
      <p class="text-[var(--color2)] text-center mt-6">
        No questions found for the given tags.
      </p>
    {/if}

    {#if createdQuiz && createdQuiz.questions.length > 0}
      <button
        on:click={submitAnswers}
        class="mt-8 w-full bg-green-500 text-white py-2 rounded-2xl hover:bg-green-600 cursor-pointer transition-colors"
      >
        Submit Answers
      </button>
    {/if}

    {#if score !== null}
      <p class="mt-6 text-center text-xl font-semibold text-[var(--color2)]">
        Score: {score} / {createdQuiz.questions.length}
      </p>
    {/if}
  </div>
</main>
