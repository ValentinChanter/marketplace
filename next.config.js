/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SECRET_COOKIE_PASSWORD: "E9Rd++8yZG~>a>jtM*U!)NTtP>@}XANB",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "3000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
