import { Button } from "@/components/Button";

import "@/sass/global.scss";
// import "../components/Button/style.scss";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
}

export default App
