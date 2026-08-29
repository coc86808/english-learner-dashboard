const BOT_TOKEN = '8881426939:AAETXYAJFY2szUoWoam7mlntbqvbP0L0-5o';
const DEFAULT_USERNAME = 'sakin7112';

export async function sendTelegramMessage(text) {
  try {
    const updatesRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const updatesData = await updatesRes.json();
    
    let targetChatId = null;
    if (updatesData.ok && updatesData.result && updatesData.result.length > 0) {
      for (const update of updatesData.result) {
        const msg = update.message || update.edited_message || update.channel_post;
        if (msg && msg.chat) {
          const uName = (msg.chat.username || msg.from?.username || '').toLowerCase();
          if (uName === DEFAULT_USERNAME.toLowerCase()) {
            targetChatId = msg.chat.id;
            break;
          }
          if (msg.chat.type === 'private') {
            targetChatId = msg.chat.id;
          }
        }
      }
    }

    const chatIdToSend = targetChatId || `@${DEFAULT_USERNAME}`;

    const sendRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatIdToSend,
        text: text
      })
    });

    const sendData = await sendRes.json();
    return { ok: sendData.ok, data: sendData, targetChatId: chatIdToSend };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const args = process.argv.slice(2);
const messageToSend = args.join(' ') || '🔔 [Rules Agent] Rules Updated';
sendTelegramMessage(messageToSend).then((res) => {
  console.log(JSON.stringify(res, null, 2));
});
