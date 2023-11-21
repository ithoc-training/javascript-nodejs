import http from 'http';
import url from 'url';
import querystring from 'querystring';

import {addNote, readNote, deleteNote } from '../note-taking-app/app.js';


const server =
    http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    const queryString = querystring.parse(parsedUrl.query);
    const method = req.method;

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (path === '/note' && method === 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            const { title, body: noteBody } = JSON.parse(body);
            const response = addNote(title, noteBody);
            res.end(JSON.stringify(response));
        });

    } else if (path === '/note' && method === 'GET') {
        const { title } = queryString;
        const response = readNote(title);
        res.end(JSON.stringify(response));

    } else if (path === '/note' && method === 'DELETE') {
        const { title } = queryString;
        const response = deleteNote(title);
        res.end(JSON.stringify(response));

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

const PORT = 13000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
