import { Form, Input, Modal, ModalProps } from "antd";
import { useContext } from "react";
import { Board } from "../entities/Board";
import { BoardsContext } from "../store/BoardsContext";

export default function CreateBoardDialog(props: ModalProps) {
  const [form] = Form.useForm<Partial<Board>>();
  const { functions } = useContext(BoardsContext);
  const saveBoard = (board: Partial<Board>) => {
    functions.createBoard(board);
  };

  return (
    <Modal
      {...props}
      title="Create Board"
      onOk={(e) => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            saveBoard(values);
            props.onOk && props.onOk(e);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={(e) => {
        props.onCancel && props.onCancel(e);
      }}
      okText="Create"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input a title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
