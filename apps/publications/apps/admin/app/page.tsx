import { supabaseAdmin } from './supabase';
import { PublicationList } from './components/PublicationList';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { data: publications, error } = await supabaseAdmin
    .from('publications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen p-8 bg-red-50 text-red-900">
        <h1 className="text-2xl font-bold">Error loading publications</h1>
        <p className="mt-4">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Publications Admin</h1>
            <p className="text-neutral-500 mt-1">Manage all current publications easily</p>
          </div>
        </header>
        
        <PublicationList initialPublications={publications || []} />
      </div>
    </main>
  );
}
