import { Button, Card, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Board } from "../entities/Board";

interface BoardCardProps {
  board: Board;
}
const gridStyle: React.CSSProperties = {
  width: "25%",
};

export function BoardCard(props: BoardCardProps) {
  const { board } = props;
  const navigate = useRouter();
  return (
    <Link href={`boards/${board._id}`} style={gridStyle}>
      <Card
        title={board.title}
        actions={[
          <Button
            onClick={(evt) => {
              evt.preventDefault();
            }}
          >
            {(board.starred && <StarFilled />) || <StarOutlined />}
          </Button>,
        ]}
      >
        <Typography>{board.description}</Typography>
      </Card>
    </Link>
  );
}
