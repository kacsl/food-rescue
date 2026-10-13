import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // valere-DS ships TypeScript source, so Next must compile it.
  transpilePackages: ["valere-DS"],
  outputFileTracingRoot: import.meta.dirname,
  webpack: (config) => {
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [/^(.+?[\\/]node_modules[\\/](?!valere-DS))/],
    };
    return config;
  },
};

// The dev/build scripts pass `--webpack`. Turbopack resolves the PostCSS config
// nearest to each CSS file, which picks up valere-DS's own gallery config and
// its Tailwind devDependency. Webpack only reads this project's root config.
export default nextConfig;
