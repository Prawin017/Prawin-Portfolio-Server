import Stat from '../models/stat.model.js';
import Ticker from '../models/ticker.model.js';
import SkillCategory from '../models/skillCategory.model.js';
import Experience from '../models/experience.model.js';
import Project from '../models/project.model.js';
import Highlight from '../models/highlight.model.js';
import SkillProficiency from '../models/skillProficiency.model.js';
import ContactInfo from '../models/contactInfo.model.js';
import Hero from '../models/hero.model.js';


export const getStats = async (req, res, next) => {
  try {
    const stats = await Stat.find({}).select('value label -_id');
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const getTickerItems = async (req, res, next) => {
  try {
    const tickers = await Ticker.find({});
    // Map array of documents to a simple array of strings as expected by the frontend
    const tickerNames = tickers.map(t => t.name);
    res.json(tickerNames);
  } catch (error) {
    next(error);
  }
};

export const getSkillCategories = async (req, res, next) => {
  try {
    const categories = await SkillCategory.find({}).select('title badgeClass icon skills -_id');
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({}).select('id role company timeline description tags isPresent -_id');
    // Sort so it displays consistently
    res.json(experiences);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).select('id title badge badgeClass description tags category projectUrl githubUrl projectUrlEnabled githubUrlEnabled -_id');
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getHighlights = async (req, res, next) => {
  try {
    const highlights = await Highlight.find({}).select('title description iconClass colorClass -_id');
    res.json(highlights);
  } catch (error) {
    next(error);
  }
};

export const getSkillProficiencies = async (req, res, next) => {
  try {
    const proficiencies = await SkillProficiency.find({}).select('name level color -_id');
    res.json(proficiencies);
  } catch (error) {
    next(error);
  }
};

export const getContactInfo = async (req, res, next) => {
  try {
    const info = await ContactInfo.findOne({}).select('email phone location github linkedin twitter -_id');
    if (!info) {
      // Return a default mock to prevent frontend breaking if DB is not seeded
      return res.json({
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: ''
      });
    }
    res.json(info);
  } catch (error) {
    next(error);
  }
};

export const getHeroInfo = async (req, res, next) => {
  try {
    const hero = await Hero.findOne({}).select('name role description badgeText avatarLetter -_id');
    if (!hero) {
      return res.json({
        name: 'Prawin',
        role: 'Lead Full-Stack Engineer',
        description: 'Building robust, performance-optimized, and scalable web applications and solutions. Crafting elegant interfaces with modern web technologies.',
        badgeText: 'Open to Full-Time Roles',
        avatarLetter: 'P'
      });
    }
    res.json(hero);
  } catch (error) {
    next(error);
  }
};

