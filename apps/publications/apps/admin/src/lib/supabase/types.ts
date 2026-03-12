export interface Publication {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  abstract: string | null;
  category: string;
  tags: string[] | null;
  pdf_path: string;
  pdf_size_bytes: number | null;
  page_count: number | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  is_published: boolean;
}

export type PublicationInsert = Omit<Publication, 'id' | 'created_at' | 'updated_at'>;
export type PublicationUpdate = Partial<PublicationInsert>;
