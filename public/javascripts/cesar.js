const encrypt = (text, shift) => {
    // Substitui cada letra (maiúscula ou minúscula) por outra deslocada no alfabeto
    return text.replace(/[a-z]/gi, char => {
        // Define a base conforme a letra ser maiúscula ou minúscula
        const base = char <= 'Z' ? 65 : 97;
        // Calcula o novo caractere deslocado dentro do intervalo das 26 letras
        return String.fromCharCode(
            (char.charCodeAt(0) - base + shift) % 26 + base
        );
    });
};


const decrypt = (text, shift) => {
    // Para decifrar, basta cifrar novamente com o deslocamento inverso (26 - shift)
    return encrypt(text, 26 - (shift % 26));
}

document.getElementById("encrypt-btn").onclick = () => {
    const text = document.getElementById("input").value;

    if (text.trim() === '') return;

    if (!/^[a-zA-Z\s]+$/.test(text)) {
        alert("Digite apenas letras de A-Z e espaços.");
        return;
    }
    const shift = parseInt(document.getElementById("key").value) || 0;
    document.getElementById("output").value = encrypt(text, shift);
};

document.getElementById("decrypt-btn").onclick = () => {
    const text = document.getElementById("input").value;

    if (text.trim() === '') return;

    if (!/^[a-zA-Z\s]+$/.test(text)) {
        alert("Digite apenas letras de A-Z e espaços.");
        return;
    }

    const shift = parseInt(document.getElementById("key").value) || 0;
    document.getElementById("output").value = decrypt(text, shift);
};
