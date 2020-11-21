import { useSelector } from "react-redux";
import Link from "next/link";
import Layout from "../src/components/layout/Layout";

const codeStyle = {
  background: "#ebebeb",
  width: 400,
  padding: 10,
  border: "1px solid grey",
  marginBottom: 10,
};

const ShowReduxState = () => {
  const state = useSelector((state) => state);

  return (
    <Layout>
      <pre style={codeStyle}>
        <code>{JSON.stringify(state, null, 4)}</code>
      </pre>
      <Link href="/">
        <a>Go Back Home</a>
      </Link>
    </Layout>
  );
};

export default ShowReduxState;
