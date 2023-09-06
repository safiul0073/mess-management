import type { CredentialType, LoginResponseType } from "../../types/AuthTypes";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponseType, Partial<CredentialType>>({
            query: ({ ...body }) => ({
                url: `/auth/login`,
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
