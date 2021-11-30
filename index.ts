import "reflect-metadata";
import {container} from "tsyringe";
import * as restify from "restify";
import * as dotenv from "dotenv";
import {AppController} from "./src/AppController/AppController";

dotenv.config();

const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

const controller = container.resolve(AppController);

server.get("/categories", controller.search.bind(controller));

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
