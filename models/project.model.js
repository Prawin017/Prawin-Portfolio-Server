import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  badge: {
    type: String,
    required: true,
    trim: true
  },
  badgeClass: {
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
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Full-Stack', 'Mobile', 'Other']
  },
  projectUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  projectUrlEnabled: {
    type: Boolean,
    default: false
  },
  githubUrlEnabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
