import Koa from "koa";

const app = new Koa();
const port = 8800;

app.use(ctx => {
  ctx.body = "Hello world!";
});

app.listen(port);

console.log(`Trusted listening on http://localhost:${port}`);

