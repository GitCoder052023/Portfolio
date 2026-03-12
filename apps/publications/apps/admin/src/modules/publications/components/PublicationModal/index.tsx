'use client'

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { addPublication, updatePublication, uploadPdf } from '@/modules/publications/actions';
import type { Publication } from '@/lib/supabase/types';
import { CATEGORIES } from '@/modules/publications/constants';
import { PublicationFileUpload } from './PublicationFileUpload';
import { PublicationPreview } from './PublicationPreview';

interface PublicationModalProps {
  publication?: Publication | null;
  onClose: () => void;
  onSuccess: (pub: Publication) => void;
}

export function PublicationModal({ publication, onClose, onSuccess }: PublicationModalProps) {
  const isEditing = !!publication;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    abstract: '',
    category: 'research-paper',
    tags: '',
    pdf_path: '',
    pdf_size_bytes: 0,
    page_count: '',
    published_at: new Date().toISOString().slice(0, 16),
    is_featured: false,
    is_published: true,
  });

  useEffect(() => {
    if (publication) {
      setFormData({
        slug: publication.slug || '',
        title: publication.title || '',
        description: publication.description || '',
        abstract: publication.abstract || '',
        category: publication.category || 'research-paper',
        tags: publication.tags ? publication.tags.join(', ') : '',
        pdf_path: publication.pdf_path || '',
        pdf_size_bytes: publication.pdf_size_bytes || 0,
        page_count: publication.page_count ? publication.page_count.toString() : '',
        published_at: publication.published_at 
          ? new Date(publication.published_at).toISOString().slice(0, 16) 
          : new Date().toISOString().slice(0, 16),
        is_featured: !!publication.is_featured,
        is_published: !!publication.is_published,
      });
    }
  }, [publication]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSlugify = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title && !pdfFile && !isEditing) {
      alert('Please upload a PDF or enter a title');
      return;
    }

    setShowPreview(true);
  };

  const handleFinalSubmit = async (finalData: typeof formData) => {
    setIsSubmitting(true);

    try {
      let finalPdfPath = finalData.pdf_path;
      let finalPdfSize = finalData.pdf_size_bytes;

      if (pdfFile) {
        setPdfUploading(true);
        const data = new FormData();
        data.append('file', pdfFile);
        data.append('slug', finalData.slug);
        data.append('category', finalData.category);

        const result = await uploadPdf(data);
        finalPdfPath = result.path;
        finalPdfSize = result.size;
        setPdfUploading(false);
      }

      if (!finalPdfPath && !isEditing) {
        throw new Error('Please upload a PDF file');
      }

      const submissionData = {
        ...finalData,
        tags: finalData.tags ? finalData.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
        pdf_path: finalPdfPath,
        pdf_size_bytes: finalPdfSize,
        page_count: finalData.page_count ? parseInt(finalData.page_count.toString(), 10) : null,
        published_at: new Date(finalData.published_at).toISOString(),
      };

      let saved;
      if (isEditing && publication) {
        saved = await updatePublication(publication.id, submissionData);
      } else {
        saved = await addPublication(submissionData);
      }

      onSuccess(saved);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || 'An error occurred');
      } else {
        alert('An error occurred');
      }
    } finally {
      setIsSubmitting(false);
      setPdfUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-auto flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100 shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">
              {isEditing ? 'Edit Publication' : 'Add New Publication'}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              {isEditing ? 'Update the details of your publication below.' : 'Fill out the details below to add a new publication.'}
            </p>
          </div>
          <button onClick={onClose} className="p-2.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto overflow-x-hidden flex-1 p-8">
          <form id="publication-form" onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
            
            <div className="flex-1 space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-100">Core Details</h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">Title <span className="text-neutral-400">*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={!formData.slug ? handleSlugify : undefined}
                    placeholder="Enter publication title (auto-filled from PDF if uploaded)"
                    className="w-full px-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:bg-white transition-all sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">Category <span className="text-neutral-400">*</span></label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:bg-white transition-all sm:text-sm"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-100">Content</h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief summary or hook..."
                    rows={2}
                    className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:bg-white transition-all sm:text-sm resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">Abstract</label>
                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    placeholder="Full abstract text..."
                    rows={6}
                    className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:bg-white transition-all sm:text-sm resize-y min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-[320px] shrink-0 space-y-8">
              <div className="space-y-6">
                <PublicationFileUpload 
                  pdfFile={pdfFile}
                  onFileChange={async (file) => {
                    setPdfFile(file);
                    
                    // Extract page count
                    try {
                      const arrayBuffer = await file.arrayBuffer();
                      const pdfDoc = await PDFDocument.load(arrayBuffer, { 
                        ignoreEncryption: true 
                      });
                      const pageCount = pdfDoc.getPageCount();
                      setFormData(prev => ({
                        ...prev,
                        page_count: pageCount.toString()
                      }));
                    } catch (err) {
                      console.error('Error reading PDF page count:', err);
                    }

                    if (!formData.title) {
                      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
                      const cleanTitle = nameWithoutExt
                        .replace(/[_-]/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase());
                      
                      setFormData(prev => {
                        const newTitle = cleanTitle;
                        const newSlug = newTitle
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '');
                        return {
                          ...prev,
                          title: newTitle,
                          slug: prev.slug || newSlug
                        };
                      });
                    }
                  }}
                  existingPdfPath={formData.pdf_path}
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-100">Metadata</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-neutral-500 uppercase">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="Comma separated..."
                      className="w-full px-4 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-neutral-500 uppercase">Publish Date</label>
                    <input
                      type="datetime-local"
                      name="published_at"
                      value={formData.published_at}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-neutral-500 uppercase">Page Count</label>
                    <input
                      type="number"
                      name="page_count"
                      value={formData.page_count}
                      onChange={handleChange}
                      min="1"
                      placeholder="e.g. 42"
                      className="w-full px-4 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-100">Visibility</h3>
                
                <div className="space-y-4 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">Published Status</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
                    </div>
                  </label>

                  <div className="h-px bg-neutral-200 w-full" />

                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">Featured</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-neutral-100 bg-neutral-50/50 shrink-0 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:text-neutral-900 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            form="publication-form"
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {pdfUploading ? 'Uploading PDF...' : 'Saving...'}
              </>
            ) : (
              isEditing ? 'Review Changes' : 'Preview & Publish'
            )}
          </button>
        </div>
      </div>

      {showPreview && (
        <PublicationPreview
          formData={formData}
          pdfFile={pdfFile}
          onClose={() => setShowPreview(false)}
          onConfirm={handleFinalSubmit}
          isSubmitting={isSubmitting}
          pdfUploading={pdfUploading}
        />
      )}
    </div>
  );
}
