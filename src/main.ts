import Express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";

// Import lowdb dynamically
const getDB = async () => {
  const { JSONFilePreset } = await import("lowdb/node");
  const db = JSONFilePreset<{ tasks: Task[]; taskLists: TaskList[] }>(
    "./db.json",
    { tasks: [], taskLists: [] }
  );
  return db;
};

const app = Express();

app.use(bodyParser.json());

interface Task {
  id: string;
  taskTitle: string;
  taskDesc: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

interface TaskList {
  id: string;
  listTitle: string;
  subtasks?: Task[];
}

// Global error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Task routes
app.get("/tasks", async (_req: Request, res: Response) => {
  try {
    const db = await getDB();
    res.send(db.data.tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const task: Task = req.body;
    const db = await getDB();

    // Validate task data
    if (!task.taskTitle || !task.taskDesc) {
      return res
        .status(400)
        .json({
          error: "Invalid task data\n Title and Description are required.",
        });
    }

    task.id = uuid();
    db.data.tasks.push(task);

    await db.write();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.put("/tasks/:taskId", async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const payload: Task = req.body;
    const taskId = req.params.taskId;

    // Validate task data
    if (!payload.taskTitle || !payload.taskDesc) {
      return res
        .status(400)
        .json({
          error: "Invalid task data\n Title and Description are required.",
        });
    }

    const taskIndex = db.data.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    db.data.tasks[taskIndex] = { ...db.data.tasks[taskIndex], ...payload };
    await db.write();
    res.send({});
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/tasks/:taskId", async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const taskId = req.params.taskId;

    const taskIndex = db.data.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    db.data.tasks.splice(taskIndex, 1);
    await db.write();
    res.send({});
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// TaskList routes
app.get("/tasklists", async (_req: Request, res: Response) => {
  try {
    const db = await getDB();
    res.send(db.data.taskLists);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve task lists" });
  }
});

app.post("/tasklists", async (req: Request, res: Response) => {
  try {
    const taskList: TaskList = req.body;
    const db = await getDB();

    // Validate task list data
    if (!taskList.listTitle) {
      return res
        .status(400)
        .json({ error: "Invalid task list data\n Title is required." });
    }

    taskList.id = uuid();

    // Generate unique IDs for each subtask
    if (taskList.subtasks) {
      taskList.subtasks.forEach((subtask) => {
        subtask.id = uuid();
      });}

    db.data.taskLists.push(taskList);

    await db.write();
    res.status(201).json(taskList);
  } catch (err) {
    res.status(500).json({ error:  err});
  }
});

app.put("/tasklists/:listId", async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const payload: TaskList = req.body;
    const listId = req.params.listId;

    // Validate task list data
    if (!payload.listTitle) {
      return res
        .status(400)
        .json({ error: "Invalid task list data\n Title is required." });
    }

    const listIndex = db.data.taskLists.findIndex((list) => list.id === listId);
    if (listIndex === -1) {
      return res.status(404).json({ error: "Task list not found" });
    }

    db.data.taskLists[listIndex] = {
      ...db.data.taskLists[listIndex],
      ...payload,
    };
    await db.write();
    res.send({});
  } catch (err) {
    res.status(500).json({ error: "Failed to update task list" });
  }
});

app.delete("/tasklists/:listId", async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const listId = req.params.listId;

    const listIndex = db.data.taskLists.findIndex((list) => list.id === listId);
    if (listIndex === -1) {
      return res.status(404).json({ error: "Task list not found" });
    }

    db.data.taskLists.splice(listIndex, 1);
    await db.write();
    res.send({});
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task list" });
  }
});

app.listen(9000, () => {
  console.log("http://localhost:9000/");
});
