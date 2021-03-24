

First thing to do after cloning this project is to create your own .env file in the root of the project

And add the following

PORT=5555

#DB connection details will go here
CONNECTION=

DB_NAME=semester_case

DEBUG=www,app,setup-friend-testdata,friend-routes

#Comment out the line below, or BETTER remove it to get authentication if you have added this to the project
SKIP_AUTHENTICATION=1

#NODE_ENV=production