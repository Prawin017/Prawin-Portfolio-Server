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
  },
  coffeeCount: {
    type: Number,
    default: 42
  },
  bugCount: {
    type: Number,
    default: 312
  },
  deployCount: {
    type: Number,
    default: 148
  },
  ideaCount: {
    type: Number,
    default: 89
  },
  roles: {
    type: [String],
    default: []
  },
  funFacts: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const Hero = mongoose.model('Hero', heroSchema, 'heros');
export default Hero;
