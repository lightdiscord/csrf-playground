import Koa from "koa";

const app = new Koa();
const port = 8842;
const trustedPort = 8800;

app.use(ctx => {
  ctx.body = "H3770 w0r1d!";
});

app.listen(port);

console.log(`Attacker listening on http://localhost:${port}`)
console.log(`Attacker configured to attack http://localhost:${trustedPort}`);
