const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { Poll } = require("whatsapp-web.js");
const client = require("./whatsapp");

const app = express();

app.use(cors());
app.use(express.json());

const GROUP_ID = "120363422779147089@g.us";

const holidays = ["2026-03-20"];

let cronStarted = false;

client.on("ready", () => {
  console.log("WhatsApp connected!");

  if (cronStarted) return;
  cronStarted = true;

  cron.schedule("7 20 * * 1-5", async () => {
    const today = new Date().toISOString().split("T")[0];

    if (holidays.includes(today)) {
      console.log("Office holiday — poll not sent");
      return;
    }

    console.log("Sending taxi poll...");

    const chat = await client.getChatById(GROUP_ID);

    const pollMessage = await chat.sendMessage(new Poll("🚕", ["Yes", "No"]));

    console.log("Poll sent");

    console.log("Poll sent");

    // wait 3 seconds so WhatsApp registers the poll
    setTimeout(async () => {
      try {
        await pollMessage.vote([1]);
        console.log("Bot voted 'No'");
      } catch (err) {
        console.log("Voting failed:", err);
      }
    }, 3000);
  });

  console.log("Cron job started");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
