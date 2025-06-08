interface ChoiceMessage {
	role: 'user' | 'assistant'; // role can be 'user' or 'assistant'
	content: string; // the generated message content
}

interface Choice {
	index: number; // index of the choice
	message: ChoiceMessage; // message content
	finish_reason: string; // reason for finishing the response
}

interface Usage {
	prompt_tokens: number; // number of tokens in the prompt
	completion_tokens: number; // number of tokens in the completion
	total_tokens: number; // total number of tokens used
}

interface OpenAIChatCompletionResponse {
	id: string; // unique identifier for the completion request
	object: 'chat.completion'; // type of the object returned
	created: number; // timestamp of creation in Unix time
	model: string; // model used (e.g., 'gpt-4.0-turbo')
	choices: Choice[]; // array of choices returned
	usage: Usage; // token usage statistics
}



