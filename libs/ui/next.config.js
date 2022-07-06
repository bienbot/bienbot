// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
};

module.exports = withNx(nextConfig);
module.exports = {
    images: {
        domains: ["www.data.lkarasinski.pl", "cdn.discordapp.com"],
    },
    env: {
        SUPABASE_KEY: process.env.SUPABASE_KEY,
        SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE,
    },
};
