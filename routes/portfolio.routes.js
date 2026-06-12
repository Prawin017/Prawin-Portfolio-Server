import express from 'express';
import {
  getStats,
  getTickerItems,
  getSkillCategories,
  getExperiences,
  getProjects,
  getHighlights,
  getSkillProficiencies,
  getContactInfo,
  getHeroInfo
} from '../controllers/portfolio.controller.js';


const router = express.Router();

router.get('/stats', getStats);
router.get('/ticker', getTickerItems);
router.get('/skill-categories', getSkillCategories);
router.get('/experiences', getExperiences);
router.get('/projects', getProjects);
router.get('/highlights', getHighlights);
router.get('/skill-proficiencies', getSkillProficiencies);
router.get('/contact-info', getContactInfo);
router.get('/hero', getHeroInfo);


export default router;
