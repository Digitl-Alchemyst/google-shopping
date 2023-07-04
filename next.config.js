/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['localhost', 'links.papareact.com'],
},
};

module.exports = nextConfig
