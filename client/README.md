# Getting Started with Auth

React Authentication from lnkedInlerning

## Authentication type

We are using knowledge based auth

## JWT Auth

How does JWT work in Full stack?



Steos
The user Logs in. 
The server generates a JWT containing user's information.
THe server sends JWT to the user 
The frond end stores this JWT.
The front end inckudes this JWT whenevr neede previlaged access.
The server uses the JWT signature to verify that iit hasn't been modified. 


Signing vs Encrypting
- Singning proves the data in JWT hasnt been modified
- Encrypting prevents TP from seeing data inside JWT, 

Benefits:
- JWTs are statless,l doesnot backend to authenticate user
- uses JSON 

Drawbacks:
- Tockens are valid until expire so if an attacker get JWT they can acces the account even when the user has changed the password 



