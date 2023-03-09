const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
category: {
    type: String,
    trim: true,
},
startTime: {
    type: String,
    required: true,
},
endTime: {
  type: String,
  required: true,
},
name: {
  type: String,
  required: true,
},
address: {
  type: String,
  required: false,
},
notes: {
  type: String,
  required: false,
},
latitude: {
  type: Float,
  required: false,
},
longitude: {
  type: Float,
  required: false,
},
});

const Item = model('Item', itemSchema);

module.exports = Item;
