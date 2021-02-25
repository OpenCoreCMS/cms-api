const appPortRaw = process.env.PORT;
const appPortParsed = Number(appPortRaw);

// eslint-disable-next-line eqeqeq
const appPort = (appPortRaw == appPortParsed) ? appPortParsed : 4000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const mongoDbName = process.env.MONGO_DBNAME || 'opencorecms-api-main';
const bypassAuth = process.env.BYPASS_AUTH === 'true';
const bypassCache = process.env.BYPASS_CACHE === 'true';

// bind default debug value
const defaultDebugValue = 'opencorecms:api:* -opencorecms:api:trace:*';
const currentDebugValue = process.env.DEBUG;

if (typeof currentDebugValue !== 'string' || !currentDebugValue.length) {
  console.log(`> OpenCoreCMS:API:Init: Setting default debug level to ${defaultDebugValue}`);
  process.env.DEBUG = defaultDebugValue;
}

const config = {
  appPort,
  mongoUrl,
  mongoDbName,
  bypassAuth,
  bypassCache,
};

module.exports = config;
