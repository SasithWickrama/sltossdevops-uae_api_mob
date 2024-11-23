const controller = require ("./webUser.controllers");
const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validate");

router.post("/login",controller.login);
router.post("/signout",checkToken,controller.signout);
router.post("/create",checkToken,controller.createUser);
router.get("/get",checkToken,controller.getUsers);
router.get("/get/:id",checkToken,controller.getUser);
router.get("/getbyuid", checkToken, controller.getUserById);
router.post("/changepasswd",checkToken,controller.changePasswd);
router.post("/edit",checkToken,controller.updateUser);
router.post("/delete",checkToken,controller.deleteUser);


module.exports = router;