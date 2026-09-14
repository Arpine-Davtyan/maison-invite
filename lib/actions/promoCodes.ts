"use server";

import { supabase } from "@/lib/supabase";

export async function getActivePromoCodes() {
    const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching promo codes:", error);
        throw new Error("Failed to fetch promo codes");
    }

    return data;
}

export async function getPromoCode(code: string) {
    const normalizedCode = code.trim().toUpperCase();

    const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .eq("code", normalizedCode)
        .eq("active", true)
        .maybeSingle();

    if (error) {
        console.error("getPromoCode error:", error);
        return null;
    }

    return data;
}