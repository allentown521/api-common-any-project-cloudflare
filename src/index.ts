// index.ts
import { Hono } from 'hono'
import dfTube from './df-tube'
import health from './health'
import marinara from './marinara'

const app = new Hono()

// 😃
app.route('/df-tube', dfTube)
app.route('/health', health)
app.route('/marinara', marinara)

export default app