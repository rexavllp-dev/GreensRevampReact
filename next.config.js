/** @type {import('next').NextConfig} */

const nextConfig = {
    trailingSlash: true,
    output: 'export',
    images: {
        domains: ["s3-alpha-sig.figma.com"],
        unoptimized: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig