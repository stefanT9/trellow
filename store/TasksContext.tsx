import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Task } from "../entities/Task";

interface TasksState {
  state: {
    tasks: Task[];
    isFetching: boolean;
    selectedTask?: Task;
    error?: string;
    currentCategory?: string;
  };
  functions: {
    getTasks: (boardId: string) => void;
    deleteTask: (task: Task) => void;
    updateTask: (task: Partial<Task>) => void;
    createTask: (task: Partial<Task>) => void;
    setCurrentCategory: (category: string) => void;
    selectTask: (task?: Task) => void;
  };
}
const defaultState: TasksState = {
  state: {
    tasks: [],
    isFetching: true,
  },
  functions: {
    getTasks: () => {},
    deleteTask: () => {},
    updateTask: () => {},
    createTask: () => {},
    setCurrentCategory: () => {},
    selectTask: () => {},
  },
};
export const TasksContext = createContext(defaultState);

export default function TasksProvider({ children }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [error, setError] = useState<string>();
  const [boardId, setBoardId] = useState<string>();
  const [currentCategory, setCurrentCategory] = useState("");

  const fetchTasks = (boardIdd?: string) => {
    setIsFetching(true);
    axios
      .get(`/api/boards/${boardId || boardIdd}/tasks`)
      .then((res) => {
        setTasks(res.data);
        setIsFetching(false);
        setError(undefined);
      })
      .catch((err) => {
        setError(err);
        setTasks([]);
        setIsFetching(false);
      });
  };
  const updateTask = (task: Partial<Task>) => {
    return axios
      .put(`/api/boards/${task.boardId}/tasks/${task._id}`, {
        ...task,
      })
      .then((res) => {
        fetchTasks(task.boardId);
      })
      .catch((err) => {
        fetchTasks(task.boardId);
      });
  };
  const deleteTask = (task: Task) => {
    return axios
      .delete(`/api/boards/${task.boardId}/tasks/${task._id}`)
      .then((res) => {
        fetchTasks(task.boardId);
      })
      .catch((err) => {
        fetchTasks(task.boardId);
      });
  };

  const createTask = (task: Partial<Task>) => {
    return axios
      .post(`/api/boards/${boardId}/tasks`, {
        ...task,
        boardId,
        status: currentCategory,
      })
      .then((res) => {
        fetchTasks(task.boardId);
      })
      .catch((err) => {
        fetchTasks(task.boardId);
      });
  };
  const getTasks = (boardId: string) => {
    setIsFetching(true);
    setBoardId(boardId);
    fetchTasks(boardId);
  };
  return (
    <TasksContext.Provider
      value={{
        state: {
          tasks,
          isFetching,
          selectedTask,
          error,
        },
        functions: {
          getTasks,
          deleteTask,
          updateTask,
          createTask,
          setCurrentCategory: (category) => setCurrentCategory(category),
          selectTask: (task?: Task) => setSelectedTask(task),
        },
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
