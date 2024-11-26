/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/welcome',
				permanent: true
			}
		]
	},
	env: {
		apiUrl: process.env.SERVER_HOST
	}
}

module.exports = nextConfig
