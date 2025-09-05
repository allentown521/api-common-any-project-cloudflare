// books.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
interface OSContent {
  enablePurchase: boolean; // 是否开启强制购买
  enableMellowtel: boolean; // 是否开启强制 mellowtel
}

  let result: OSContent;

  result = {
    enablePurchase: true,
    enableMellowtel: false
  };

// 使用 Hono 的 cors 中间件处理跨域
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

app.get('/', (c) => {
  return c.json(result, 200, {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400, s-maxage=86400"
  })
})

export default app