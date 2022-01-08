# ⌨ FLYING FINGERS

**Flying Fingers** is a typing performance assessment app created with _React.js_. It uses pure stateless functional components with React hooks and context. The app collects ample input data and computes detailed performance metrics, which are presented to the user at the end of the test.

![](https://github.com/dandybytes/flying-fingers/blob/master/docs/flyingfingers.png)

## 👾 Technology

|                        tool                         | description                                 |
| :-------------------------------------------------: | ------------------------------------------- |
| [React](http://facebook.github.io/react/index.html) | front-end JavaScript-based library          |
|            [Babel](https://babeljs.io/)             | ECMAScript transpiler                       |
|         [Webpack](https://webpack.js.org/)          | task management and module bundling toolkit |
|         [Netlify](https://www.netlify.com/)         | cloud hosting solution                      |

## 🔐 Prerequisites

- node
- npm
- yarn (optional)
- netlify-cli (optional)
```sh
npm install netlify-cli -g
```

## 🛠 Installation

```bash
# Clone this repository
$ git clone https://github.com/dandybytes/flying-fingers.git

# Navigate into the repository
$ cd flying-fingers

# Install the required dependencies
$ yarn || npm i

# Start the local development server
$ yarn start || npm start
```

## 🚀 Production:
This project is already set up for easy deployment with Netlify:
```sh
# using Yarn
yarn run deploy

# using NPM
npm run deploy
```
To deploy it on a sub-path on another site, fill out the expected relative path in the `PUBLIC_URL` variable in a `.env.production.local` file (example provided in `.env.production.local.sample`).

## 🎓 Features:

-   listens to typed user input
-   reacts to mistakes with visual and auditive cues
-   marks correctly typed and erroneously entered characters
-   scrolls text box to display the text to be typed
-   shows count-down timer
-   displays suggestions on how to place fingers on the keyboard to type the next character
-   allows the user to pause the test without affecting the performance statistics
-   collects ample data while the user types and computes detailed performance metrics at the end of the test
