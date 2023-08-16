import { CarsProvider } from "@/contexts/Cars/CarsContext";
import { ModalProvider } from "@/contexts/Modal";
import { UserProvider } from "@/contexts/User/UserContext";
import "@/sass/global.scss";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <CarsProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </CarsProvider>
    </ModalProvider>
  );
};

export default App;
