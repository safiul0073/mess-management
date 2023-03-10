import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { userAxios } from "../config/exios.config";
import { API_URL } from "../constant";

export const getData = (url: string, params: any = {}) => {
  // let id = null
  // if (params.id && typeof params.id === 'string' || typeof params.id === 'number') {
  //     id = params.id
  // }
  return useQuery(
    [url],
    async () => {
      const res = await userAxios
        .get(`${API_URL}${url}`, {
          // eslint-disable-next-line object-shorthand
          params: params,
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message, {
            position: "top-right",
          });
        });

      return res?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
