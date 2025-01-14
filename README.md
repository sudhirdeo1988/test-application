## Step-by-step guide to get started

### App created with below config
    `node 18.18.0`
    `React 19.0.0"`

1. Project setup
   
  `npm install` To install all dependencies

   `npm start` To start project

---

2. Extensions for **Visual Studio Code (VSCode)** IDE
   - EditorConfig for VS Code by _EditorConfig_
   - Prettier - Code formatter by _Prettier_
   - Eslint by Dirk Baeumer

---

3. Extensions for debugging in Browser (Good to Have)
   - React Dev Tools by _Facebook_
   - Redux Dev Tools by _remotedevio_

---

4. Branching strategies to follow
   - [Branching Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
   - Branch naming conventions
     - Create a feature/bugfix/release (Forked from **develop**)
       - typeOfBranch/JIRA-TICKET_nameOfYourBranch
         `feature/SGD-213_testBranch`
         `bugfix/SGD-432_alignmentIssue`
       - For Release branch, write release number
         `release/1.0.0`
     - Create a hotfix (forked from **master**)
       - `hotfix/TC-123_NavigationLinkBroken`

---

5. Coding Practices
   - All New React components must be written using [hooks](https://reactjs.org/docs/hooks-intro.html) APIs
   - For SCSS/CSS
     - Give the component name to your .scss/.css file

---

6. Refer scripts in package.json
   - By default start scripts points to staging backend. All the development stuff which affects the back-end(CRUD operations) should be done only on staging points or local backend.
   - ![Scripts](src/assets/images/readme/scripts.png)

---

### User with their roles (use below credentials to login)


**Super Admin**   

User Name: **superadmin**

password: **superadmin@123**


**Admin**

User Name: **admin**

password: **admin@123**


**User**

User Name: **user**

password: **user@123**


#### All user mentioned in file

**Utilities/user.js**

---

## NOTE: If any of the script doesn't work, follow below steps.

1. Check all the scripts are created in the root directory. Follow the environment file doc (Step 2)
2. Delete **node_modules** folder and **package-lock.json**
3. Open root directory in the terminal and hit `npm install`
4. Try `npm start`

---

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
