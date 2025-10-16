// Converte um número inteiro (0-255) em uma string binária de 8 bits
// 0–255 cobre todos os valores possíveis de 1 byte
const toBinaryString = (num) => {
    return num.toString(2).padStart(8, '0');
};

const encrypt = (message, key) => {
    if (message.length !== key.length) {
        throw new Error("Mensagem e chave devem ter o mesmo tamanho.");
    }

    const encryptedValues = [];
    for (let index = 0; index < message.length; index++) {
        const messageDigit = parseInt(message[index], 10); // Converte a entrada em string para int
        const keyDigit = parseInt(key[index], 10); // Converte a entrada em string para int
        // XOR
        const cipherDigit = messageDigit ^ keyDigit;

        console.log(`Decimal: ${messageDigit} XOR ${keyDigit} = ${cipherDigit}\nBinário: ${toBinaryString(messageDigit)} XOR ${toBinaryString(keyDigit)} = ${toBinaryString(cipherDigit)}`);
        encryptedValues.push(cipherDigit);
    }
    return encryptedValues;
};

// Descriptografia exatamente igual, apenas aplicar XOR novamente
const decrypt = (cipher, key) => {
    return encrypt(cipher, key);
};


document.getElementById("encrypt-btn").onclick = () => {
    const input = document.getElementById("input").value.trim();
    const keyInput = document.getElementById("key").value.trim();

    if (input === '' || keyInput === '') return;

    const message = input.split(/\s|,/).filter(Boolean).map(Number);
    const key = keyInput.split(/\s|,/).filter(Boolean).map(Number);

    const cipher = encrypt(message, key);
    document.getElementById("output").value = cipher.join(' ');
};

document.getElementById("decrypt-btn").onclick = () => {
    const input = document.getElementById("input").value.trim();
    const keyInput = document.getElementById("key").value.trim();

    if (input === '' || keyInput === '') return;

    const cipher = input.split(/\s|,/).filter(Boolean).map(Number);
    const key = keyInput.split(/\s|,/).filter(Boolean).map(Number);

    const plain = decrypt(cipher, key);
    document.getElementById("output").value = plain.join(' ');
};
