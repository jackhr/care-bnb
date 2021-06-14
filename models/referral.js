const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referralSchema = new Schema({
  name: String,
  phone_number: Number,
  email: String,
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Referral', referralSchema);