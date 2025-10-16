// Mod para operar sem números negativos
const mod = (n, m) => {
    return ((n % m) + m) % m;
};

// Converte texto em números de 0 a 25
const textToNumbers = (text) => {
    return Array.from(
        text.toUpperCase().replace(/[^A-Z]/g, ''),
        c => c.charCodeAt(0) - 65
    );
};

// Converte números de 0–25 d para letras
const numbersToText = (numbers) => {
    return numbers.map(n => String.fromCharCode(n + 65)).join('');
};

// Multiplica uma matriz 2x2 por um vetor 2x1 (1 caractere da mensagem outro da chave), todos por módulo 26
const multiplyMatrix = (matrix, vector) => {
    return [
        mod(matrix[0][0] * vector[0] + matrix[0][1] * vector[1], 26),
        mod(matrix[1][0] * vector[0] + matrix[1][1] * vector[1], 26)
    ];
};

// Calcula a matriz inversa de uma matriz 2x2 módulo 26
const matrixInverse2x2 = (matrix) => {
    const det = mod(matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0], 26);
    const invDet = modularInverse(det, 26);

    if (invDet === null)
        throw new Error("Matriz não invertível módulo 26.");

    return [
        [mod(invDet * matrix[1][1], 26), mod(-invDet * matrix[0][1], 26)],
        [mod(-invDet * matrix[1][0], 26), mod(invDet * matrix[0][0], 26)]
    ];
};

// Calcula o inverso modular de a em relação a m
const modularInverse = (a, m) => {
    for (let i = 1; i < m; i++)
        if (mod(a*i, m) === 1) return i;

    return null;
};

// Verifica se todas as palavras têm número par de letras
const isWordWithEvenLength = (text) => {
    const palavras = text.trim().split(/\s+/).filter(Boolean);
    for (const p of palavras) {
        const letras = p.toUpperCase().replace(/[^A-Z]/g, '');
        if (letras.length % 2 !== 0)
            return false;
    }
    return true;
};

// Verifica se a matriz é invertível módulo 26
const isMatrixInvertibleMod26 = (matrix) => {
    const determinant = ((matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0])) % 26;
    const greatestCommonDivisor = (a, b) => b === 0 ? Math.abs(a) : greatestCommonDivisor(b, a % b);
    return greatestCommonDivisor(determinant, 26) === 1;
};

const encrypt = (text, matrix) => {
    const nums = textToNumbers(text);
    const result = [];

    // Converte a mensagem em pares de números como vetores 2x1
    for (let i = 0; i < nums.length; i += 2) {
        const pair = [nums[i], nums[i + 1]];
        result.push(...multiplyMatrix(matrix, pair));
    }

    return numbersToText(result);
};

const decrypt = (text, matrix) => {
    // Usa a matriz inversa para descriptografar
    const inverse = matrixInverse2x2(matrix);
    return encrypt(text, inverse);
};

document.getElementById("encrypt-btn").onclick = () => {
    try {
        const text = document.getElementById("input").value;

        if (text.trim() === '')
            return;

        if (!isWordWithEvenLength(text)) {
            alert("Permitido apenas palavras com número par de letras A–Z.");
            return;
        }
        const key = [
            [parseInt(document.getElementById("matrix00").value),
                parseInt(document.getElementById("matrix01").value)],
            [parseInt(document.getElementById("matrix10").value),
                parseInt(document.getElementById("matrix11").value)]
        ];

        if (!isMatrixInvertibleMod26(key)) {
            alert("A matriz não é invertível módulo 26. Escolha outra chave.");
            return;
        }

        document.getElementById("output").value = encrypt(text, key);
    } catch (e) { alert(e.message); }
};

document.getElementById("decrypt-btn").onclick = () => {
    try {
        const text = document.getElementById("input").value;

        if (text.trim() === '')
            return;

        if (!isWordWithEvenLength(text)) {
            alert("Permitido apenas palavras com número par de letras A–Z.");
            return;
        }
        const key = [
            [parseInt(document.getElementById("matrix00").value),
                parseInt(document.getElementById("matrix01").value)],

            [parseInt(document.getElementById("matrix10").value),
                parseInt(document.getElementById("matrix11").value)]
        ];

        if (!isMatrixInvertibleMod26(key)) {
            alert("A matriz não é invertível módulo 26. Escolha outra chave.");
            return;
        }

        document.getElementById("output").value = decrypt(text, key);
    } catch (e) { alert(e.message); }
};

