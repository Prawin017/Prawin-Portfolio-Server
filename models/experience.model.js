import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  timeline: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    required: true,
    default: []
  },
  isPresent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
