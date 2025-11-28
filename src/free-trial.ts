// books.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { ContentfulStatusCode } from 'hono/utils/http-status';

const app = new Hono()


// 使用 Hono 的 cors 中间件处理跨域
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

app.get('/', async (c) => {
  const email = c.req.query('email');
  const url = 'https://plunk.focusapps.app/api/v1/contacts';
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', Authorization: 'Bearer sk_cfb50b5567f767c6238541da254c94030a621fca404a2ca8'},
  body: JSON.stringify({
    email: email,
    subscribed: true,
    data: {}
  })
};

let response
let data
let _error
try {
   response = await fetch(url, options);
   data = await response.json();
  console.log(data);
} catch (error) {
  _error = error
  console.error(error);
}
  return c.json(data ?? _error, response?.status as ContentfulStatusCode || 500, {
    "Content-Type": "application/json",
  })
})

export default app