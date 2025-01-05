import request from "@/util/request.ts";

type login = {
  username: string;
  password: string;
};

type register = {
  username: string;
  password: string;
};

//
const userApi = {
  login: (param: login) =>
    request.post("/login", param).then((res) => res.data),
  getCurrentUser: () => request.get("/user").then((res) => res.data),
  register: (param: register) =>
    request.post("/user", param).then((res) => res.data),
};

export default userApi;
