

```js
console.log("Le numéro du propriétaire est :", ownerNumber);
console.log("Le nom du bot est :", botName);

require('dotenv').config()

const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (text === 'ping') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'pong!' }, { quoted: msg });
    }
  });
}

startBot();
```

