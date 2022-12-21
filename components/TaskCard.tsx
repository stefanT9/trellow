import { Button, Card, Layout, Typography } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Task } from "../entities/Task";
import { useContext } from "react";
import { TasksContext } from "../store/TasksContext";
import { BoardsContext } from "../store/BoardsContext";
interface TaskCardProps {
  task: Task;
}

export function TaskCard(props: TaskCardProps) {
  const { task } = props;
  const { functions } = useContext(TasksContext);
  const selectedBoard: any = useContext(BoardsContext).state.selectedBoard;
  const currentIdx = selectedBoard?.categories.findIndex(
    (category: any) => category === task.status
  );
  return (
    <Card
      title={task.title}
      actions={[
        <Button
          disabled={currentIdx === 0}
          onClick={() =>
            functions.updateTask({
              ...task,
              status:
                currentIdx !== undefined
                  ? selectedBoard?.categories[currentIdx - 1]
                  : selectedBoard?.categories[0],
            })
          }
        >
          <LeftOutlined />
        </Button>,
        <Button onClick={() => functions.deleteTask(task)}>
          <DeleteOutlined />
        </Button>,
        <Button onClick={() => functions.selectTask(task)}>
          <EditOutlined />
        </Button>,
        <Button
          disabled={currentIdx === selectedBoard?.categories.length - 1}
          onClick={() =>
            functions.updateTask({
              ...task,
              status:
                currentIdx !== undefined
                  ? selectedBoard?.categories[currentIdx + 1]
                  : selectedBoard?.categories[0],
            })
          }
        >
          <RightOutlined />
        </Button>,
      ]}
    >
      <Typography>{task.description}</Typography>
    </Card>
  );
}
