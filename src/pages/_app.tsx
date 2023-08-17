import { AuthProvider } from "@/contexts/Auth/authContext";
import { CarsProvider } from "@/contexts/Cars/CarsContext";
import { ModalProvider } from "@/contexts/Modal";
import "@/sass/global.scss";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <CarsProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CarsProvider>
    </ModalProvider>
  );
};

export default App;
