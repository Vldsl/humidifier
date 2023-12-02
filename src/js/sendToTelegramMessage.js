const TELEGRAM_BOT_TOKEN = "6714113757:AAGbpOVZRF-Gy8bCc5B2vKnF0sTuaV4R5FU";
const telegramBotToken = TELEGRAM_BOT_TOKEN;
const chatIds = [518709933, 592035412];

let registrationNumber = 1;

export const sendToTelegramMessage = async (
  phoneNumber,
  userName,
  count,
  text
) => {
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  const message = `New registration #${registrationNumber}:\nPhone Number: ${phoneNumber}\nName: ${userName}\nКоличество: ${count}\nЦена: ${text}`;
  registrationNumber++;
  console.log(message);

  for (const chatId of chatIds) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();
  }
};
