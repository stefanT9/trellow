import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Board } from "../entities/Board";

interface BoardsState {
  state: {
    boards: Board[];
    isFetching: boolean;
    selectedBoard?: Board;
    error?: string;
  };
  functions: {
    getBoards: () => void;
    deleteBoard: (board: Board) => void;
    updateBoard: (board: Partial<Board>) => void;
    createBoard: (board: Partial<Board>) => void;
    getBoardById: (id: string) => void;
    deselectBoard: () => void;
    selectBoard: (board: Board) => void;
  };
}
const defaultState: BoardsState = {
  state: {
    boards: [],
    isFetching: true,
  },
  functions: {
    getBoardById: () => {},
    getBoards: () => {},
    deleteBoard: () => {},
    updateBoard: () => {},
    createBoard: () => {},
    deselectBoard: () => {},
    selectBoard: () => {},
  },
};
export const BoardsContext = createContext(defaultState);

export default function BoardsProvider({ children }: any) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [error, setError] = useState<string>();

  const fetchBoards = () => {
    axios
      .get("/api/boards")
      .then((res) => {
        setBoards(res.data);
        setIsFetching(false);
        setError(undefined);
      })
      .catch((err) => {
        setError(err);
        setBoards([]);
        setIsFetching(false);
      });
  };
  const getBoardById = (id: string) => {
    axios
      .get(`/api/boards/${id}`)
      .then((res) => {
        setSelectedBoard(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };
  const updateBoard = (board: Partial<Board>) => {
    return axios
      .put(`/api/boards/${board._id}`, {
        ...board,
      })
      .then((res) => {
        fetchBoards();
      })
      .catch((err) => {
        fetchBoards();
      });
  };
  const deleteBoard = (board: Board) => {
    return axios
      .delete(`/api/boards/${board._id}`)
      .then((res) => {
        fetchBoards();
      })
      .catch((err) => {
        fetchBoards();
      });
  };

  const createBoard = (board: Partial<Board>) => {
    console.log("am doing dis", {
      ...board,
      categories: [],
    });
    return axios
      .post(`/api/boards`, {
        ...board,
        categories: [],
      })
      .then((res) => {
        fetchBoards();
      })
      .catch((err) => {
        fetchBoards();
      });
  };
  const getBoards = () => {
    setIsFetching(true);
    fetchBoards();
  };
  const selectBoard = (board: Board) => {
    setSelectedBoard(board);
  };
  const deselectBoard = () => {
    setSelectedBoard(undefined);
  };
  return (
    <BoardsContext.Provider
      value={{
        state: {
          boards,
          isFetching,
          selectedBoard,
          error,
        },
        functions: {
          getBoards,
          deleteBoard,
          updateBoard,
          createBoard,
          deselectBoard,
          selectBoard,
          getBoardById,
        },
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}
