import { ModalProvider } from "@/contexts/Modal";
import "@/sass/global.scss";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
};

export default App;
