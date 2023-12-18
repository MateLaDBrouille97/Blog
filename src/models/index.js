// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SubCategoryType = {
  "AI": "AI",
  "ANALYZE": "ANALYZE",
  "WEB": "WEB",
  "APP": "APP",
  "IMAGE_VIDEO": "IMAGE_VIDEO",
  "OTHER": "OTHER",
  "MARKETING": "MARKETING",
  "COPYWRITING": "COPYWRITING",
  "RESEARCH_TOOLS": "RESEARCH_TOOLS",
  "PRODUCTIVITY": "PRODUCTIVITY",
  "ASSISTANTS": "ASSISTANTS"
};

const CategoryType = {
  "USEFULHACKS": "USEFULHACKS",
  "PROJECTS": "PROJECTS",
  "NEWS": "NEWS",
  "OPINIONS": "OPINIONS",
  "TOOLS": "TOOLS",
  "ANALYSIS": "ANALYSIS",
  "GEOPOL": "GEOPOL"
};

const QualifType = {
  "EDUCATION": "EDUCATION",
  "EXPERIENCE": "EXPERIENCE"
};

const PortfolioType = {
  "WEB": "WEB",
  "APP": "APP",
  "DATA_ANALYSIS": "DATA_ANALYSIS",
  "AI": "AI"
};

const SkillType = {
  "BACKEND": "BACKEND",
  "FRONTEND": "FRONTEND",
  "DATABASE": "DATABASE"
};

const SkillLevel = {
  "BEGINNER": "BEGINNER",
  "INTERMEDIATE": "INTERMEDIATE",
  "ADVANCED": "ADVANCED"
};

const { Category, BlogPost, Service, Qualification, PortfolioPost, Skill, User } = initSchema(schema);

export {
  Category,
  BlogPost,
  Service,
  Qualification,
  PortfolioPost,
  Skill,
  User,
  SubCategoryType,
  CategoryType,
  QualifType,
  PortfolioType,
  SkillType,
  SkillLevel
};