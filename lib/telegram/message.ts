"use server";

import { sendTelegramMessage } from "@/lib/actions/telegram";
import { CreateOrderInput } from "../types/order";

export async function sendOrderTelegram(data: CreateOrderInput) {
  const domain = process.env.NEXT_PUBLIC_URL!;

  const formattedDate = new Date(
    `${data.date}T00:00:00`
  ).toLocaleDateString("en-GB");

  const productUrl = data.template_id
    ? `${domain}/order/${data.template_id}`
    : domain;

  const text = `
<b>🔔 Նոր պատվեր</b>

<b>ID:</b> ${data.template_id ?? ""}
<b>Promo Code:</b> ${data.promo_code ?? ""}

<b>Անուն:</b> ${data.full_name ?? ""}
<b>Հեռախոս:</b> ${data.phone ?? ""}
<b>Email:</b> ${data.email ?? ""}

<b>📅 </b> ${formattedDate}
<b>📍 </b> ${data.location ?? ""}

<b>💌 </b> ${data.invitationNames ?? ""}

<b>📝 Նշում:</b>
${data.note ?? ""}

<a href="${productUrl}">Դիտել հրավերը</a>
`;

  return sendTelegramMessage({
    text,
  });
}