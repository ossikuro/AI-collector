import type { ProviderCategory } from './provider-category';

export interface Provider {
  id: string;
  name: string;
  categories: ProviderCategory[];
  websiteUrl: string;
  launchUrl: string;
}