# AC Wildlife

Track your progress in Animal Crossing: New Horizons! Designed for everyone from casual islanders to completionists.
Get all the info you need on fish, bugs, sea creatures, fossils, works of art, music, reactions, villagers, achievements and more!

# Tech used

## Back end

- TypeScript
- Node
- Express
- MongoDB (Atlas)
- Hosted with Heroku (for now)

## Front end

- TypeScript
- React
- Redux
- PrimeReact UI Library
- Chart.js
- Luxon DateTime
- Sass

## Branch Structure

- `master`: usually the most recent prod deployment
- `dev`: latest code, may not be 100% functional
- `release-vx.x.x`: code for that particular release

## Screenshots

![image](https://user-images.githubusercontent.com/42755431/148669097-87499066-7a0d-44fe-9e7d-462d4f2f9cee.png)

![image](https://user-images.githubusercontent.com/42755431/148669074-e1818a96-5c13-461f-b0b9-6a3e11268e22.png)

![image](https://user-images.githubusercontent.com/42755431/148669093-b383530a-9b1f-4957-9a84-287e24b89b9d.png)

## Instructions

The Auth0 authentication requires that, unless using Chrome, the server be proxied through `https`
For a quick explanation, see: https://github.com/auth0/express-openid-connect/issues/145#issuecomment-722393751

### If running the webapp in Chrome:

You may follow the steps below to use https with the server, or change `index.js` to run the standard `app.listen(8000)` which will run on `http`

### If running the webapp in another browser:

Follow these instructions to setup keys (super fast, 2 steps): https://timonweb.com/javascript/running-expressjs-server-over-https/
Store both generated files in the root project directory so that the `fs` in `index.js` can read them
Run the server as normal, it will run on `https`
