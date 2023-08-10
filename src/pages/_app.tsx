import "@/sass/global.scss";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
}

export default App
