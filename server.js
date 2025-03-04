const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // ✅ מחולל מזהים ייחודיים (UUID)

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// ✅ קבלת כל המשימות
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ✅ הוספת משימה (כל משימה תקבל `id` ייחודי)
app.post("/tasks", (req, res) => {
    console.log("📩 בקשה התקבלה:", req.body);
    const taskText = req.body.task;
    if (!taskText) {
        return res.status(400).json({ error: "❌ חסר תוכן למשימה" });
    }
    const newTask = { id: uuidv4(), task: taskText }; // יצירת מזהה ייחודי
    tasks.push(newTask);
    res.json({ message: "✅ המשימה נוספה בהצלחה!", tasks });
});

// ✅ מחיקת משימה לפי מזהה `id`
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "❌ משימה לא נמצאה" });
    }
    tasks.splice(taskIndex, 1);
    res.json({ message: "🗑️ המשימה נמחקה!", tasks });
});

// ✅ הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ השרת מאזין בכתובת: http://localhost:${PORT}`);
});
