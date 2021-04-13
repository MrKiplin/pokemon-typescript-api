# Pokemon Service API

Service for connecting to the pokemon REST API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

To get up and running, you will need the following tools.

### Code

To write and test code you will need [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) installed. If your on a Mac, use [Homebrew](https://docs.brew.sh/Installation) for installation.

```
brew install node
brew install yarn
```

Will also need [TypeScript](https://www.typescriptlang.org/) installed.

```
npm install -g typescript
```

### Installing

Change to the root directory and install dependencies.

```
yarn
```

## Running the tests

Tests can be run globally from the root directory by running `yarn test`

```
yarn test
```

## Using the API

Change to the root directory and run `yarn start`

```
yarn start
```

Open `http://localhost:<port>/internal/api-docs` in your browser to view the swagger documentation. NOTE: `swagger.yaml` base URL will need to be updated if `PORT` differs from default i.e 3000.

### Port:

Port is set by environmental variable `PORT`. If none exists then will default to `3000`.

## Authors

![](docs/mrkiplin-icon.gif)

- **Theodore Jones** - [MrKiplin](https://github.com/MrKiplin)
