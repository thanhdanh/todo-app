export const port = process.env.PORT || 3009;
export const isProduction: boolean = process.env.NODE_ENV === 'production';
export const mongo = {
    user: encodeURIComponent(process.env.MONGO_USER),
    password: encodeURIComponent(process.env.MONGO_PASS),
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    dbName: "example",
}

