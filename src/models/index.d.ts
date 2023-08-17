import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum SubCategory {
  PRODUCTIVITY = "PRODUCTIVITY",
  ASSISTANTS = "ASSISTANTS",
  RESEARCH_TOOLS = "RESEARCH_TOOLS",
  COPYWRITING = "COPYWRITING",
  APP = "APP",
  WEB = "WEB",
  AI = "AI",
  ANALYZE = "ANALYZE",
  IMAGE_VIDEO = "IMAGE_VIDEO",
  MARKETING = "MARKETING",
  OTHER = "OTHER"
}

export enum BlogCategory {
  USEFULHACKS = "USEFULHACKS",
  PROJECTS = "PROJECTS",
  NEWS = "NEWS",
  OPINIONS = "OPINIONS",
  TOOLS = "TOOLS",
  ANALYSIS = "ANALYSIS",
  GEOPOL = "GEOPOL"
}

export enum SkillType {
  BACKEND = "BACKEND",
  FRONTEND = "FRONTEND",
  DATABASE = "DATABASE"
}

export enum QualificationType {
  EDUCATION = "EDUCATION",
  EXPERIENCE = "EXPERIENCE"
}

export enum LevelSkill {
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
}

export enum PortfolioType {
  WEB = "WEB",
  APP = "APP",
  SCIENCE = "SCIENCE",
  AI = "AI"
}



type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerBlogPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BlogPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly userID: string;
  readonly category?: BlogCategory | keyof typeof BlogCategory | null;
  readonly slug?: string | null;
  readonly subCategory?: SubCategory | keyof typeof SubCategory | null;
  readonly likeCount?: number | null;
  readonly href?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBlogPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BlogPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly userID: string;
  readonly category?: BlogCategory | keyof typeof BlogCategory | null;
  readonly slug?: string | null;
  readonly subCategory?: SubCategory | keyof typeof SubCategory | null;
  readonly likeCount?: number | null;
  readonly href?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BlogPost = LazyLoading extends LazyLoadingDisabled ? EagerBlogPost : LazyBlogPost

export declare const BlogPost: (new (init: ModelInit<BlogPost>) => BlogPost) & {
  copyOf(source: BlogPost, mutator: (draft: MutableModel<BlogPost>) => MutableModel<BlogPost> | void): BlogPost;
}

type EagerLink = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Link, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly href?: string | null;
  readonly image?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLink = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Link, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly href?: string | null;
  readonly image?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Link = LazyLoading extends LazyLoadingDisabled ? EagerLink : LazyLink

export declare const Link: (new (init: ModelInit<Link>) => Link) & {
  copyOf(source: Link, mutator: (draft: MutableModel<Link>) => MutableModel<Link> | void): Link;
}

type EagerService = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Service, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly description?: string | null;
  readonly userID: string;
  readonly serviceData?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyService = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Service, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly description?: string | null;
  readonly userID: string;
  readonly serviceData?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Service = LazyLoading extends LazyLoadingDisabled ? EagerService : LazyService

export declare const Service: (new (init: ModelInit<Service>) => Service) & {
  copyOf(source: Service, mutator: (draft: MutableModel<Service>) => MutableModel<Service> | void): Service;
}

type EagerQualification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Qualification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly calendarBegin?: string | null;
  readonly calendarEnd?: string | null;
  readonly institut?: string | null;
  readonly type?: QualificationType | keyof typeof QualificationType | null;
  readonly userID: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQualification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Qualification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly calendarBegin?: string | null;
  readonly calendarEnd?: string | null;
  readonly institut?: string | null;
  readonly type?: QualificationType | keyof typeof QualificationType | null;
  readonly userID: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Qualification = LazyLoading extends LazyLoadingDisabled ? EagerQualification : LazyQualification

export declare const Qualification: (new (init: ModelInit<Qualification>) => Qualification) & {
  copyOf(source: Qualification, mutator: (draft: MutableModel<Qualification>) => MutableModel<Qualification> | void): Qualification;
}

type EagerSkill = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Skill, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly level?: LevelSkill | keyof typeof LevelSkill | null;
  readonly name?: string | null;
  readonly userID: string;
  readonly type?: SkillType | keyof typeof SkillType | null;
  readonly href?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySkill = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Skill, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly level?: LevelSkill | keyof typeof LevelSkill | null;
  readonly name?: string | null;
  readonly userID: string;
  readonly type?: SkillType | keyof typeof SkillType | null;
  readonly href?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Skill = LazyLoading extends LazyLoadingDisabled ? EagerSkill : LazySkill

export declare const Skill: (new (init: ModelInit<Skill>) => Skill) & {
  copyOf(source: Skill, mutator: (draft: MutableModel<Skill>) => MutableModel<Skill> | void): Skill;
}

type EagerPortfolioPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PortfolioPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly type?: PortfolioType | keyof typeof PortfolioType | null;
  readonly userID: string;
  readonly technologies?: (string | null)[] | null;
  readonly addressPost?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPortfolioPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PortfolioPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly type?: PortfolioType | keyof typeof PortfolioType | null;
  readonly userID: string;
  readonly technologies?: (string | null)[] | null;
  readonly addressPost?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PortfolioPost = LazyLoading extends LazyLoadingDisabled ? EagerPortfolioPost : LazyPortfolioPost

export declare const PortfolioPost: (new (init: ModelInit<PortfolioPost>) => PortfolioPost) & {
  copyOf(source: PortfolioPost, mutator: (draft: MutableModel<PortfolioPost>) => MutableModel<PortfolioPost> | void): PortfolioPost;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly instagram?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly github?: string | null;
  readonly title?: (string | null)[] | null;
  readonly experience?: number | null;
  readonly projectNumber?: number | null;
  readonly Qualifications?: (Qualification | null)[] | null;
  readonly Skills?: (Skill | null)[] | null;
  readonly Portfolios?: (PortfolioPost | null)[] | null;
  readonly Services?: (Service | null)[] | null;
  readonly sub?: string | null;
  readonly support?: string | null;
  readonly descriptionLong?: string | null;
  readonly CV?: string | null;
  readonly Links?: (Link | null)[] | null;
  readonly avatar?: string | null;
  readonly BlogPosts?: (BlogPost | null)[] | null;
  readonly facebook?: string | null;
  readonly twitter?: string | null;
  readonly telegram?: string | null;
  readonly linkedIn?: string | null;
  readonly buyMeACoffee?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly instagram?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly github?: string | null;
  readonly title?: (string | null)[] | null;
  readonly experience?: number | null;
  readonly projectNumber?: number | null;
  readonly Qualifications: AsyncCollection<Qualification>;
  readonly Skills: AsyncCollection<Skill>;
  readonly Portfolios: AsyncCollection<PortfolioPost>;
  readonly Services: AsyncCollection<Service>;
  readonly sub?: string | null;
  readonly support?: string | null;
  readonly descriptionLong?: string | null;
  readonly CV?: string | null;
  readonly Links: AsyncCollection<Link>;
  readonly avatar?: string | null;
  readonly BlogPosts: AsyncCollection<BlogPost>;
  readonly facebook?: string | null;
  readonly twitter?: string | null;
  readonly telegram?: string | null;
  readonly linkedIn?: string | null;
  readonly buyMeACoffee?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}