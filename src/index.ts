// index.ts
import { Hono } from 'hono'
import dfTube from './df-tube'
import health from './health'

const app = new Hono()

// 😃
app.route('/df-tube', dfTube)
app.route('/health', health)

export default app