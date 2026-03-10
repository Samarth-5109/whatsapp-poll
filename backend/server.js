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
    nextPoll: "8:30 PM IST",
  });
});

/* ------------------ WHATSAPP CLIENT READY ------------------ */

client.on("ready", () => {
  console.log("WhatsApp connected!");

  if (cronStarted) return;
  cronStarted = true;

  cron.schedule(
    "30 20 * * 0-4",
    async () => {
      const today = new Date().toISOString().split("T")[0];

      if (lastPollDate === today) {
        console.log("Poll already sent today, skipping.");
        return;
      }

      if (holidays.includes(today)) {
        console.log("Office holiday — poll not sent");
        return;
      }

      console.log("Sending taxi poll...");

      let pollMessage;

      try {
        await client.pupPage.bringToFront();

        const chat = await client.getChatById(GROUP_ID);

        pollMessage = await chat.sendMessage(
          new Poll("🚕", ["Yes", "No"])
        );

        console.log("Poll sent");

        lastPollDate = today;

      } catch (err) {
        console.log("Poll failed:", err);
        return;
      }

      setTimeout(async () => {
        try {
          await pollMessage.vote([1]);
          console.log("Bot voted 'No'");
        } catch (err) {
          console.log("Voting failed:", err);
        }
      }, 7000);
    },
    { timezone: "Asia/Kolkata" }
  );

  console.log("Cron job started");
});


// START SERVER (outside ready event)
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});