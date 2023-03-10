import { toast } from "react-hot-toast";
import { userAxios } from "../config/exios.config";

export const usePost = async (url: string, data: any) => {
  const res = await userAxios.post(url, data).catch((err: any) => {
    toast.error(err?.response?.data.message, {
      position: "top-right",
    });
  });

  if (res?.data?.ok) {
    toast.success(res?.data?.message, {
      position: "top-right",
    });
  }

  return res;
};
