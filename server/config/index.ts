/**
 * Config file
 * @author Anurag Garg <garganurag893@gmail.com>
 */

export default {
    db: process.env.DB,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    allowedOrigins: ['http://localhost:3000', 'http://localhost:4020']
};
