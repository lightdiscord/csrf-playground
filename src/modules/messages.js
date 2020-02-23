import router from "koa-route";

import { needAuth } from "./auth.js";

const messages = [];

async function index(context) {
  await context.render("messages");
}

function create(context) {
  const { message } = context.request.body;

  if (!message) {
    context.throw(400, "No message found");
  }

  context.state.messages.push({ message, author: context.state.username });
  context.body = "Message pushed!";
}

function multiple(app, method, route, middlewares) {
  for (const middleware of middlewares) {
    app.use(method(route, middleware));
  }
}

function store(context, next) {
  context.state.messages = messages;
  return next();
}

export function register(app) {
  multiple(app, router.get, "/", [store, index]);

  multiple(app, router.post, "/api/messages/unprotected", [needAuth, store, create]);
}

