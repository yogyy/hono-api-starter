import { Hono } from 'hono';

const app = new Hono();

app.get('/', c => {
  return c.newResponse('test');
});


export default app