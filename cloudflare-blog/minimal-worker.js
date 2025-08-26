// 极简版Cloudflare Worker脚本

addEventListener('fetch', event => {
  event.respondWith(new Response('Hello from Cloudflare Worker!', {
    headers: { 'content-type': 'text/plain' }
  }));
});