const controller = require ("./webService.controllers");
const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validate");

router.get("/count",checkToken, controller.getAppointmentCount);
router.get("/category",checkToken, controller.getAppointmentCountByService);
router.get("/category/get",checkToken, controller.getAppointmentByService);
router.get("/get",checkToken, controller.getAppointments);
router.get("/get-all",checkToken, controller.getAppointmentsAll);
router.get("/get-pending",checkToken, controller.getAppointmentsPending);
router.get("/get-complete",checkToken, controller.getAppointmentsComplete);
router.post("/complete-appointmet",checkToken, controller.updateCompleteAppoinment);
router.post("/block-appointmet",checkToken, controller.createBlockAppoinmentTime);
router.post("/get-block-appointmet",checkToken, controller.getBlockAppoinmentTime);
router.post("/unblock-appointmet",checkToken, controller.UnblockAppoinmentTime);

module.exports = router;