/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost', 
            '127.0.0.1', 
            'res.cloudinary.com',
        ],
    }, 
    webpack: (config) => {
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
            canvas: "commonjs canvas",
        });
        // config.infrastructureLogging = { debug: /PackFileCache/ };
        return config;
    },
};

export default nextConfig;







// /** @type {import('next').NextConfig} */

// module.exports = {
//     images: {
//         domains: [
//             'localhost', 
//             '127.0.0.1', 
//             'res.cloudinary.com',
//         ],
//     }, 
//     webpack: (config) => {
//         config.externals.push({
//             "utf-8-validate": "commonjs utf-8-validate",
//             bufferutil: "commonjs bufferutil",
//             canvas: "commonjs canvas",
//         });
//         // config.infrastructureLogging = { debug: /PackFileCache/ };
//         return config;
//     },
// };








// /** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config');

// const nextConfig = {
//     i18n
// };

// export default nextConfig;
