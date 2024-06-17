import { Task } from "../models/Task";
import {client, config} from "./http.client.initial";

const upsertTaskAsync = async (task: Task) => {
  return await client.post('/api/task/upsert', task, config);
}

const getTasksByUserIdAsync = async (userId: number, status: string, priority: string) => {
  return await client.get(`/api/task?UserId=${userId}&Status=${status}&Priority=${priority}`, config);
}

const removeTaskAsync = async (id: number) => {
  return await client.delete(`/api/task/${id}`, config);
}

export {
  upsertTaskAsync,
  getTasksByUserIdAsync,
  removeTaskAsync
}
