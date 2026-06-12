import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  badgeText: {
    type: String,
    required: true,
    trim: true
  },
  avatarLetter: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Hero = mongoose.model('Hero', heroSchema);
export default Hero;
