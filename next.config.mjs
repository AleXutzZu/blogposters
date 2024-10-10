/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"],
    },
    transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
