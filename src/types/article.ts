export interface Article {
  id: string;
  /** Partição multi-site no mesmo projeto Supabase */
  site_id: string;
  title: string;
  description: string;
  content?: string;
  slug?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_image_url?: string;
  type: "article" | "video";
  category: string;
  read_time: string;
  external_url?: string;
  youtube_iframe?: string;
  image_url?: string;
  tags?: string[];
  published: boolean;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}
