// import fetch from "./node-fetch";

// const express = require("express");
// const app = express();

// // Добавление заголовка X-Content-Type-Options: nosniff
// app.use((req, res, next) => {
//   res.setHeader("X-Content-Type-Options", "nosniff");
//   next();
// });

// app.use(express.static("public"));

// // Ваш остальной код Express

// app.listen(5500, () => {
//   console.log("Сервер запущен на порту 3000");
// });

const TELEGRAM_BOT_TOKEN = "6714113757:AAGbpOVZRF-Gy8bCc5B2vKnF0sTuaV4R5FU";
const telegramBotToken = TELEGRAM_BOT_TOKEN;
const chatIds = [518709933, 592035412];

let registrationNumber = 1;

export const sendTelegramMessage = async (count, phoneNumber, userName) => {
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  const message = `New registration #${registrationNumber}:\nPhone Number: ${phoneNumber}\nName: ${userName}\nКоличество: ${count}`;
  registrationNumber++;

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
    console.log(data);
  }
};
