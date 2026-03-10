import { supabaseAdmin } from './supabase';
import { PublicationList } from './components/PublicationList';
import { Library } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { data: publications, error } = await supabaseAdmin
    .from('publications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-neutral-50 text-neutral-600">
        <div className="text-center max-w-md">
          <h1 className="text-lg font-medium text-neutral-900 mb-2">Error loading dashboard</h1>
          <p className="text-sm">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-12 md:px-12 md:py-16 space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-neutral-200/60 pb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-neutral-900">
              <div className="p-2 bg-white border border-neutral-200 shadow-sm rounded-xl">
                <Library className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Publications</h1>
            </div>
            <p className="text-sm text-neutral-500 max-w-lg">
              Manage your research papers, theses, proposals, and ideas. Create new entries or edit existing ones.
            </p>
          </div>
        </header>
        
        <div className="pb-16">
          <PublicationList initialPublications={publications || []} />
        </div>
      </div>
    </main>
  );
}
