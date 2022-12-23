import "./globals.scss";
import type { AppProps } from "next/app";
import { ConfigProvider, Layout } from "antd";
const { Header, Content } = Layout;
import styles from "./_app.module.scss";
import Appbar from "../components/Appbar";
import BoardsProvider from "../store/BoardsContext";
import TasksProvider from "../store/TasksContext";

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgHeader: "#E0E0E0",
          },
        },
      }}
    >
      <BoardsProvider>
        <TasksProvider>
          <Layout className={styles.fullPageContainer}>
            <Header>
              <Appbar />
            </Header>
            <Content>
              <Component {...pageProps} />
            </Content>
          </Layout>
        </TasksProvider>
      </BoardsProvider>
    </ConfigProvider>
  );
}
