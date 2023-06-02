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
const wsProxy = createProxyMiddleware('/ws', {
	target: `http://twelfth.ap-northeast-2.elasticbeanstalk.com/`, // 웹소켓 연결을 프록시할 대상 주소
	ws: true, // 웹소켓 프록시를 사용하도록 설정
	changeOrigin: true, // 원본 주소를 대상 주소로 변경하여 프록시
	onProxyRes: (proxyRes) => {
		proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
	},
	onProxyReq: (proxyReq) => {
		proxyReq.setHeader('Origin', 'https://15-12-fe.netlify.app/');
		proxyReq.setHeader('Referer', 'https://15-12-fe.netlify.app/');
		proxyReq.setHeader('Host', 'twelfth.ap-northeast-2.elasticbeanstalk.com');
		proxyReq.setHeader('Cookie', ''); // 필요에 따라 쿠키를 설정해야 할 수 있습니다.
	},
});

app.prepare().then(() => {
	const server = createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname } = parsedUrl;

		if (pathname.startsWith('/ws')) {
			// 웹소켓 요청인 경우 프록시로 처리
			wsProxy(req, res);
		} else {
			// 일반 HTTP 요청인 경우 Next.js 핸들러로 라우팅
			handle(req, res, parsedUrl);
		}
	});

	server.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
