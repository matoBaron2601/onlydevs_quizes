from chunking_evaluation.chunking import (
    RecursiveTokenChunker,
)
import os

from analyze_chunks import analyze_chunks
from chromadb.utils import embedding_functions
from chunking_evaluation.utils import openai_token_count
from dotenv import load_dotenv
load_dotenv()
embedding_function = embedding_functions.OpenAIEmbeddingFunction(api_key=os.environ["OPENAI_API_KEY"], model_name="text-embedding-3-large")

with open("./react_bok_extracted.txt", 'r', encoding='utf-8') as file:
        document = file.read()


recursive_character_chunker = RecursiveTokenChunker(
    chunk_size=1000,  
    chunk_overlap=400,  
    length_function=len,  
    separators=["\n\n", "\n", ".", "?", "!", " ", ""]
)

recursive_character_chunks = recursive_character_chunker.split_text(document)
analyze_chunks(recursive_character_chunks, use_tokens=False)

