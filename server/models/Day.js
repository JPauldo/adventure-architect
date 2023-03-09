const { Schema, model } = require('mongoose');

const daySchema = new Schema({
    date: {
        type: Date,
        trim: true,
        required: false,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item',
            required: false
        }
    ],
    notes: {
        type: String,
        trim: true,
        required: false,
    },
});

const Day = model('Day', daySchema);

module.exports = Day;
