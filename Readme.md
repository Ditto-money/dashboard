# Ditto Money Dashboard Frontend

Dashboard frontend for the Ditto Elastic Supply Currency.

## Development
This repo uses Husky for git hooks. It will run a lint / prettier on commit. Please fix any errors that may occur when committing changes you have made.

<span style="color:yellow;font-size:15px;background:black;">⚠️ Please make sure the code is well documented and you have run lint (npm run lint) before comitting any changes you have made ⚠️</span>

Copy `.env.sample` to `.env` and update accordingly
Run `make`
Then visit http://localhost:3001

## Deployment
This repo is being managed by a dokku instance on `serv.ditto.money`

The steps to deploy to production are:
1. Message @venariuss or @chefchansey on telegram and provide your public rsa key
2. `git remote add dokku dokku@serv.ditto.money:dashboard`

After these intital steps you can deploy the new version of the app just by pushing your changes:
1. `git push dokku main:master`