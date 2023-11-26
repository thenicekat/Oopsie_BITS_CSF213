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

## Resources
Postman -> https://www.postman.com/joint-operations-observer-50626032/workspace/oopsie
JPA Repositories -> https://docs.spring.io/spring-data/jpa/docs/1.6.0.RELEASE/reference/html/jpa.repositories.html


## Running Frontend 
All these commands are to be run from /frontend folder
`npm install` -> Installs Packages for the project \
`npm start` -> Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Running Backend
1. `cd Server`
2. `./gradlew bootRun`
3. You might have to change variables in the application.properties so that it works for your local database
4. The server runs at [SERVER_URL](SERVER_URL)

## Extra Setup Guide
1. Install Mamp and create a database called oopsie in PHPMyAdmin, with username as **mamp** and password as **Admin@123** [The initial parts of this video can be helpful](https://www.youtube.com/watch?v=4Wf__mTxm8M)
2. Install Postman and check all the requests the server accepts. I ensured all of the responses had examples as well. [Postman](https://app.getpostman.com/join-team?invite_code=dda06360fa7b9a60e531908f256fa243&target_code=fa8e0c01e9c07a8d85fead85c5c60cce)
3. Link frontend and backend using fetch requests and converting them to JSON on the frontend

Can refer to these files: https://github.com/Divyateja04/Oopsie/commit/15e5f0eb798d2e3af9d72c8beea4866d25aee481

We send a request to the backend, then get that response and process it in the backend. The Syntax for a standard fetch statement is(in our case)

```
fetch("http://localhost:8080/user/signin",
        {
          method: "POST",
          body: JSON.stringify(
            {
              emailId: email,
              password: password
            }
          ),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(rawResponse => rawResponse.json())
        .then(resp => {
          if(resp.error != null){
            setErrMsg(resp.error);
          }

          if (resp.emailId === email) {
            //If we got a response from server with email
            //He can be logged in
            dispatch(setLoggedIn());
            if (resp.isAdmin === true) {
              //Change Admin Status is it's an admin
              dispatch(setIsAdmin());
            }
            if (resp.isManager === true) {
              //Change Admin Status is it's an admin
              dispatch(setIsManager());
              if(resp.isApproved === true){
                dispatch(setIsApproved);
              }
            }
            //Passing the money to the set money function
            dispatch(setMoney({ money: resp.money || 0 }));
            //Set the fetching status to false so that button is not disabled
            setLoggingIn(false);
  
            //Using localstorage to set items
            localStorage.setItem("user", resp);
            navigate("/shopping");
          }
        })
        .catch(err => {
          console.log("Error Occured")
          setErrMsg(err.toString());
          //Set the fetching status to false so that button is not disabled
          setLoggingIn(false);
        });
```
