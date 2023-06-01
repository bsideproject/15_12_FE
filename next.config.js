/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	async rewrites() {
		return [
			{
				source: '/ws/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_PROXY_URL}/ws/:path*`,
			},
		];
	},
};

module.exports = withSentryConfig(
	nextConfig,
	{
		silent: true,
		org: '15-12-fe-0v',
		project: 'sadang-nextjs',
	},
	{
		widenClientFileUpload: true,
		transpileClientSDK: true,
		tunnelRoute: '/monitoring',
		hideSourceMaps: true,
		disableLogger: true,
	},
);
