import { toast } from "react-hot-toast";
import { userAxios } from "../config/exios.config";

export const useFetch = async (url: string, params: any = {}) => {
  const res: any = await userAxios.get(url, params).catch((err: any) => {
    toast.error(err?.response?.data.message, {
      position: "top-right",
    });
  });

  return res.data;
};
