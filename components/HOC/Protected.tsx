import { useStore } from "../../store";

const Protected = (Component: any): any => {
  const Auth = (props: any): any => {
    const store = useStore();
    if (store.accessToken !== null) {
      return Component;
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
        return null;
      }
    }
  };
  return Auth;
};

export default Protected;
