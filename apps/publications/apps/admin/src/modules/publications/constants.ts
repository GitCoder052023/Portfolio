export const CATEGORY_FOLDERS: Record<string, string> = {
  'research-paper': 'research-papers',
  'thesis': 'theses',
  'idea': 'ideas',
  'proposal': 'proposals',
};

export const CATEGORIES = [
  { value: 'research-paper', label: 'Research Paper' },
  { value: 'thesis', label: 'Thesis' },
  { value: 'idea', label: 'Idea' },
  { value: 'proposal', label: 'Proposal' },
] as const;
