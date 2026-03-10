'use server'

import { supabaseAdmin, PublicationInsert, PublicationUpdate } from './supabase';
import { revalidatePath } from 'next/cache';

export async function deletePublication(id: string) {
    const { error } = await supabaseAdmin.from('publications').delete().eq('id', id);
    if (error) {
        throw new Error(error.message);
    }
    revalidatePath('/');
}

export async function addPublication(data: PublicationInsert) {
    const { error, data: inserted } = await supabaseAdmin.from('publications').insert(data).select().single();
    if (error) {
        throw new Error(error.message);
    }
    revalidatePath('/');
    return inserted;
}

export async function updatePublication(id: string, data: PublicationUpdate) {
    const { error, data: updated } = await supabaseAdmin.from('publications').update(data).eq('id', id).select().single();
    if (error) {
        throw new Error(error.message);
    }
    revalidatePath('/');
    return updated;
}

export async function uploadPdf(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error('No file provided');
    }
    const category = formData.get('category') as string || 'uncategorized';
    const slug = formData.get('slug') as string || 'default';
    
    // Map category to folder name if possible
    const folders: Record<string, string> = {
        'research-paper': 'research-papers',
        'thesis': 'theses',
        'idea': 'ideas',
        'proposal': 'proposals',
    };
    const folder = folders[category] || category;
    
    const timestamp = new Date().getTime();
    const filePath = `${folder}/${slug}-${timestamp}.pdf`;

    const { data, error } = await supabaseAdmin.storage
        .from('publications')
        .upload(filePath, file, {
            contentType: 'application/pdf',
            upsert: false
        });

    if (error) {
        throw new Error(`Storage error: ${error.message}`);
    }

    return {
        path: data.path,
        size: file.size
    };
}
