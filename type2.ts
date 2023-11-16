
export interface Blogarticle {
    id: string;
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    isPublished: boolean;
    categoryId: string;
    subcatId: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    chapters: Chapter[];
  }
  
  export interface Chapter {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    imageUrl: string;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    href: string;
    blogarticleId: string;
    createdAt: Date;
    updatedAt: Date;
  }