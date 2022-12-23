import MainLayout from "../src/components/MainLayout";
import "../styles/globals.css";
import "../styles/general.sass";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      {" "}
      <Component {...pageProps} />{" "}
    </MainLayout>
  );
}
