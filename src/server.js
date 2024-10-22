import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import {EcoCollect} from './models/EcoCollect.js'; // Ensure you use the .js extension when importing
const app = express();
const port = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://prathamsk069:WoYtVbZOSznUyOkS@cluster1.7zrxdp1.mongodb.net/envionment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/api/collect', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        wasteType,
        collectionDate,
        termsAgreed
    } = req.body;

    try {
        const newRequest = new EcoCollect({
            firstName,
            lastName,
            email,
            phone,
            address,
            wasteType,
            collectionDate,
            termsAgreed
        });

        const savedRequest = await newRequest.save();
        res.status(200).json({ message: 'Request saved successfully!', data: savedRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
