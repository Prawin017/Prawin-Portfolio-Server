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
    const hero = await Hero.findOne({}).select('name role description badgeText avatarLetter coffeeCount bugCount deployCount ideaCount roles funFacts');
    
    const defaultRoles = [
      'Full-Stack Engineer',
      'Problem Solver',
      'Coffee-Driven Developer',
      'Angular Specialist',
      'Debug Detective',
      'Human Stack Overflow',
      'Chaos-to-Code Converter'
    ];

    const defaultFunFacts = [
      '🐛 Thinks debugging is like detective work.',
      '📈 Optimizing everything I touch.',
      '🏦 Banking apps without banking stress.',
      '🎯 Turning chaos into clean code.',
      '☕ Runs on 100% Arabica & clean code.',
      '🌙 Late-night fixes, early deployments.'
    ];

    if (!hero) {
      return res.json({
        name: 'Prawin',
        role: 'Lead Full-Stack Engineer',
        description: 'Building robust, performance-optimized, and scalable web applications and solutions. Crafting elegant interfaces with modern web technologies.',
        badgeText: 'Open to Full-Time Roles',
        avatarLetter: 'P',
        coffeeCount: 42,
        bugCount: 312,
        deployCount: 148,
        ideaCount: 89,
        roles: defaultRoles,
        funFacts: defaultFunFacts
      });
    }

    // Self-healing database pattern: populate roles/funFacts if empty/missing
    let needsUpdate = false;
    if (!hero.roles || hero.roles.length === 0) {
      hero.roles = defaultRoles;
      needsUpdate = true;
    }
    if (!hero.funFacts || hero.funFacts.length === 0) {
      hero.funFacts = defaultFunFacts;
      needsUpdate = true;
    }

    if (needsUpdate) {
      await hero.save();
    }

    res.json({
      name: hero.name,
      role: hero.role,
      description: hero.description,
      badgeText: hero.badgeText,
      avatarLetter: hero.avatarLetter,
      coffeeCount: hero.coffeeCount,
      bugCount: hero.bugCount,
      deployCount: hero.deployCount,
      ideaCount: hero.ideaCount,
      roles: hero.roles,
      funFacts: hero.funFacts
    });
  } catch (error) {
    next(error);
  }
};

export const incrementHeroMetric = async (req, res, next) => {
  const { metric } = req.body;
  const validMetrics = ['coffeeCount', 'bugCount', 'deployCount', 'ideaCount'];

  if (!validMetrics.includes(metric)) {
    return res.status(400).json({ error: 'Invalid metric name' });
  }

  try {
    const updatedHero = await Hero.findOneAndUpdate(
      {},
      { $inc: { [metric]: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, metric, value: updatedHero[metric] });
  } catch (error) {
    next(error);
  }
};

