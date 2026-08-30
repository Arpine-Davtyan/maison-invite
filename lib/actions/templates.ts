"use server";

import { supabase } from "@/lib/supabase";

export type Template = {
    id: string;
    title: string | null;
    category: string | null;
    created_at: string;
    code: string | null;
    description: string | null;
    price: number | null;
    url: string | null;
    collection: string | null;
};

export type CreateTemplateInput = {
    title?: string;
    category?: string;
    code?: string;
    description?: string;
    price?: number;
    url?: string;
};

export type UpdateTemplateInput = Partial<CreateTemplateInput>;

export async function createTemplate(data: CreateTemplateInput) {
    const { data: template, error } = await supabase
        .from("templates")
        .insert({
            title: data.title ?? null,
            category: data.category ?? null,
            code: data.code ?? null,
            description: data.description ?? null,
            price: data.price ?? null,
            url: data.url ?? null,
        })
        .select()
        .single();

    if (error) {
        console.error("createTemplate error:", error);
        throw new Error(error.message);
    }

    return template as Template;
}

export async function getTemplates() {
    const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("getTemplates error:", error);
        throw new Error(error.message);
    }

    return data as Template[];
}

export async function getTemplateById(id: string) {
    const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("getTemplateById error:", error);
        throw new Error(error.message);
    }

    return data as Template;
}

export async function updateTemplate(
    id: string,
    data: UpdateTemplateInput
) {
    const { data: template, error } = await supabase
        .from("templates")
        .update(data)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("updateTemplate error:", error);
        throw new Error(error.message);
    }

    return template as Template;
}

export async function deleteTemplate(id: string) {
    const { error } = await supabase
        .from("templates")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("deleteTemplate error:", error);
        throw new Error(error.message);
    }

    return {
        success: true,
        id,
    };
}