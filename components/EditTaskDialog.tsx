import { Form, Input, Modal, ModalProps } from "antd";
import { useContext } from "react";
import { Task } from "../entities/Task";
import { TasksContext } from "../store/TasksContext";

export default function EditTaskDialog(props: ModalProps) {
  const [form] = Form.useForm<Partial<Task>>();
  const { functions, state } = useContext(TasksContext);
  const saveTask = (task: Partial<Task>) => {
    functions.updateTask({
      ...state.selectedTask,
      ...task,
    });
  };

  return (
    <Modal
      {...props}
      title="Edit Task"
      onOk={(e) => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            saveTask({ ...values });
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
