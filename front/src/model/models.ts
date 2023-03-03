export interface User {
  id: number;
  blogId: number;
  pseudo: string;
  email: string;
  password?: string;
  description?: string;
  avatar?: string;
  articles: Article[];
}

export interface Article {
  content: string;
  createdAt: number;
  id: number;
  isPublished: boolean;
  label: string;
  publishedAt?: number | null;
  updatedAt?: number | null;
}

export interface FileImageData {
  base64Data: string;
  width: number;
  height: number;
}
