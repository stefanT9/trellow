import Link from "next/link";
import { Button, Card, Typography } from "antd";
import {
  StarOutlined,
  StarFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Board } from "../entities/Board";
import { useContext, useState } from "react";
import { BoardsContext } from "../store/BoardsContext";
import EditBoardDialog from "./EditBoardDialog";

const gridStyle: React.CSSProperties = {
  width: "25%",
};
interface BoardsSectionProps {
  title: string;
  boards: Board[];
}

export default function BoardsSection(props: BoardsSectionProps) {
  const { title, boards } = props;
  const { functions, state } = useContext(BoardsContext);

  return (
    <section>
      <Card title={title}>
        {boards.map((board) => (
          <Card.Grid key={board._id}>
            <Link href={`boards/${board._id}`} style={gridStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography.Title level={4}>{board.title}</Typography.Title>
                  <Typography.Paragraph>
                    {board.description}
                  </Typography.Paragraph>
                </div>
                <div>
                  <Button
                    onClick={(evt) => {
                      evt.preventDefault();
                      functions.updateBoard({
                        ...board,
                        starred: !board.starred,
                      });
                    }}
                  >
                    {board.starred ? <StarFilled /> : <StarOutlined />}
                  </Button>
                  <Button
                    onClick={(evt) => {
                      evt.preventDefault();
                      functions.selectBoard(board);
                    }}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    onClick={(evt) => {
                      evt.preventDefault();
                      functions.deleteBoard(board);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            </Link>
          </Card.Grid>
        ))}
      </Card>

      {state.selectedBoard && (
        <EditBoardDialog
          open={true}
          onOk={() => functions.deselectBoard()}
          onCancel={() => functions.deselectBoard()}
        />
      )}
    </section>
  );
}
