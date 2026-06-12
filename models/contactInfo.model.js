import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  github: {
    type: String,
    required: true,
    trim: true
  },
  linkedin: {
    type: String,
    required: true,
    trim: true
  },
  twitter: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);
export default ContactInfo;
