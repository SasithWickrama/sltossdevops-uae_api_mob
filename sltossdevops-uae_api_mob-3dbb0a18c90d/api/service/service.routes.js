const controller = require ("./service.controllers");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validate");

router.post("/getService",checkToken,controller.getService);
router.post("/updateAppoint", checkToken, controller.updateAppoint);
router.post("/getBooked", checkToken, controller.getBooked);




module.exports = router;