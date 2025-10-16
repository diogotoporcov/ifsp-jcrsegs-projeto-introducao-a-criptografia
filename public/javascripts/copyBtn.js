document.getElementById("copy-btn").onclick = async () => {
    const output = document.getElementById("output").value;
    if (!output) return;
    try {
        await navigator.clipboard.writeText(output);
    } catch {
        alert("Falha ao copiar.");
    }
};