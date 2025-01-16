document.getElementById("translate-btn").addEventListener("click", async () => {
    const language = document.getElementById("language").value;
    document.getElementById("output").innerText = `Selected language: ${language}. Simulating translation...`;
});