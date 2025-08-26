import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug. 2. we will return an error message on exception in your
 *    code instead of the default 404.html page.
 */
const DEBUG = false;

// 古诗文API调用函数
async function getRandomPoem() {
  try {
    // 调用古诗文API获取随机诗句
    const response = await fetch('https://api.apiopen.top/api/sentences', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    // 确保返回的数据格式正确
    if (data && data.code === 200 && data.result) {
      return data.result.content;
    } else {
      // 如果API调用失败，返回默认诗句
      return '天生我材必有用，千金散尽还复来。';
    }
  } catch (error) {
    // 异常情况下返回备用诗句
    console.error('获取古诗文失败:', error);
    return '长风破浪会有时，直挂云帆济沧海。';
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  const url = new URL(event.request.url);
  let pathname = url.pathname;

  // If path ends with /, append index.html
  if (pathname.endsWith('/')) {
    pathname = pathname + 'index.html';
  }

  // If path doesn't have a file extension, append .html
  if (!pathname.includes('.')) {
    pathname = pathname + '.html';
  }

  try {
    const options = {};
    
    // Get asset from Cloudflare KV
    const page = await getAssetFromKV(event, {
      mapRequestToAsset: req => {
        // This is a bit of a hack, but it allows us to serve static assets
        // from the same origin as the Worker script
        const reqUrl = new URL(req.url);
        reqUrl.pathname = pathname;
        return new Request(reqUrl.toString(), req);
      },
      ...options,
    });

    // 只对index.html页面进行古诗文注入
    if (pathname.endsWith('index.html')) {
      // 获取页面内容
      let content = await page.text();
      
      // 获取随机古诗文
      const poem = await getRandomPoem();
      
      // 替换标题部分的内容
      content = content.replace('<h1>个人博客</h1>', `<h1>${poem}</h1>`);
      
      // 创建新的响应
      const response = new Response(content, page);
      response.headers.set('X-Content-Type-Options', 'nosniff');
      
      return response;
    } else {
      // 其他页面保持原样
      const response = new Response(page.body, page);
      response.headers.set('X-Content-Type-Options', 'nosniff');
      
      return response;
    }
  } catch (e) {
    // If an error is thrown try to serve the error.html page
    if (DEBUG) {
      return new Response(e.message || e.toString(), {
        status: 500,
      });
    }

    try {
      const notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => new URL('/404.html', req.url),
      });
      
      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 404,
      });
    } catch (e) {
      return new Response(
        'Not found',
        { status: 404, statusText: 'Not found' }
      );
    }
  }
}