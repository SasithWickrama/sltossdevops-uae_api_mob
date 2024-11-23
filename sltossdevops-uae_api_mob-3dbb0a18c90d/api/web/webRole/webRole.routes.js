const controller = require ("./webRole.controllers");
const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validate");


router.post("/create", checkToken, controller.createRole);
router.get("/get/:id",checkToken, controller.getRole);
router.get("/get",checkToken, controller.getRoles);
router.get("/getbyuid", checkToken, controller.getRoleById);
router.post("/edit", checkToken, controller.updateRole);
router.post("/delete", checkToken, controller.deleteRole);

module.exports = router;