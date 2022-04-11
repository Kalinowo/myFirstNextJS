import Layout from "../components/layout/Layout";
import "../styles/globals.css";

//_app.js可以被視為root component
//destructuring裡的Component是page裡面要被render的內容
//pageProps就是我們的page會接收到的props
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
