// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up public folder
app.use(express.static('public'));

// Set up comments
let comments = [];
if (fs.existsSync('comments.json')) {
    comments = JSON.parse(fs.readFileSync('comments.json'));
}

// Get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Post comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.date = new Date();
    comments.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(comment);
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
