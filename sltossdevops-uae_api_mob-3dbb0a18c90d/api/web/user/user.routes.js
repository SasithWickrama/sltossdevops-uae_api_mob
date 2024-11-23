const controller = require ("./user.controllers");
const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validate");

router.get("/getall", checkToken, controller.getAll);
router.get("/get", checkToken, controller.get);
router.get("/getbyuid", checkToken, controller.getUserById);
router.post("/changepw", checkToken, controller.passwdChangeUser);
router.post("/create", checkToken, controller.createUser);
router.post("/edit", checkToken, controller.updateUser);
router.post("/delete", checkToken, controller.deleteUser);

module.exports = router;