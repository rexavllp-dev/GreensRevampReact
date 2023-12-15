/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

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
    i18n,
}

module.exports = nextConfig
