import type { Quiz } from '../../../types/quizTypes';
import { fetchData } from '../../api/utils';

export const handleCreateQuiz = async (tags: string) => {
  const queryParams = new URLSearchParams({ tags: tags }).toString();
  return await fetchData<Quiz>(`api/quiz/create?${queryParams}`, 'POST');
};
