import request from "@/util/request.ts";

type userLogin = {
  username: string;
  password: string;
};
//
const userApi = {
  login: (param: userLogin) =>
    request.post("/login", param).then((res:any) => res.data),
};

export default userApi;
