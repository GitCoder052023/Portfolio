export const CATEGORY_FOLDERS: Record<string, string> = {
  'research-paper': 'research-papers',
  'philosophical-paper': 'philosophical-papers',
  'conceptual-paper': 'conceptual-papers',
};

export const CATEGORIES = [
  { value: 'research-paper', label: 'Research Paper' },
  { value: 'philosophical-paper', label: 'Philosophical Paper' },
  { value: 'conceptual-paper', label: 'Conceptual Paper' },
] as const;
