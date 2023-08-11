import { CarsProvider } from "@/contexts/Cars/CarsContext";
import { ModalProvider } from "@/contexts/Modal";
import "@/sass/global.scss";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <CarsProvider>
        <Component {...pageProps} />
      </CarsProvider>
    </ModalProvider>
  );
};

export default App;
