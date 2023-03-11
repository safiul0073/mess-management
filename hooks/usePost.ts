import { toast } from "react-hot-toast";

export const usePost = async (api: any, url: string, data: any) => {
  const res = await api.post(url, data).catch((err: any) => {
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
