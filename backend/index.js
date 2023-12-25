const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    try {
        res.send('hello Server Started');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const PORT=5000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
