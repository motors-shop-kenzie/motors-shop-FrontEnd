/* eslint-disable react-hooks/exhaustive-deps */
import Toast from "@/components/Toast";
import { useRequest } from "@/hooks/useRequest";
import { iChildrenProps } from "@/interfaces";
import { Car } from "@/interfaces/CarFilter";
import { TCarsPayloadRequest } from "@/interfaces/CarProduc";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
import { ICarsContext } from "./interface";
import { iComment } from "@/components/Forms/CreateComment";
import { useModal } from "@/hooks/modalHook";

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);

interface iCommentInfos {
  id: string;
  comment: string;
}

export const CarsProvider = ({ children }: iChildrenProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [filterData, setFilterData] = useState<Car[]>([]);
  const [singleCar, setSingleCar] = useState<Car | undefined>({} as Car);
  const [comment, setComment] = useState<iComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const { closeModal } = useModal();

  const cookies = parseCookies();

  if (cookies["ccm.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
  }

  const token = cookies["ccm.token"];

  const request = useRequest();

  const createCars = async (formData: TCarsPayloadRequest) => {
    await request({
      tryFn: async () => {
        const response = await api.post<Car>("/cars", formData, {
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
        const response = await api.get("/cars");
        const data = response.data;
        setCars(data);
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
      const response = await api.get(`/cars/${id}`);
      const data = response.data;
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
      Toast({ message: "Não foi possível editar seu comentário" });
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

  useEffect(() => {
    (async () => {
      api.defaults.headers.common.authorization = `Bearer ${cookies["ccm.token"]}`;
      await getAllCarsRequest();
      await getUserCars();
    })();
  }, []);

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
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
