'use client'

import { useState, useEffect } from 'react';
import { X, Upload, File as FileIcon, Loader2 } from 'lucide-react';
import { addPublication, updatePublication, uploadPdf } from '../actions';
import type { Publication } from '../supabase';

interface PublicationModalProps {
  publication?: Publication | null;
  onClose: () => void;
  onSuccess: (pub: Publication) => void;
}

export function PublicationModal({ publication, onClose, onSuccess }: PublicationModalProps) {
  const isEditing = !!publication;
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        page_count: publication.page_count || '',
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
    setIsSubmitting(true);

    try {
      let finalPdfPath = formData.pdf_path;
      let finalPdfSize = formData.pdf_size_bytes;

      if (pdfFile) {
        setPdfUploading(true);
        const data = new FormData();
        data.append('file', pdfFile);
        data.append('slug', formData.slug);
        data.append('category', formData.category);

        const result = await uploadPdf(data);
        finalPdfPath = result.path;
        finalPdfSize = result.size;
        setPdfUploading(false);
      }

      if (!finalPdfPath && !isEditing) {
        throw new Error('Please upload a PDF file');
      }

      const submissionData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
        pdf_path: finalPdfPath,
        pdf_size_bytes: finalPdfSize,
        page_count: formData.page_count ? parseInt(formData.page_count.toString(), 10) : null,
        published_at: new Date(formData.published_at).toISOString(),
      };

      let saved;
      if (isEditing) {
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 sticky top-0 bg-white rounded-t-xl z-10">
          <h2 className="text-xl font-semibold text-neutral-900">
            {isEditing ? 'Edit Publication' : 'Add New Publication'}
          </h2>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700">Title <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={!formData.slug ? handleSlugify : undefined}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Slug <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSlugify}
                  className="px-3 py-2 text-sm text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Category <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="research-paper">Research Paper</option>
                <option value="thesis">Thesis</option>
                <option value="idea">Idea</option>
                <option value="proposal">Proposal</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700">Abstract</label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="physics, math, thesis"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Published Date</label>
              <input
                type="datetime-local"
                name="published_at"
                value={formData.published_at}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Page Count</label>
              <input
                type="number"
                name="page_count"
                value={formData.page_count}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">PDF File {!isEditing && <span className="text-red-500">*</span>}</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-neutral-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Upload className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm text-neutral-600 font-medium">Select PDF</span>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setPdfFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
              {pdfFile && (
                <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                  <FileIcon className="w-4 h-4" />
                  <span className="truncate">{pdfFile.name}</span>
                  <span className="text-neutral-500 text-xs">({Math.round(pdfFile.size / 1024)} KB)</span>
                </div>
              )}
              {!pdfFile && formData.pdf_path && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 mt-2">
                  <FileIcon className="w-4 h-4" />
                  <span className="truncate" title={formData.pdf_path}>Current: {formData.pdf_path.split('/').pop()}</span>
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-neutral-700">Is Published</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-neutral-700">Is Featured</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200 mt-6 sticky bottom-0 bg-white z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {pdfUploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                isEditing ? 'Save Changes' : 'Add Publication'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
