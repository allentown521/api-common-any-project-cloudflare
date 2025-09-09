// books.ts
/// <reference lib="WebWorker" />

import { Hono } from "hono";
import { cors } from "hono/cors";
import { createApi } from "unsplash-js";

const app = new Hono();
interface OSContent {
  enablePurchase: boolean; // 是否开启强制购买
  enableMellowtel: boolean; // 是否开启强制 mellowtel
}

let result: OSContent;

result = {
  enablePurchase: true,
  enableMellowtel: true,
};

// 使用 Hono 的 cors 中间件处理跨域
app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

app.get("/", (c) => {
  return c.json(result, 200, {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  });
});

const useMixcmUnsplash = true;
const mixcmUnsplashEndpoint = "https://roam.mixcm.com/api/wall";
const unsplash = createApi({
  accessKey: "t5-yyetI8f4n06uHaAm7jXyUK4lB0HFHMQHCOQ_0_8s",
});
app.get("/unsplash", async (c) => {
  const type = c.req.query("type") || "fashion";

  try {
    if (useMixcmUnsplash) {
      const url = `${mixcmUnsplashEndpoint}?type=${type}`;
      const response = await fetch(url, {
        method: "GET",
        redirect: "manual", // 不自动跟随重定向
      });

      if (response.status === 302 || response.status === 301) {
        const redirectUrl = response.headers.get("location");
        if (redirectUrl) {
          return c.json({ url: redirectUrl }, 200, {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          });
        }
      }
    } else {
      const result = await unsplash.photos.getRandom({
        query: `${type} wallpapers`,
        count: 1,
        orientation: "landscape",
      });
      if (result.response) {
        const photo = result.response;
        
        unsplash.photos.trackDownload({
          downloadLocation: photo.links.download_location,
        });

        return c.json({ url: photo.urls.full }, 200, {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        });
      }
    }

    // 如果没有重定向或获取不到重定向地址，返回错误
    return c.json({ error: "Failed to get image URL" }, 500);
  } catch (error) {
    return c.json(
      { error: "Failed to fetch image", details: error.message },
      500
    );
  }
});

export default app;
