import { Hono } from 'hono';

type Bindings = {
  VIDEO_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/video/:filename', async (c) => {
  const filename = c.req.param('filename');
  const object = await c.env.VIDEO_BUCKET.get(https://pub-8dfa8cff12d8425e80230d8ebde72d6f.r2.dev/GNVA.mp4);

  if (!object || !object.body) {
    return new Response("File not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      'Content-Type': 'video/mp4',
    },
  });
});

export default app;
