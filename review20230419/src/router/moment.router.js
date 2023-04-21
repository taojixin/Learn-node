const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../moddleware/login.middleware");
const {
  create,
  list,
  detail,
  update,
} = require("../controller.js/moment.controller");
const {
  verifyMomentPermission,
} = require("../moddleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
momentRouter.patch("/:momentId", verifyAuth, verifyMomentPermission, update);

module.exports = momentRouter;
