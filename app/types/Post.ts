export interface Post {
  _id: string;
  name: string;
  description: string;
  category: string;
  hashtags: string[];
  image: string[];
  createdBy: {
    _id: string;
    name: string;
    profile?: string;
    handle?: string;
  };
  votes: {
    creativity: { user: string; score: number }[];
    aesthetics: { user: string; score: number }[];
    composition: { user: string; score: number }[];
    emotion: { user: string; score: number }[];
  };
  createdAt: string;
  updatedAt: string;
}
