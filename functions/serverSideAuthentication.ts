import { authUser } from "../functions/auth";

export function serverSideAuthentication(
  allowedRoles: any,
  destination: string = "/auth/login",
  callback: any = null
) {
  return async (ctx: any) => {
    const user = authUser(ctx.req);

    if (user && allowedRoles.includes(user.role)) {
      let extraValues: any = {};
      if (callback) {
        extraValues = await callback(ctx);
      }

      return {
        props: {
          user,
          ...extraValues,
        },
      };
    } else {
      return {
        redirect: {
          destination,
          permanent: false,
        },
      };
    }
  };
}
