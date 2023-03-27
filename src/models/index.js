// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SubCategory = {
  "PRODUCTIVITY": "PRODUCTIVITY",
  "ASSISTANTS": "ASSISTANTS",
  "RESEARCH_TOOLS": "RESEARCH_TOOLS",
  "COPYWRITING": "COPYWRITING",
  "APP": "APP",
  "WEB": "WEB",
  "AI": "AI",
  "ANALYZE": "ANALYZE",
  "CODE_TOOLS": "CODE_TOOLS",
  "OTHER": "OTHER"
};

const BlogCategory = {
  "USEFULHACKS": "USEFULHACKS",
  "PROJECTS": "PROJECTS",
  "NEWS": "NEWS",
  "OPINIONS": "OPINIONS"
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
  SubCategory,
  BlogCategory,
  SkillType,
  QualificationType,
  LevelSkill,
  PortfolioType
};