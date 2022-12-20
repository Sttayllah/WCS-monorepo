export interface User {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  description?: string;
  avatar: string;
}

export interface Article {
  id: number;
  userId: number;
  label: string;
  createdAt: number;
  content: string;
  isPublished: boolean;
  publishedAt?: number | null;
  updatedAt?: number | null;
}

export interface FileImageData {
  base64Data: string;
  width: number;
  height: number;
}
