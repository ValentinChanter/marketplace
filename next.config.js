/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SECRET_COOKIE_PASSWORD: "E9Rd++8yZG~>a>jtM*U!)NTtP>@}XANB",
  },
  images: {
    remotePatterns: [
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
