import http from 'http';

export function feedOptions(method) {
    return {
        hostname: "localhost",
        port: 13000,
        path: "/note",
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function call(options, data) {

    const req = http.request(options, res => {
        console.log('Status Code: ', res.statusCode);
        let body = '';
        res.on('data', chunk => {
            body += chunk;
        });
        res.on('end', () => {
            console.log('Body: ', body);
            // Handle response properly here
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    if (data) {
        req.write(JSON.stringify(data));
    }

    req.end();

    return 'success';
}
