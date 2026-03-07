const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { Poll } = require("whatsapp-web.js");
const client = require("./whatsapp");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GROUP_ID = "120363422779147089@g.us";

const holidays = ["2026-03-20"];

let cronStarted = false;
let lastPollDate = null;
/* ------------------ MONITORING ENDPOINTS ------------------ */

app.get("/", (req, res) => {
  res.send("Taxi Poll Bot running 🚕");
});

app.get("/status", (req, res) => {
  res.json({
    bot: "running",
    cron: cronStarted ? "active" : "not started",
    nextPoll: "8:15 PM IST",
  });
});

/* ------------------ WHATSAPP CLIENT READY ------------------ */

client.on("ready", () => {
  console.log("WhatsApp connected!");

  if (cronStarted) return;
  cronStarted = true;

  cron.schedule(
    "15 20 * * 0-4",
    async () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const today = now.toISOString().split("T")[0];

      // Prevent running outside the exact time
      if (hour !== 20 || minute !== 22) {
        console.log("Cron triggered outside scheduled time, skipping.");
        return;
      }

      // Prevent duplicate poll on restart
      if (lastPollDate === today) {
        console.log("Poll already sent today, skipping.");
        return;
      }

      if (holidays.includes(today)) {
        console.log("Office holiday — poll not sent");
        return;
      }

      lastPollDate = today;

      console.log("Sending taxi poll...");

      const chat = await client.getChatById(GROUP_ID);

      const pollMessage = await chat.sendMessage(new Poll("🚕", ["Yes", "No"]));

      console.log("Poll sent");

      // wait 3 seconds so WhatsApp registers the poll
      setTimeout(async () => {
        try {
          await pollMessage.vote([1]);
          console.log("Bot voted 'No'");
        } catch (err) {
          console.log("Voting failed:", err);
        }
      }, 7000);
    },
    {
      timezone: "Asia/Kolkata",
    },
  );

  console.log("Cron job started");
});

/* ------------------ START SERVER ------------------ */

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
