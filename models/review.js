const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  name: String,
  rating: Number,
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);