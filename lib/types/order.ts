export type Order = {
    id: string;
    template_id: string | null;
    full_name: string | null;
    phone: string | null;
    date: string;
    created_at: string | null;
    email: string | null;
};

export type OrderWithTemplate = Order & {
    templates: {
        id: string;
        title: string | null;
        category: string | null;
        code: string | null;
        price: number | null;
        url: string | null;
    } | null;
};

export type CreateOrderInput = {
    template_id?: string | null;
    full_name?: string;
    phone?: string;
    date: string;
    email?: string;
    note?: string;
    location?: string;
    invitationNames?: string;
};

export type UpdateOrderInput = Partial<CreateOrderInput>;