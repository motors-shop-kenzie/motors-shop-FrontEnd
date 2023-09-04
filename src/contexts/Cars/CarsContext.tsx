/* eslint-disable react-hooks/exhaustive-deps */
import { iComment } from "@/components/Forms/CreateComment";
import Toast from "@/components/Toast";
import { useModal } from "@/hooks/modalHook";
import { useRequest } from "@/hooks/useRequest";
import { iChildrenProps } from "@/interfaces";
import { ICreateCarImg, TCarImg, TCarProduct, TCarUpdate, TCarsPayloadRequest } from "@/interfaces/CarProduc";
import api from "@/services/api";
import { HttpStatusCode } from "axios";
import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
import { ICarsContext, TPaginationValue } from "./interface";

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);

interface iCommentInfos {
  id: string;
  comment: string;
}

export const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<TCarProduct[]>([]);
  const [userCars, setUserCars] = useState<TCarProduct[]>([]);
  const [filterData, setFilterData] = useState<TCarProduct[]>([]);
  const [singleCar, setSingleCar] = useState<TCarProduct | undefined>({} as TCarProduct);
  const [comment, setComment] = useState<iComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [retrieveComment, setRetrieveComment] = useState<string | null>(null);
  const { closeModal } = useModal();
  const [pageValues, setPageValues] = useState<TPaginationValue>({} as TPaginationValue);
  const [page, setPage] = useState<number>(1);
  const [selectedCar, setSelectedCar] = useState("");
  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const request = useRequest();

  const createCars = async (formData: TCarsPayloadRequest) => {
    await request({
      tryFn: async () => {
        const response = await api.post<TCarProduct>("/cars", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars((prev) => [...prev, response.data]);
        Toast({ message: "Anúncio criado com sucesso !", isSucess: true });
        await getAllCarsRequest();
        await getUserCars();
      },
      onErrorFn: () => Toast({ message: "Tente novamente" }),
    });
  };

  const getAllCarsRequest = async () => {
    await request({
      tryFn: async () => {
        const response = await api.get(`/cars/pagination?page=${page}`);
        const data = response.data;
        setPageValues(data);
        setCars(data.data);
      },
      onErrorFn: () => Toast({ message: "Não foi possível carregar todos os carros" }),
    });
  };

  const getUserCars = async () => {
    if (token) {
      await request({
        tryFn: async () => {
          const response = await api.get("/cars/logged");
          const data = response.data;
          setUserCars(data);
        },
        onErrorFn: () => Toast({ message: "Não foi possível carregar seus carros" }),
      });
    }
  };

  const getSingleCar = async (id: string) => {
    try {
      const { data } = await api.get<TCarProduct>(`/cars/${id}`);
      setSingleCar(data);
    } catch (error) {
      Toast({ message: "Não foi possível carregar as informações deste carro" });
    }
  };

  const getComment = async (carId: string) => {
    try {
      const res = await api.get(`/comments/${carId}`);
      const commentData = res.data;

      setComment(commentData);
    } catch (error) {
      Toast({ message: "Não foi possível carregar os comentários desse carro" });
    }
  };

  const patchComment = async (data: string, commentId: string) => {
    try {
      const res = await api.patch(`/comments/${commentId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Toast({ message: "Informações atualizadas com sucesso!", isSucess: true });
      setComment((commentData) => {
        const updateComment = commentData.map((comments) =>
          comments.id === commentId ? { ...comments, ...res.data } : comments,
        );
        return updateComment;
      });
    } catch {
      Toast({ message: "Não foi possível editar seu comentário,confira se esse campo não está vazio." });
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = comment.filter((comments) => comments.id !== commentId);

      setComment(data);
      closeModal();
      Toast({ message: "Comentário deletado", isSucess: true });
    } catch (error) {
      Toast({ message: "Não foi possível deletar seu comentário" });
    }
  };

  const patchCar = async (updatePayload: TCarUpdate) => {
    await request({
      tryFn: async () => {
        const { data, status } = await api.patch<TCarProduct>(`cars/${singleCar?.id}`, updatePayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSingleCar(data);
        if (status === HttpStatusCode.Ok) Toast({ message: "Informações atualizadas com sucesso!", isSucess: true });

        await getAllCarsRequest();
        await getUserCars();
      },
      onErrorFn: () => Toast({ message: "Não foi possível atualizar as informações do anúncio", isSucess: false }),
    });
  };

  const destroyCar = async () => {
    await request({
      tryFn: async () => {
        await api.delete(`cars/${selectedCar}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = cars.filter((car) => car.id !== selectedCar);

        setUserCars(data);
        setCars(data);
        closeModal();

        Toast({ message: "Anúncio deletado com sucesso!", isSucess: true });
      },
      onErrorFn: () => Toast({ message: "Não foi possível deletar o anúncio" }),
    });
  };

  const createImg = async (payload: ICreateCarImg) =>
    await request({
      tryFn: async () => {
        await api.post<TCarProduct>(`imgs/`, payload);
      },
      onErrorFn: () => Toast({ message: "Não foi possível atualizar as informações do anúncio", isSucess: false }),
    });

  const patchImg = async (payload: TCarImg) =>
    await request({
      tryFn: async () => {
        const { id, ...patchData } = payload;
        await api.patch<TCarProduct>(`imgs/${id}`, patchData);
      },
      onErrorFn: () => Toast({ message: "Não foi possível atualizar as informações do anúncio", isSucess: false }),
    });

  const destroyImg = async ({ id }: TCarImg) =>
    await request({
      tryFn: async () => {
        await api.delete<TCarProduct>(`imgs/${id}`);
      },
      onErrorFn: () => Toast({ message: "Não foi possível atualizar as informações do anúncio", isSucess: false }),
    });

  useEffect(() => {
    (async () => {
      api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
      await getAllCarsRequest();
      await getUserCars();
    })();
  }, [page]);

  return (
    <CarsContext.Provider
      value={{
        cars,
        setCars,
        userCars,
        setUserCars,
        getAllCarsRequest,
        getUserCars,
        filterData,
        setFilterData,
        createCars,
        getSingleCar,
        singleCar,
        setSingleCar,
        getComment,
        comment,
        setComment,
        patchComment,
        editingCommentId,
        setEditingCommentId,
        deleteComment,
        pageValues,
        setPage,
        page,
        patchCar,
        destroyCar,
        createImg,
        patchImg,
        destroyImg,
        selectedCar,
        setSelectedCar,
        retrieveComment,
        setRetrieveComment,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
