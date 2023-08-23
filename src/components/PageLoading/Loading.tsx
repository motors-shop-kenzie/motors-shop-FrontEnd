import { LoadingContext } from "@/contexts/Loading";
import { useContext, useEffect } from "react";

export const Loading = () => {
  const { setLoading } = useContext(LoadingContext);

  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  return (
    <div>
      <h1>Carregando...</h1>
    </div>
  );
};
