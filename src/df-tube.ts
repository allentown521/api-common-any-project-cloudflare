// books.ts
import { Hono } from 'hono'

const app = new Hono()
interface OSContent {
  enable: boolean; // 是否开启强制购买
}

  let result: OSContent;

  result = {
    enable: false,
  };

app.get('/', (c) => {
  return c.json(result, 200, {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  })
})

export default app