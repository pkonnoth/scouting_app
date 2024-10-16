// next.config.mjs
export default {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/setup', // Redirect root to setup page
        permanent: true,
      },
    ];
  },
};
