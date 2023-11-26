# OOPSIE
NOTE: (Updated in 2023) If you are planning on copying as it is, I would advice you to atleast go through the documentation for spring because your oops project will actually go a long way in your future. Take this as an advice your senior gives

## Features
- Has a frontend made using React JS + Tailwind CSS
- Supports payments using a custom system
- Has coupon code functionality
- Dockerized and ready to scale up whenever needed
- Support for email notifications 
- User can order, cancel and check status of order
- Manager can add products, check orders and delete orders
- Admin can add and delete users, managers, check orders, and inventory
- Forgot password feature was also implemented
- Connected with a MySQL Database
- Passwords were encrypted using bcrypt 

## Postman Repository
https://www.postman.com/joint-operations-observer-50626032/workspace/oopsie

## Running Frontend 
All these commands are to be run from /frontend folder
### `npm install`
Installs Packages for the project 
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

## Running Backend
1. `cd Server`
2. `./gradlew bootRun`
3. You might have to change variables in the application.properties so that it works for your local database
4. The server runs at [SERVER_URL](SERVER_URL)
