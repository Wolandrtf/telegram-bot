const TelegramApi = require('node-telegram-bot-api');
const db = require('./csvjson.json');

const token = '5090336681:AAFiMwKnQKjhSD0N8Bz0mJ5Lx_kJjumPta4';

const bot = new TelegramApi(token, {polling: true});

bot.on('message', async (msg) => {
    const {text, chat} = msg;
    const {id} = chat;
    console.log(text);
    console.log(id);

    if (text === '/start') {
        await bot.sendMessage(id, 'Добро пожаловать в Словарь сокращений ПочтаТеха. Введи сокращение и получишь расшифровку');
    }

    const words = db.filter(entry => entry.short.trim().toLowerCase() === text.trim().toLowerCase());
    if (words.length > 0) {
        await bot.sendMessage(id, words.map(word => word.full).join(' ИЛИ '));
    } else {
        await bot.sendMessage(id, 'Ничего не найдено');
    }

    console.log(db);

})