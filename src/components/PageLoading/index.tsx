import { LoadingContext } from "@/contexts/Loading";
import { iChildrenProps } from "@/interfaces";
import { useContext } from "react";
import { Loading } from "./Loading";

interface IPageLoadingProps extends iChildrenProps {}

export default function PageLoading({ children }: IPageLoadingProps) {
  const { loading } = useContext(LoadingContext);

  return loading ? <Loading /> : children;
}
