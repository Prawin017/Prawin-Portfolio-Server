import mongoose from 'mongoose';

const skillCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  badgeClass: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    required: true,
    default: []
  }
}, {
  timestamps: true
});

const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
export default SkillCategory;
