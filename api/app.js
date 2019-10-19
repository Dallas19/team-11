const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const helmet = require('helmet');

// Allow Cross-Origin 
app.use(cors());
// Protect from well-known web vulnerabilities
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MEDIA (Logos, Resumes, and Public Documents)
app.use('/media', express.static('media'));

// API Routes
app.use('/api', require('./routes/api')());

// Web Routes
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '../CFG/index.html');
;})

server.listen(port, () => console.log(`Listening on port ${port}!`));