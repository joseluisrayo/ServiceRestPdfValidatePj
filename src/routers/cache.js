import ExpressExpeditious from "express-expeditious";
import expeditiousEngineRedis from "expeditious-engine-redis";
import config from "./../config.js";

const defaultOptions = ({
    namespace: 'expresscachevalidatepdf',
    defaultTtl: '1 hour',
    engine: expeditiousEngineRedis({
        host: config.redis_host,
        port: config.redis_port
    })
})

const cacheInit = ExpressExpeditious(defaultOptions);
export default cacheInit;