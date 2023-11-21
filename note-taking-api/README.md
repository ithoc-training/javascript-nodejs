# Running the Application

## Setup
- Run server.js with Node.js: ```node app.js```
- The server will start on http://localhost:13000.

## API Endpoints
- Add a Note:
```
URL: /note
Method: POST
Data: { "title": "Note Title", "body": "Note Body" }
Read a Note:
```
```
URL: /note?title=Note Title
Method: GET
Delete a Note:
```
```
URL: /note?title=Note Title
Method: DELETE
```

## Note 
This server is a basic implementation and should be enhanced for a production environment. 
It lacks advanced features like request validation, structured error handling, 
and security measures, which are crucial for real-world applications. However, 
it serves as a foundational example for educational purposes, illustrating how to integrate 
the http module with file operations in Node.js.

## Example
```bash
curl --location 'http://localhost:13000/note?title=Moon'
```

