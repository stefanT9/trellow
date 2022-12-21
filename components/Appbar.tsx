import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Appbar() {
  const router = useRouter();
  const { boardId, taskId } = router.query;

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href="/">Home</Link>
      </Breadcrumb.Item>
      {boardId && (
        <Breadcrumb.Item>
          <Link href="#">{boardId}</Link>
        </Breadcrumb.Item>
      )}
      {taskId && <Breadcrumb.Item>{}</Breadcrumb.Item>}
    </Breadcrumb>
  );
}
