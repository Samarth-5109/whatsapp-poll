const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

const PHONE_NUMBER = "919818634811"; 

client.on("qr", async () => {
//   console.log("Scan this QR code:");
//   qrcode.generate(qr, { small: true });
    console.log("Generating pairing code...");
    try {
    const code = await client.requestPairingCode(PHONE_NUMBER);
    console.log("Pairing Code:", code);
    console.log("Open WhatsApp → Linked Devices → Link with phone number → enter this code.");
  } catch (err) {
    console.error("Pairing code error:", err);
  }
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

client.on("disconnected", (reason) => {
  console.log("WhatsApp disconnected:", reason);
  console.log("Reconnecting...");
  client.initialize();
});

client.initialize();

module.exports = client;