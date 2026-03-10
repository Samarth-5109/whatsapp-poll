const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    protocolTimeout: 120000,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

let qrShown = false;

client.on("qr", (qr) => {
  if (qrShown) return;
  qrShown = true;

  console.log("Scan this QR code:");
  qrcode.generate(qr, { small: true });
  console.log("QR Link:");
  console.log(
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`,
  );
});

client.on("ready", async () => {
  console.log("WhatsApp connected!");

  //   const chats = await client.getChats();

  //   chats.forEach((chat) => {
  //     if (chat.isGroup) {
  //       console.log("Group:", chat.name);
  //       console.log("ID:", chat.id._serialized);
  //       console.log("----------------");
  //     }
  //   });
});

//guard to avoid multiple reconnect loops.Sometimes Railway containers restart and initialize() gets called twice.
client.on("disconnected", (reason) => {
  console.log("WhatsApp disconnected:", reason);

  qrShown = false;

  setTimeout(() => {
    console.log("Reconnecting...");
    client.initialize();
  }, 5000);
});

client.initialize();

module.exports = client;
