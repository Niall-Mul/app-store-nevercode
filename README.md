# DPF
Vodafone Group Mono Repo structure

Prerequisites:
```
brew install node
brew install watchman
npm install -g gulp
npm install -g yarn
npm install -g lerna
```

To start git clone the repo and perform following steps;
```
git clone https://github.vodafone.com/TSS-Digital/DPF.git
cd DPF
git checkout develop
yarn reset
```
Note: if you're adding new libraries, always use yarn reset in /DPF to get yarn workspaces to rebuild the libraries across the mono-repo
Now open 2 shell tabs:

## React Native
Note that Watchman is a pre-requisite. You can install watchman with; brew update && brew install watchman
```
cd ../DPF/app-hello-world
yarn startFresh
or yarn start (faster but does not clear your React Native postman and Expo caches)
```
For Jest Tests:
```
yarn test
```

## React JS

Build the Semantic UI CSS:
```
cd ../DPF
cp core-web-css/tasks-override/* core-web-css/tasks
cd ../DPF/web/hello-world
yarn build-semantic (or yarn watch-semantic if you want to make CSS changes)
```

Run the ReactJS Node server:
```
cd ../DPF/web/hello-world
yarn start
```

For Jest Tests:
```
yarn test
```

For Flow:
```
yarn flow
```

# Running Flow for Static Type Checking
Flow is fully integrated in Atom with the Nuclide package but to run it from the command line, do the following:
```
cd /DPF
yarn flow
```

# Adding a new React Native App
To add a new React Native app, perform the following steps:
```
cd DPF
cp -r app-hello-world <new app name>
```
Open <new app name>/package.json and update the name at the top to <new app name>
Open DPF/package.json and add your new app in the workspaces section.
Note: if you're adding new libraries, always use yarn reset in /DPF to get yarn workspaces to rebuild the libraries across the mono-repo
Bootstrap the repo and start the new app:
```
cd DPF
yarn reset
cd DPF/<new app name>
yarn start
```

# Adding a new React JS App
To add a new React JS app, perform the following steps:
```
cd DPF/web
cp -r web-hello-world <new app name>
```
Open <new app name>/package.json and update the name at the top to <new app name>
Open <new app name>/.env and update the port number so it doesn't clash with the other React JS apps in the repo
Open DPF/package.json and add your new app in the workspaces section.
Note: if you're adding new libraries, always use yarn reset in /DPF to get yarn workspaces to rebuild the libraries across the mono-repo
Bootstrap the repo and start the new app:
```
cd DPF
yarn reset
cd DPF/web/<new app name>
yarn start
```
