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
        console.log("Response from server:", results);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}