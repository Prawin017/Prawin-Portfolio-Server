import mongoose from 'mongoose';

const skillProficiencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  color: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const SkillProficiency = mongoose.model('SkillProficiency', skillProficiencySchema);
export default SkillProficiency;
