import { Button } from "@/components/Button";

import "@/sass/global.scss";
// import "../components/Button/style.scss";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
