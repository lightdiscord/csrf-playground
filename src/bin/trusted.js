import Koa from "koa";
import ejs from "koa-ejs";
import bodyparser from "koa-bodyparser";

import { resolve } from "path";

import { register as registerAuth } from "../modules/auth.js";
import { register as registerMessages } from "../modules/messages.js";

const app = new Koa();
const port = 8800;

app.use(bodyparser());

ejs(app, {
  root: resolve(__dirname, "..", "views"),
  layout: "trusted-layout"
});

registerAuth(app);
registerMessages(app);

app.listen(port);

console.log(`Trusted listening on http://localhost:${port}`);

