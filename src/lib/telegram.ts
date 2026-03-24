// ============================================================
// Telegram Bot Notification
// ============================================================
// Чтобы подключить:
// 1. Открой @BotFather в Telegram → /newbot → получи токен
// 2. Создай группу, добавь бота, отправь сообщение
// 3. Открой: https://api.telegram.org/bot<TOKEN>/getUpdates
//    → найди "chat":{"id": -100XXXXXXXXXX} — это CHAT_ID
// 4. Замени значения ниже на реальные
// ============================================================

const BOT_TOKEN = "8600635626:AAEz2pwd3dYpKLVfwl3jQvMIGkmnRlg9qUk";
const CHAT_ID = "-1003817212452";

const IS_CONFIGURED = true;

interface BookingData {
  service: string;
  price: string;
  master: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  comment?: string;
}

function formatBookingMessage(data: BookingData): string {
  const lines = [
    "📋 *Новая заявка на запись*",
    "",
    `💅 *Услуга:* ${escapeMarkdown(data.service)}`,
    `💰 *Цена:* ${escapeMarkdown(data.price)}`,
    `👩 *Мастер:* ${escapeMarkdown(data.master)}`,
    `📅 *Дата:* ${escapeMarkdown(data.date)}`,
    `🕐 *Время:* ${escapeMarkdown(data.time)}`,
    "",
    `👤 *Клиент:* ${escapeMarkdown(data.clientName)}`,
    `📞 *Телефон:* ${escapeMarkdown(data.clientPhone)}`,
  ];

  if (data.comment) {
    lines.push(`💬 *Комментарий:* ${escapeMarkdown(data.comment)}`);
  }

  lines.push("", "—————————————————");
  lines.push(`_Отправлено с сайта ЛАЙК НЭЙЛС_`);

  return lines.join("\n");
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export async function sendBookingToTelegram(data: BookingData): Promise<{ ok: boolean; fallback?: boolean }> {
  if (!IS_CONFIGURED) {
    console.warn("[Telegram] Bot not configured — skipping notification");
    return { ok: true, fallback: true };
  }

  try {
    const message = formatBookingMessage(data);
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[Telegram] API error:", err);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("[Telegram] Network error:", error);
    return { ok: false };
  }
}

interface ReviewData {
  name: string;
  rating: number;
  text: string;
}

export async function sendReviewToTelegram(data: ReviewData): Promise<{ ok: boolean }> {
  if (!IS_CONFIGURED) {
    return { ok: true, fallback: true } as { ok: boolean };
  }

  try {
    const stars = "⭐".repeat(data.rating);
    const message = [
      "💬 *Новый отзыв с сайта*",
      "",
      `${stars} \\(${data.rating}/5\\)`,
      "",
      `"${escapeMarkdown(data.text)}"`,
      "",
      `— ${escapeMarkdown(data.name)}`,
      "",
      "_Отправлено с сайта ЛАЙК НЭЙЛС_",
    ].join("\n");

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    });

    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}
