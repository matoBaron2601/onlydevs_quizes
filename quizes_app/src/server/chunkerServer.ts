const chunkFile = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://127.0.0.1:5000/rcc", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const results = await response.json();
        const resultsString = JSON.stringify(results, null, 2);
        const limitedResults = resultsString.slice(0, 10000); // Get first 50 characters

        console.log("Response from server:", limitedResults);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

export default chunkFile;