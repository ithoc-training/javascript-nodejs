const ALPHABET = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const BREAK_COUNT = 500;

let content = [];

function writeWord(count) {
//    console.log('count:', count);

    for (let i = 0; i < 1000; i++) {

        let uuid = '';
        for (let j = 0; j < 100; j++) {
            uuid += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        }

        let word = '';
        for (let j = 0; j < 100; j++) {
            word += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        }

        let object = {
            count: i,
            id: uuid,
            content: word
        }
        content.push(object);
    }
    if(count <= BREAK_COUNT) {
        writeWord(++count);
    }
}

let start = new Date()
console.log(start);
writeWord(0);
console.log(content);

let end = new Date();
console.log(start, '->', end);

let duration = (end - start) / 1000;
console.log('Duration:', duration, 'Seconds');
