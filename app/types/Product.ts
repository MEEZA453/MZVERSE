export interface ProductSection {
  title: string;
  content: string[]; // array of strings
  _id: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
  _id?: string;
}

export interface PostedBy {
  _id: string;
  name: string;
  profile: string;
  handle: string;
}

export interface Product {
  _id: string;
  name: string;
  image: string[];
  headline?: string;   // keep optional since sometimes missing
  hashtags: string[];  // (typo fix: "hashtags" → "hashtags")
  amount: number;
  sections: ProductSection[];

  // New fields from API
  driveLink?: string;
  faq: ProductFaq[];
  postedBy: PostedBy;
  usedInPosts: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
