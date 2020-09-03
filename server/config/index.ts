/**
 * Config file
 * @author László Tófalvi <tofalvi.laszlo@gmail.com>
 */

export default {
    db: process.env.DB,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    allowedOrigins: ['http://localhost:3000', 'http://localhost:4020']
};
