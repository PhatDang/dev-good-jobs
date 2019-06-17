===================================
#### HEROKU STAGING AND PRODUCTION::

##### Rename your git remote heroku to something else like production
git remote rename heroku production

##### So now you will push as: git push production master

##### Create the staging app
heroku apps:create staging-appname

##### Rename the heroku to staging
git remote rename heroku staging

##### As heroku only accept master branch to deploy, you have to push your staging branch to heroku's master branch (assuming your local branch for staging is staging)
git push staging staging:master

##### Sending heroku commands in multiple app/environment
heroku run rake db:seed --app staging-appnam

##### Tired of writing --app all the time?
###### note that staging heroku remote refers to the branch, not the app name
git config heroku.remote staging

heroku run rake db:seed # works on staging now!

#### Rules for Dev:
"Rule 1: Organize your files around features, not roles!"
##### [LEARN] Create tree folder for project (NODE.js):
- Op1: https://viblo.asia/p/5-quy-tac-co-ban-trong-xay-dung-cau-truc-mot-project-nodejs-6J3Zg9wB5mB
- Op2: https://github.com/sahat/hackathon-starter
- Op3: https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/
- Op4: https://github.com/RisingStack/multi-process-nodejs-example
- Op5: https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/
