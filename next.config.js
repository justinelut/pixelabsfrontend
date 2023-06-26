/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  },

  i18n: {
    locales: ['en-US','en-GB','fr-FR','ja-JP','ko-KR','es-ES','en-KE'],
    defaultLocale: 'en-US',
  },

  images: {
    domains: [
      "localhost",
      "pixelabs.verixr.com",
      "justinedev.verixr.com",
      "admin.verixr.com",
      "api.verixr.com",
      "verixr.com",
      "via.placeholder.com",
      "images.unsplash.com",
      "server.verixr.com",
      'avatars.githubusercontent.com', 
      'avatar.vercel.sh'
    ],
    // deviceSizes: sizes,
  },

}

module.exports = nextConfig
