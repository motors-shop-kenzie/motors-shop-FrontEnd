import { AuthProvider } from "@/contexts/Auth/authContext";
import { CarsProvider } from "@/contexts/Cars/CarsContext";
import { ModalProvider } from "@/contexts/Modal";
import "@/sass/global.scss";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "@/contexts/Loading";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <LoadingProvider>
        <ModalProvider>
          <CarsProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </CarsProvider>
        </ModalProvider>
      </LoadingProvider>
    </>
  );
};

export default App;
