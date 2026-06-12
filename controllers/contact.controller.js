import ContactMessage from '../models/contactMessage.model.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    const newMessage = new ContactMessage({
      name,
      email,
      message
    });

    await newMessage.save();
    
    res.status(201).json({
      success: true,
      message: 'Your message has been received successfully.'
    });
  } catch (error) {
    next(error);
  }
};
