const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  development: {
    baseApi: "/",
    mockApi: "https://www.fastmock.site/mock/75e17d4c8a0e28d7f58072c005b1dbf5/api",
  },
  test: {
    baseApi: "",
    mockApi: "https://www.fastmock.site/mock/75e17d4c8a0e28d7f58072c005b1dbf5/api",
  },
  prod: {
    baseApi: "",
    mockApi: "https://www.fastmock.site/mock/75e17d4c8a0e28d7f58072c005b1dbf5/api",
  },
};
export default {
  env,
  mock: true,
  namespace:'manager',
  ...EnvConfig[env]
}
