import router from "koa-route";

async function help(context) {
  await context.render("login");
}

function login(context) {
  const { username } = context.request.body;
  const trimed = (username || "").trim();

  if (!trimed) {
    context.throw(400, "No username found");
  }

  context.cookies.set("username", trimed);
  context.redirect("/");
}

function auth(context, next) {
  const cookie = context.cookies.get("username");

  if (cookie) {
    context.state.username = cookie;
    context.state.loggedIn = true;
  }

  return next();
}

export function needAuth(context, next) {
  if (!context.state.loggedIn) {
    return context.throw(401);
  }

  return next();
}

export function register(app) {
  app.use(auth);

  app.use(router.get("/auth/login", help));
  app.use(router.post("/auth/login", login));
}
