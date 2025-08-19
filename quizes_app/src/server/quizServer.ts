import type { CreateQuiz, Quiz } from '../types/quizTypes';
import { generateCompletionV1 } from './openaiServer';
import { quiz, question, option } from '../db/schema';
import { createId } from '@paralleldrive/cuid2';
import { db } from '../db/client';
import { getDocumentsV1 } from './typesenseServer';

export const createQuizV1 = async (
  createQuizData: CreateQuiz
): Promise<Quiz | null> => {
  const documentsByTags = await getDocumentsV1(createQuizData.tags);
  console.log('Documents by tags:', documentsByTags.hits);

  if (documentsByTags.hits && documentsByTags.hits.length === 0) {
    return null;
  }

  const openAIresponse = await generateCompletionV1(`Tags: ${
    createQuizData.tags
  }

  	Data: ${JSON.stringify(documentsByTags.hits)}

    if you have empty string [] after Data: do not return nothing and ignore all text after this line.

  	Using only this data and these tags, generate a JSON object of the following structure:

  	type Quiz = {
  		id?: string | undefined;
  		questions: {
  			id?: string | undefined;
  			text: string;
  			options: {
  				id?: string | undefined;
  				text: string;
  				isCorrect: boolean;
  			}[];
  		}[];
  	}

  	Return only this JSON object. Do not include any explanation or extra text. Create the quiz solely based on the provided data and tags. Do not use your knowledge but only data from my data. If there are not relevant data, do not return nothing. Generate 3 questions with 4 options each. Ensure that the options are diverse and relevant to the questions. The JSON object should be valid and well-structured. Do not include any additional text or comments.
    The quiz should be about this keywords: ${createQuizData.tags}
`);
  console.log('OpenAI response:', openAIresponse.choices[0].message.content);
  const cleanedString = openAIresponse.choices[0].message.content
    .replace(/```json[\s\n]*/, '')
    .replace(/[\s\n]*```$/, '');
  const quizData: Quiz = JSON.parse(cleanedString);
  let enrichedQuiz: Quiz;
  await db.transaction(async (tx) => {
    const [quizRes] = await tx.insert(quiz).values({}).returning();

    const enrichedQuestions = [];

    for (const q of quizData.questions) {
      const [questionRes] = await tx
        .insert(question)
        .values({
          quizId: quizRes.id,
          text: q.text,
        })
        .returning();

      const enrichedOptions = q.options.map((o) => {
        const newId = createId();
        return {
          id: newId,
          questionId: questionRes.id,
          text: o.text,
          isCorrect: o.isCorrect,
        };
      });

      await tx.insert(option).values(enrichedOptions);

      enrichedQuestions.push({
        id: questionRes.id,
        text: q.text,
        options: enrichedOptions.map((o) => ({
          id: o.id,
          text: o.text,
          isCorrect: o.isCorrect,
        })),
      });
    }

    enrichedQuiz = {
      id: quizRes.id,
      questions: enrichedQuestions,
    };
  });

  return enrichedQuiz!;
};
