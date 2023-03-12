/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import SubmitButtonWithLoader from "../../components/common/SubmitButtonWithLoader";
import { getData } from "../../hooks/getData";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";

const defaultUser = {
  id: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "normal",
};
const update = () => {
  const router = useRouter();
  const api = useAxios();
  const {
    query: { id },
  } = router;

  const { data, refetch } = getData("user/getOne/", { id });

  const [userInfo, setUserInfo] = useState(defaultUser);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setUserInfo({ ...data?.data });
    return () => {};
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await usePost(api, "user/update", userInfo);
    if (res) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    }
    setLoading(false);
  };
  return (
    <div className=" mt-8">
      <div className="md:w-1/2 mx-auto">
        <div className="text-center my-3">
          <h1>Update a New User.</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <InputField
            name="name"
            label="Enter name"
            required={true}
            type="text"
            value={userInfo.name}
            placeHolder="Jhon"
            onChange={(e: any) =>
              setUserInfo({ ...userInfo, name: e.target.value })
            }
          />
          <InputField
            name="email"
            label="Enter Email"
            required={true}
            type="email"
            value={userInfo.email}
            placeHolder="example@gmail.com"
            onChange={(e: any) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <InputField
            name="phone"
            label="Enter Phone"
            required={true}
            type="text"
            value={userInfo.phone}
            placeHolder="015*****01"
            onChange={(e: any) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
          />
          <InputField
            name="password"
            label="Enter Password"
            required={true}
            type="password"
            value={userInfo.password}
            placeHolder="******"
            onChange={(e: any) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />

          <div className="my-2 py-2">
            <SubmitButtonWithLoader loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default update;
