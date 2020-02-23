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

  messages.push({ message, author: context.state.username });
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

  multiple(app, router.get, "/api/messages/unprotected", [needAuth, create]);
}

