// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BlogCategory = {
  "USEFULHACKS": "USEFULHACKS",
  "PROJECTS": "PROJECTS",
  "NEWS": "NEWS"
};

const SkillType = {
  "BACKEND": "BACKEND",
  "FRONTEND": "FRONTEND",
  "DATABASE": "DATABASE"
};

const QualificationType = {
  "EDUCATION": "EDUCATION",
  "EXPERIENCE": "EXPERIENCE"
};

const LevelSkill = {
  "BASIC": "BASIC",
  "INTERMEDIATE": "INTERMEDIATE",
  "ADVANCED": "ADVANCED"
};

const PortfolioType = {
  "WEB": "WEB",
  "APP": "APP",
  "SCIENCE": "SCIENCE"
};

const { Category, BlogPost, Link, Service, Qualification, Skill, PortfolioPost, User } = initSchema(schema);

export {
  Category,
  BlogPost,
  Link,
  Service,
  Qualification,
  Skill,
  PortfolioPost,
  User,
  BlogCategory,
  SkillType,
  QualificationType,
  LevelSkill,
  PortfolioType
};