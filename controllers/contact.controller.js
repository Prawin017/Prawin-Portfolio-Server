import ContactMessage from '../models/contactMessage.model.js';
import { sendContactEmail } from '../config/mailer.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    const newMessage = new ContactMessage({
      name,
      email,
      message
    });

    await newMessage.save();
    
    // Send email notification in the background (non-blocking)
    sendContactEmail({ name, email, message }).catch(err => {
      console.error('Failed to send contact email notification:', err);
    });
    
    res.status(201).json({
      success: true,
      message: 'Your message has been received successfully.'
    });
  } catch (error) {
    next(error);
  }
};
