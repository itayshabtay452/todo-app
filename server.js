const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const task = req.body.task;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    tasks.push(task);
    res.json(task);
});

app.delete("/tasks/:index", (req, res) => {
    const index = req.params.index;
    if (index < 0 || index >= tasks.length) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(index, 1);
    res.json({ success: true });
});


// יצירת נתיב בסיסי
app.get("/", (req, res) => {
    res.send("🚀 השרת עובד בהצלחה!");
});

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ השרת מאזין בכתובת: http://localhost:${PORT}`);
});
