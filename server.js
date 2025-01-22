// Simple Node.js server to host your portfolio
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
    // Set default file to index.html
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Get the file extension
    const extname = String(path.extname(filePath)).toLowerCase();

    // Map of content types
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    // Default content type if not found in map
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                fs.readFile('./404.html', (err, page404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(page404 || '404 Not Found', 'utf-8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Sorry, server error: ${error.code}`);
            }
        } else {
            // Serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

