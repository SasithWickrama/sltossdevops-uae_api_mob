const controller = require ("./webTask.controllers");
const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validate");

router.get("/get", checkToken, controller.getAllTasks);
router.get("/getbyuid", checkToken, controller.getTaskById);
router.post("/create", checkToken, controller.createTask);
router.post("/assign", checkToken, controller.assignTaskToRole);
router.post("/remove", checkToken, controller.removeTaskFromRole);
router.get("/assign", checkToken, controller.getTaskFromRole);
router.post("/edit", checkToken, controller.updateUser);
router.post("/delete", checkToken, controller.deleteUser);

module.exports = router;