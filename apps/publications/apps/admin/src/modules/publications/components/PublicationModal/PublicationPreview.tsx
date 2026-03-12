'use client'

import { useState } from 'react';
import { X, Loader2, FileText, Globe, Tag, Calendar, Layout, CheckCircle2, Hash } from 'lucide-react';
import { CATEGORIES } from '@/modules/publications/constants';

interface PublicationPreviewProps {
  formData: {
    slug: string;
    title: string;
    description: string;
    abstract: string;
    category: string;
    tags: string;
    pdf_path: string;
    pdf_size_bytes: number;
    page_count: string;
    published_at: string;
    is_featured: boolean;
    is_published: boolean;
  };
  pdfFile: File | null;
  onClose: () => void;
  onConfirm: (data: PublicationPreviewProps['formData']) => Promise<void>;
  isSubmitting: boolean;
  pdfUploading: boolean;
}

export function PublicationPreview({ 
  formData: initialFormData, 
  pdfFile, 
  onClose, 
  onConfirm, 
  isSubmitting, 
  pdfUploading 
}: PublicationPreviewProps) {
  const [formData, setFormData] = useState(initialFormData);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug: value }));
  };

  const categoryLabel = CATEGORIES.find(c => c.value === formData.category)?.label || formData.category;

  return (
    <div className="fixed inset-0 z-[60] bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900">Final Review</h3>
            <p className="text-sm text-neutral-500 mt-1">Check everything before publishing</p>
          </div>
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-neutral-100 rounded-xl shrink-0">
                <FileText className="w-5 h-5 text-neutral-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</p>
                <h4 className="text-lg font-semibold text-neutral-900 leading-tight mt-1">{formData.title || 'Untitled Publication'}</h4>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-neutral-100 rounded-xl shrink-0">
                <Globe className="w-5 h-5 text-neutral-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">URL Slug</p>
                <div className="mt-1.5">
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all"
                    placeholder="publication-slug"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">You can customize the slug here if needed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-500">
                <Layout className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Category</span>
              </div>
              <p className="text-sm font-medium text-neutral-900 px-1">{categoryLabel}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-500">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Publish Date</span>
              </div>
              <p className="text-sm font-medium text-neutral-900 px-1">
                {new Date(formData.published_at).toLocaleString(undefined, { 
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </p>
            </div>
            {formData.page_count && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-500">
                  <Hash className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Page Count</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 px-1">{formData.page_count} Pages</p>
              </div>
            )}
          </div>

          {formData.tags && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-500">
                <Tag className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5 px-1">
                {formData.tags.split(',').map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs font-medium">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pdfFile && (
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-neutral-100 shadow-sm">
                  <FileText className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 truncate max-w-[240px]">{pdfFile.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          )}
        </div>

        <div className="px-8 py-6 border-t border-neutral-100 bg-neutral-50/50 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-5 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all shadow-sm"
          >
            Back to Edit
          </button>
          <button
            type="button"
            onClick={() => onConfirm(formData)}
            disabled={isSubmitting || !formData.title || !formData.slug}
            className="flex-[2] inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {pdfUploading ? 'Uploading PDF...' : 'Confirming...'}
              </>
            ) : (
              'Confirm & Publish'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
