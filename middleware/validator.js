export const validateContactForm = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400);
    return next(new Error('Name is required and must be a valid string'));
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    res.status(400);
    return next(new Error('Email is required'));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    res.status(400);
    return next(new Error('Please provide a valid email address'));
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    res.status(400);
    return next(new Error('Message is required and must be a valid string'));
  }

  next();
};
