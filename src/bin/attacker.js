import Koa from "koa";
import ejs from "koa-ejs";

import { resolve } from "path";

const app = new Koa();
const port = 8842;
const trustedPort = 8800;

ejs(app, {
  root: resolve(__dirname, "..", "views"),
  layout: "attacker-layout"
});

app.use(async (context) => {
  context.state.victim = `http://localhost:${trustedPort}/api/messages`;

  await context.render("forms");
});

app.listen(port);

console.log(`Attacker listening on http://localhost:${port}`)
console.log(`Attacker configured to attack http://localhost:${trustedPort}`);
