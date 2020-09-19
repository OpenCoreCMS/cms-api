# OPP BFF

**BFF** stands for **_Backend For Frontend_**.

**BFF** provides the data to **OPP UI application**, abstracting the data fetching
and business logic away from the user interface concerns.

By providing stable data structures the UI development can be more
streamlined and more focused while the data is maintained in a consistent way.

**This application requires Node 14.**


## Quick start

1. Clone the repo
```
git clone https://github.com/OpenPublishingPlatform/opp-bff-demo.git
cd opp-bff-demo
```

2. Install devDependencies
```
npm install
```

3. Seed the initial data to MongoDB
```
npm run data:seed
```

4. Start the app
```
npm run dev
```

**OPP BFF** application will start on [`localhost:4000`](http://localhost:4000).


## Configuration

Application config is controlled with the following environment variables:

- `PORT` _(default: 4000)_
- `MONGO_URL` _(default: mongodb://localhost:27017)_
- `MONGO_DBNAME` _(default: opp-bff-main)_
- `BYPASS_AUTH` _(default: false)_
- `BYPASS_CACHE` _(default: false)_
