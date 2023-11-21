const fs = require('fs');
const process = require('process');

const fileName = 'notes.json';

function readNotes() {
    if (!fs.existsSync(fileName)) {
        return [];
    }
    const data = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(data);
}

function saveNotes(notes) {
    fs.writeFileSync(fileName, JSON.stringify(notes, null, 2));
}

function addNote(title, body) {
    const notes = readNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({ title, body });
        saveNotes(notes);
        console.log('Note added!');
    } else {
        console.log('Note title taken!');
    }
}

function readNote(title) {
    const notes = readNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(`Title: ${note.title}\nBody: ${note.body}`);
    } else {
        console.log('Note not found!');
    }
}

function deleteNote(title) {
    const notes = readNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    if (notes.length > filteredNotes.length) {
        saveNotes(filteredNotes);
        console.log('Note deleted!');
    } else {
        console.log('No note found with that title!');
    }
}

// Main function to handle command line arguments
function main() {
    const command = process.argv[2];
    const title = process.argv[3];
    const body = process.argv[4];

    switch (command) {
        case 'add':
            addNote(title, body);
            break;
        case 'read':
            readNote(title);
            break;
        case 'delete':
            deleteNote(title);
            break;
        default:
            console.log('Command not recognized!');
    }
}

main();
