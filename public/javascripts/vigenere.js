const keyIterator = function* (message, key) {
    // Converte cada caractere da chave em seu valor Unicode
    const keyPoints = Array.from(key, char => char.codePointAt(0));
    let index = 0;

    // Para cada caractere da mensagem, gera um valor de chave correspondente
    for (let _ of Array.from(message)) {
        // Repetir a chave ciclicamente
        yield keyPoints[index % keyPoints.length];
        // Avança o índice e reinicia quando chega ao fim da chave
        if (++index === keyPoints.length) index = 0;
    }
};

const encrypt = (message, keyIter, cardinality) => {
    const result = [];
    // Para cada caractere da mensagem, recebe o próximo valor Unicode da chave
    for (const char of Array.from(message)) {
        const keyCode = keyIter.next().value;
        // Soma o valor Unicode do caractere com o da chave e usa o módulo para manter o resultado dentro do limite
        const code = (char.codePointAt(0) + keyCode) % cardinality;
        result.push(String.fromCodePoint(code));
    }

    // Junta os caracteres cifrados em uma string final
    return result.join('');
};

const decrypt = (message, keyIter, cardinality) => {
    const result = [];
    for (const char of Array.from(message)) {
        const keyCode = keyIter.next().value;
        // Executa a operação contrária
        const code = (char.codePointAt(0) - keyCode + cardinality) % cardinality;
        result.push(String.fromCodePoint(code));
    }
    return result.join('');
};

// Número de caracteres unicode em hexadecimal (Cardinalidade do alfabeto)
const cardinality = 0x10FFFF;

document.getElementById("encrypt-btn").addEventListener("click", () => {
    const msg = document.getElementById("input").value;
    const key = document.getElementById("key").value;

    if (msg.trim() === '' || key.trim() === '') return;

    const keyIter = keyIterator(msg, key);
    document.getElementById("output").value = encrypt(msg, keyIter, cardinality);
});

document.getElementById("decrypt-btn").addEventListener("click", () => {
    const msg = document.getElementById("input").value;
    const key = document.getElementById("key").value;

    if (msg.trim() === '' || key.trim() === '') return;

    const keyIter = keyIterator(msg, key);
    document.getElementById("output").value = decrypt(msg, keyIter, cardinality);
});