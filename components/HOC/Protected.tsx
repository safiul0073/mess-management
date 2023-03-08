import { useStore } from "../../store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Protected = (Component: any): any => {
  const Auth = (props: any): any => {
    const store = useStore();
    const router = useRouter();
    const [data, setData] = useState(false);
    console.log(store.accessToken);
    useEffect(() => {
      if (store.accessToken) {
        setData(true);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.replace("/auth/login");
      }
    }, []);
    // eslint-disable-next-line react/react-in-jsx-scope
    return data ? <Component {...props} /> : null;
  };

  return Auth;
};

export default Protected;
