import Express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';

// Import lowdb dynamically
const getDB = async () => {
  const { JSONFilePreset } = await import('lowdb/node');
  const db = JSONFilePreset<{ tasks: Task[] }>('./db.json', { tasks: [] });
  return db;
};

const app = Express();

app.use(bodyParser.json());

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

app.get('/tasks', async (_req: Request, res: Response) => {
  const db = await getDB();
  res.send(db.data.tasks);
});

app.post('/tasks', async (req: Request, res: Response) => {
  const task: Task = req.body;
  const db = await getDB();

  task.id = uuid();
  db.data.tasks.push(task);

  await db.write();
  res.send(task);
});

app.put('/tasks/:taskId', async (req: Request, res: Response) => {
  const db = await getDB();
  const payload: Task = req.body;
  const taskId = req.params.taskId;

  db.data.tasks = db.data.tasks.map(task =>
    task.id === taskId ? { ...task, ...payload } : task
  );

  await db.write();
  res.send({});
});

app.delete('/tasks/:taskId', async (req: Request, res: Response) => {
  const db = await getDB();
  const taskId = req.params.taskId;

  db.data.tasks = db.data.tasks.filter(task => task.id !== taskId);

  await db.write();
  res.send({});
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
