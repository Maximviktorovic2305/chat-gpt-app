import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'github.com',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '4568',
			},
			{
				protocol: 'http',
				hostname: '212.193.56.213',
				port: '4568',
			},
			{
				protocol: 'https',
				hostname: '212.193.56.213',
				port: '4568',
			},
			{
				protocol: 'https',
				hostname: 'aicontact.tech',
			},
			{
				protocol: 'http',
				hostname: 'aicontact.tech',
			},
		],
	},
	distDir: 'dist',
}

export default nextConfig
