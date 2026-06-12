import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  iconClass: {
    type: String,
    required: true,
    trim: true
  },
  colorClass: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Highlight = mongoose.model('Highlight', highlightSchema);
export default Highlight;
