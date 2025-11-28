// index.ts
import { Hono } from 'hono'
import dfTube from './df-tube'
import freeTrial from './free-trial'
import health from './health'
import marinara from './marinara'

interface Env {
  PLUNK_KEY: string;
}

const app = new Hono<{ Bindings: Env }>()

// 😃
app.route('/df-tube', dfTube)
app.route('/free-trial', freeTrial)
app.route('/health', health)
app.route('/marinara', marinara)

export default app