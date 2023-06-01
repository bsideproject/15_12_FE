// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createServer } = require('http');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require('url');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 웹소켓 프록시 설정
const wsProxy = createProxyMiddleware('/ws/:path*', {
	target: `http://twelfth.ap-northeast-2.elasticbeanstalk.com/ws/:path*`,
	ws: true,
	changeOrigin: true,
});

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname } = parsedUrl;

		if (pathname.startsWith('/ws/:path*')) {
			wsProxy(req, res);
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
