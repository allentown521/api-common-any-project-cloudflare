// books.ts
import { Hono } from 'hono'

const app = new Hono()
interface OSContent {
  enablePurchase: boolean; // 是否开启强制购买
  enableMellowtel: boolean; // 是否开启强制 mellowtel
}

  let result: OSContent;

  result = {
    enablePurchase: false,
    enableMellowtel: false
  };

app.get('/', (c) => {
  return c.json(result, 200, {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  })
})

export default app