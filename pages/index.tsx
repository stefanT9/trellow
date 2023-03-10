import { Button } from "antd";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import BoardsSection from "../components/BoardsSection";
import CreateBoardDialog from "../components/CreateBoardDialog";
import { BoardsContext } from "../store/BoardsContext";
import { Spin } from "antd";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const { state, functions } = useContext(BoardsContext);
  const { boards } = state;

  useEffect(() => {
    functions.getBoards();
    functions.deselectBoard();
  }, []);

  return (
    <div>
      <Head>
        <title>Trellow</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {state.isFetching && <Spin size="large" />}
      {!state.isFetching && (
        <main>
          <Button onClick={() => setOpen(true)}>Create Board</Button>

          <BoardsSection
            title="Starred"
            boards={boards.filter(({ starred }) => starred)}
          />
          <BoardsSection
            title="Mine"
            boards={boards.filter(({ starred }) => !starred)}
          />
          {open && (
            <CreateBoardDialog
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          )}
        </main>
      )}
    </div>
  );
}
