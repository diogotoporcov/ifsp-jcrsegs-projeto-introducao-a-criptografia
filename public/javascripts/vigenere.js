const keyIterator = function* (message, key) {
    const keyPoints = Array.from(key, char => char.codePointAt(0));
    let index = 0;
    for (let _ of Array.from(message)) {
        yield keyPoints[index % keyPoints.length];
        if (++index === keyPoints.length) index = 0;
    }
};

const encrypt = (message, keyIter, cardinality) => {
    const result = [];
    for (const char of Array.from(message)) {
        const keyCode = keyIter.next().value;
        const code = (char.codePointAt(0) + keyCode) % cardinality;
        result.push(String.fromCodePoint(code));
    }
    return result.join('');
};

const decrypt = (message, keyIter, cardinality) => {
    const result = [];
    for (const char of Array.from(message)) {
        const keyCode = keyIter.next().value;
        const code = (char.codePointAt(0) - keyCode + cardinality) % cardinality;
        result.push(String.fromCodePoint(code));
    }
    return result.join('');
};
