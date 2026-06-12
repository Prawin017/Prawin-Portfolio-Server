import mongoose from 'mongoose';

const tickerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

const Ticker = mongoose.model('Ticker', tickerSchema);
export default Ticker;
