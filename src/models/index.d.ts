import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum SubCategoryType {
  AI = "AI",
  ANALYZE = "ANALYZE",
  WEB = "WEB",
  APP = "APP",
  IMAGE_VIDEO = "IMAGE_VIDEO",
  OTHER = "OTHER",
  MARKETING = "MARKETING",
  COPYWRITING = "COPYWRITING",
  RESEARCH_TOOLS = "RESEARCH_TOOLS",
  PRODUCTIVITY = "PRODUCTIVITY",
  ASSISTANTS = "ASSISTANTS"
}

export enum CategoryType {
  USEFULHACKS = "USEFULHACKS",
  PROJECTS = "PROJECTS",
  NEWS = "NEWS",
  OPINIONS = "OPINIONS",
  TOOLS = "TOOLS",
  ANALYSIS = "ANALYSIS",
  GEOPOL = "GEOPOL"
}

export enum QualifType {
  EDUCATION = "EDUCATION",
  EXPERIENCE = "EXPERIENCE"
}

export enum PortfolioType {
  WEB = "WEB",
  APP = "APP",
  DATA_ANALYSIS = "DATA_ANALYSIS",
  AI = "AI"
}

export enum SkillType {
  BACKEND = "BACKEND",
  FRONTEND = "FRONTEND",
  DATABASE = "DATABASE"
}

export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
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
  readonly slug?: string | null;
  readonly image?: string | null;
  readonly category?: CategoryType | keyof typeof CategoryType | null;
  readonly subcategory?: SubCategoryType | keyof typeof SubCategoryType | null;
  readonly description?: string | null;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly href?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBlogPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BlogPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly slug?: string | null;
  readonly image?: string | null;
  readonly category?: CategoryType | keyof typeof CategoryType | null;
  readonly subcategory?: SubCategoryType | keyof typeof SubCategoryType | null;
  readonly description?: string | null;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly href?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BlogPost = LazyLoading extends LazyLoadingDisabled ? EagerBlogPost : LazyBlogPost

export declare const BlogPost: (new (init: ModelInit<BlogPost>) => BlogPost) & {
  copyOf(source: BlogPost, mutator: (draft: MutableModel<BlogPost>) => MutableModel<BlogPost> | void): BlogPost;
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
  readonly serviceData?: (string | null)[] | null;
  readonly userID: string;
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
  readonly serviceData?: (string | null)[] | null;
  readonly userID: string;
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
  readonly name?: string | null;
  readonly institute?: string | null;
  readonly calendarBegin?: string | null;
  readonly calendarEnd?: string | null;
  readonly type?: QualifType | keyof typeof QualifType | null;
  readonly userID: string;
  readonly position?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQualification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Qualification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly institute?: string | null;
  readonly calendarBegin?: string | null;
  readonly calendarEnd?: string | null;
  readonly type?: QualifType | keyof typeof QualifType | null;
  readonly userID: string;
  readonly position?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Qualification = LazyLoading extends LazyLoadingDisabled ? EagerQualification : LazyQualification

export declare const Qualification: (new (init: ModelInit<Qualification>) => Qualification) & {
  copyOf(source: Qualification, mutator: (draft: MutableModel<Qualification>) => MutableModel<Qualification> | void): Qualification;
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
  readonly technologies?: (string | null)[] | null;
  readonly addressPost?: string | null;
  readonly type?: PortfolioType | keyof typeof PortfolioType | null;
  readonly userID: string;
  readonly problem?: string | null;
  readonly solution?: string | null;
  readonly features?: (string | null)[] | null;
  readonly links?: (string | null)[] | null;
  readonly year?: number | null;
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
  readonly technologies?: (string | null)[] | null;
  readonly addressPost?: string | null;
  readonly type?: PortfolioType | keyof typeof PortfolioType | null;
  readonly userID: string;
  readonly problem?: string | null;
  readonly solution?: string | null;
  readonly features?: (string | null)[] | null;
  readonly links?: (string | null)[] | null;
  readonly year?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PortfolioPost = LazyLoading extends LazyLoadingDisabled ? EagerPortfolioPost : LazyPortfolioPost

export declare const PortfolioPost: (new (init: ModelInit<PortfolioPost>) => PortfolioPost) & {
  copyOf(source: PortfolioPost, mutator: (draft: MutableModel<PortfolioPost>) => MutableModel<PortfolioPost> | void): PortfolioPost;
}

type EagerSkill = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Skill, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly level?: SkillLevel | keyof typeof SkillLevel | null;
  readonly type?: SkillType | keyof typeof SkillType | null;
  readonly userID: string;
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
  readonly name?: string | null;
  readonly level?: SkillLevel | keyof typeof SkillLevel | null;
  readonly type?: SkillType | keyof typeof SkillType | null;
  readonly userID: string;
  readonly href?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Skill = LazyLoading extends LazyLoadingDisabled ? EagerSkill : LazySkill

export declare const Skill: (new (init: ModelInit<Skill>) => Skill) & {
  copyOf(source: Skill, mutator: (draft: MutableModel<Skill>) => MutableModel<Skill> | void): Skill;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly image?: string | null;
  readonly avatar?: string | null;
  readonly CV?: string | null;
  readonly descriptionLong?: string | null;
  readonly description?: string | null;
  readonly experience?: number | null;
  readonly projectNumber?: number | null;
  readonly support?: number | null;
  readonly titles?: (string | null)[] | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly github?: string | null;
  readonly buyMeACoffee?: string | null;
  readonly facebook?: string | null;
  readonly twitter?: string | null;
  readonly instagram?: string | null;
  readonly Qualifications?: (Qualification | null)[] | null;
  readonly Skills?: (Skill | null)[] | null;
  readonly PortfolioPosts?: (PortfolioPost | null)[] | null;
  readonly Services?: (Service | null)[] | null;
  readonly BlogPosts?: (BlogPost | null)[] | null;
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
  readonly image?: string | null;
  readonly avatar?: string | null;
  readonly CV?: string | null;
  readonly descriptionLong?: string | null;
  readonly description?: string | null;
  readonly experience?: number | null;
  readonly projectNumber?: number | null;
  readonly support?: number | null;
  readonly titles?: (string | null)[] | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly github?: string | null;
  readonly buyMeACoffee?: string | null;
  readonly facebook?: string | null;
  readonly twitter?: string | null;
  readonly instagram?: string | null;
  readonly Qualifications: AsyncCollection<Qualification>;
  readonly Skills: AsyncCollection<Skill>;
  readonly PortfolioPosts: AsyncCollection<PortfolioPost>;
  readonly Services: AsyncCollection<Service>;
  readonly BlogPosts: AsyncCollection<BlogPost>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}