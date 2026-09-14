export type Order = {
    id: string;
    template_id: string | null;
    full_name: string | null;
    phone: string | null;
    date: string;
    created_at: string | null;
    email: string | null;
    promo_id: string | null;
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

    promo_codes: {
        id: string;
        code: string;
        discount_percent: number | null;
        commission_percent: number | null;
        partner_name: string;
        insta_link: string | null;
    } | null;
};

export type CreateOrderInput = {
    template_id?: string | null;
    full_name?: string;
    phone?: string;
    date: string;
    email?: string;
    promo_code?: string | null;
    note?: string;
    location?: string;
    invitationNames?: string;
};

export type UpdateOrderInput = Partial<CreateOrderInput>;