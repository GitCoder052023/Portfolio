'use client'

import { useState } from 'react';
import { Plus, Edit2, Trash2, FileText, CheckCircle2, XCircle, Search } from 'lucide-react';
import { deletePublication } from '../actions';
import { PublicationModal } from './PublicationModal';
import type { Publication } from '../supabase';

export function PublicationList({ initialPublications }: { initialPublications: Publication[] }) {
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [search, setSearch] = useState('');
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredPubs = publications.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this publication? This action cannot be undone.')) {
      setIsDeleting(id);
      try {
        await deletePublication(id);
        setPublications(publications.filter(p => p.id !== id));
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message || 'Failed to delete publication');
        } else {
          alert('Failed to delete publication');
        }
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search publications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => {
            setEditingPub(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Publication
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-600">
            <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Title & Slug</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredPubs.map((pub) => (
                <tr key={pub.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900 truncate max-w-md" title={pub.title}>{pub.title}</div>
                    <div className="text-xs text-neutral-400 mt-1 truncate max-w-md" title={pub.slug}>{pub.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-neutral-100 text-xs font-medium text-neutral-600">
                      {pub.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {pub.is_published ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                          <XCircle className="w-3 h-3" /> Draft
                        </span>
                      )}
                      {pub.is_featured && (
                        <span className="inline-flex items-center text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingPub(pub);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-neutral-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pub.id)}
                        disabled={isDeleting === pub.id}
                        className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPubs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                    <FileText className="h-12 w-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-base font-medium text-neutral-900">No publications found</p>
                    <p className="text-sm mt-1">Try adjusting your search or add a new publication.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <PublicationModal
          publication={editingPub}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(savedPub: Publication) => {
            if (editingPub) {
              setPublications(publications.map(p => p.id === savedPub.id ? savedPub : p));
            } else {
              setPublications([savedPub, ...publications]);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
