require ("dotenv").config();

const express = require("express");
const app =express();
const cors=require('cors');
const userRoute = require("./api/user/user.routes");
const serviceRoute = require("./api/service/service.routes");
const webUserRoute = require("./api/web/webUser/webUser.routes");
const webRoleRoute = require("./api/web/webRole/webRole.routes");
const webServiceRoute = require("./api/web/webService/webService.routes");
const webMobUserRoute = require("./api/web/user/user.routes");
const webTaskRoute = require("./api/web/webTask/webTask.routes");

app.use(express.json());
app.use(cors())
app.use(process.env.API_USER, userRoute);
app.use(process.env.API_SERVICE, serviceRoute);
app.use(process.env.API_WEB_WEBUSER, webUserRoute);
app.use(process.env.API_WEB_WEBROLE, webRoleRoute);
app.use(process.env.API_WEB_WEBSERVICE, webServiceRoute);
app.use(process.env.API_WEB_WEBMOBUSER, webMobUserRoute);
app.use(process.env.API_WEB_WEBTASK, webTaskRoute);

app.listen(process.env.APP_PORT, ()=>{
    console.log("server up and run");
});