import fs from 'fs';

const fileName = '../notes.json';

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

export function addNote(title, body) {
    const notes = readNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({ title, body });
        saveNotes(notes);
        return JSON.stringify('Note added!');
    } else {
        return JSON.stringify('Note title taken!');
    }
}

export function readNote(title) {
    const notes = readNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        return JSON.stringify(`Title: ${note.title}\nBody: ${note.body}`);
    } else {
        return JSON.stringify('Note not found!');
    }
}

export function deleteNote(title) {
    const notes = readNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    if (notes.length > filteredNotes.length) {
        saveNotes(filteredNotes);
        return JSON.stringify('Note deleted!');
    } else {
        return JSON.stringify('No note found with that title!');
    }
}
