/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/', // Match the root URL
          destination: '/onboarding', // Redirect to the onboarding page
          permanent: true, // This is a permanent redirect (301)
        },
      ];
    },
  };
  
  export default nextConfig;
  