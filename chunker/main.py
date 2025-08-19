from flask import Flask, request, jsonify
from chunking_evaluation.chunking import RecursiveTokenChunker
from analyze_chunks import analyze_chunks

app = Flask(__name__)

@app.route('/rcc', methods=['POST'])
def rcc():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    document = file.read().decode('utf-8')

    recursive_character_chunker = RecursiveTokenChunker(
        chunk_size=1000,
        chunk_overlap=400,
        length_function=len,
        separators=["\n\n", "\n", ".", "?", "!", " ", ""]
    )

    recursive_character_chunks = recursive_character_chunker.split_text(document)

    analysis_results = analyze_chunks(recursive_character_chunks, use_tokens=False)
    print(analysis_results)
    # print(recursive_character_chunks)
    return jsonify(recursive_character_chunks)

if __name__ == '__main__':
    app.run(debug=True)