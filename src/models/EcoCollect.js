import mongoose from 'mongoose';

const ecoCollectSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    wasteType: {
        type: String,
        required: true,
        enum: ['general', 'recyclable', 'green', 'electronic'],
    },
    collectionDate: {
        type: Date,
        required: true,
    },
    termsAgreed: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create a model from the schema
export const EcoCollect = mongoose.model('EcoCollect', ecoCollectSchema);


