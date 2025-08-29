// books.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('ok'))

export default app