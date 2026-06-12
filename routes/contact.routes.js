import express from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import { validateContactForm } from '../middleware/validator.js';

const router = express.Router();

router.post('/', validateContactForm, submitContact);

export default router;
