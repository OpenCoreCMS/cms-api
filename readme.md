# OPP BFF

**BFF** stands for **_Backend For Frontend_**.

**BFF** provides the data to **OPP UI application**, abstracting the data fetching
and business logic away from the user interface concerns.

By providing stable data structures the UI development can be more
streamlined and more focused while the data is maintained in a consistent way.


## Getting started
Clone the repo and start the app with `npm run dev`.

The application will start on [`localhost:4000`](http://localhost:4000).

Requires Node 14.


## Configuration
Application config is controlled via env vars.

- `PORT` _(default: 4000)_
- `MONGO_URL` _(default: mongodb://localhost:27017)_
- `MONGO_DBNAME` _(default: opp-bff-main)_
- `BYPASS_AUTH` _(default: false)_
- `BYPASS_CACHE` _(default: false)_
