# Dragon-Stack-Web-Application
A web application for buying/selling and creating new Dragons, including secured authentication system.<br />
Backend was developed with **Node.js Express**.<br />
Frontend was developed with **React** and **Redux**.<br />
Data is stored in **PostgreSQL** database management system.<br />
<br/>
### Home page
![home1](https://user-images.githubusercontent.com/53992561/120931369-e66d2100-c6f9-11eb-9d75-c8b261a9d58c.png)
<br />
#### Secured Authentication - 
* This application includes an authentication system - by clicking the button on the top right of the bar a user will activate a popup window.
On this windows users can signup/login by pressing a button, which call HTTP POST request to the server with the user credentials as params.
The express server connect to PostgreSQL server and search in the account table for the suitable data.<br />
* The authentication is secured because when user login, the server create a new Session (which will be ended after some time) and it use **SHA256 hash function**,
for creating a unique session's string with the user's credentials. The username and the password are not inserted to the account table directly, only the session string itself. In addition the server send's to the browser and **HTTP cookie** with the user's session's string, so it can use it for future API requests.
* User must be logged in for navigate to the other links in the top bar, besides the Home and the Help pages. If user will try to access one of the top bar pages while not being logged in it will be redirected to the Help page.
<br />

#### Get a new Dragon, make him Public, set a Price and Account's Economic System
* As can be seen in the Home page screenshot, by clicking 'new Dragon' button the user is become owner of a new dragon. This button sends a API GET request to the server, which generates a new dragon with some random traits, and assign this dragon to the account in the accountDragons table in the database, using the session's string from the http cookie for getting the account's details. 

![userInfo1](https://user-images.githubusercontent.com/53992561/120970303-ee69a700-c773-11eb-985e-092c36d013e0.png)

* In the Account Dragon page, a user can update his dragons name, set it public and set to it a price for selling, and if it is a female set price so other user's male dragon will be able to pay for breeding a new baby dragon. Of course after the user updates the details, a UPDATE request is sent to the server to update this data in the database.

* **Buying** and **Breeding** special calls and update account's balance - In Public Dragon page (or in Search while filtering to public dragons) users can see other account's dragons which was set to public. User can buy those dragons, or breed a new baby dragon if his account can afford it financially.
