# Open Core CMS API

**Open Core CMS API** provides data to the UI app.
It abstracts the data fetching and business logic away from the user interface.

UI application can be more streamlined and focused by having **OCC API**
providing stable data structures in a clean, consistent manner.

For an example UI implementation see
[**Open Core CMS UI** demo repo](https://github.com/OpenCoreCMS/cms-ui-demo).


## Quick start

```
# 1. Clone the repo
git clone https://github.com/OpenCoreCMS/cms-api.git
cd cms-api

# 2. Install dependencies
npm install

# 3. Seed the initial data to MongoDB
npm run data:seed

# 4. Start the app
npm run dev
```

**OCC API** application will start on [localhost:4000](http://localhost:4000).


## Configuration
Application config is controlled with the following environment variables:

- `PORT` _(default: 4000)_
- `MONGO_URL` _(default: mongodb://localhost:27017)_
- `MONGO_DBNAME` _(default: opencorecms-api-main)_
- `BYPASS_AUTH` _(default: false)_
- `BYPASS_CACHE` _(default: false)_
