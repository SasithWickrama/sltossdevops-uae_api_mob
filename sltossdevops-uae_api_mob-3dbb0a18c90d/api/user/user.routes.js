const controller = require ("./user.controllers");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validate");

router.post("/create",controller.createUser);
router.post("/login",controller.login);
router.post("/changepasswd",controller.changePasswd);



module.exports = router;