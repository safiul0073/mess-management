import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { API_URL } from "../constant";
import useAxios from "./useAxios";

export const getData = (url: string, params: any = {}) => {
  const api = useAxios();
  return useQuery(
    [url],
    async () => {
      const res = await api
        .get(`${API_URL}${url}`, {
          // eslint-disable-next-line object-shorthand
          params: params,
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message, {
            position: "top-right",
          });
        });

      return res?.data?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
