"use server";

import { supabase } from "@/lib/supabase";
import { CreateOrderInput, Order, OrderWithTemplate, UpdateOrderInput } from "../types/order";
import { sendOrderTelegram } from "../telegram/message";

export async function createOrder(data: CreateOrderInput) {
    const { data: order, error } = await supabase
        .from("orders")
        .insert({
            template_id: data.template_id ?? null,
            full_name: data.full_name ?? null,
            phone: data.phone ?? null,
            date: data.date,
            email: data.email ?? null,
            note: data.note ?? null,
            location: data.location ?? null,
            invitationNames: data.invitationNames ?? null,
        })
        .select()
        .single();

    try {
        const telegramResult = await sendOrderTelegram(data);

        if (!telegramResult.success) {
            console.error(
                "Order created, but Telegram failed:",
                telegramResult.error
            );
        }
    } catch (error) {
        console.error(
            "Order created, but Telegram request failed:",
            error
        );
    }

    return order as Order;
}

export async function getOrders() {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            templates (
                id,
                title,
                category,
                code,
                price,
                url
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("getOrders error:", error);
        throw new Error(error.message);
    }

    return data as OrderWithTemplate[];
}

export async function getOrderById(id: string) {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            templates (
                id,
                title,
                category,
                code,
                price,
                url
            )
        `)
        .eq("id", id)
        .single();

    if (error) {
        console.error("getOrderById error:", error);
        throw new Error(error.message);
    }

    return data as OrderWithTemplate;
}

export async function updateOrder(
    id: string,
    data: UpdateOrderInput
) {
    const { data: order, error } = await supabase
        .from("orders")
        .update(data)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("updateOrder error:", error);
        throw new Error(error.message);
    }

    return order as Order;
}

export async function deleteOrder(id: string) {
    const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("deleteOrder error:", error);
        throw new Error(error.message);
    }

    return {
        success: true,
        id,
    };
}