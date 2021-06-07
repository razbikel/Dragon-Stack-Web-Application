# Dragon-Stack-Web-Application
<br />

### General Description and Technologies
A web application for buying/selling and creating new Dragons, including secured authentication system.<br />
Backend was developed with **Node.js Express**.<br />
Frontend was developed with **React** and **Redux**.<br />
Data is stored in **PostgreSQL** database management system.<br />
<br/>
### Home page
![home1](https://user-images.githubusercontent.com/53992561/120931369-e66d2100-c6f9-11eb-9d75-c8b261a9d58c.png)
<br />
<br />
### Secured Authentication  
* This application includes an authentication system - by clicking the button on the top right of the bar a user will activate a popup window.
On this windows users can signup/login by pressing a button, which call HTTP POST request to the server with the user credentials as params.
The express server connect to PostgreSQL server and search in the account table for the suitable data.<br />
* The authentication is secured because when user login, the server create a new Session (which will be ended after some time) and it use **SHA256 hash function**,
for creating a unique session's string with the user's credentials. The username and the password are not inserted to the account table directly, only the session string itself. In addition the server send's to the browser and **HTTP cookie** with the user's session's string, so it can use it for future API requests.
* User must be logged in for navigate to the other links in the top bar, besides the Home and the Help pages. If user will try to access one of the top bar pages while not being logged in it will be redirected to the Help page.
<br />

### Get a new Dragon, make him Public, set a Price and Account's Economic System
* As can be seen in the [Home page](#Home-page) screenshot, by clicking 'new Dragon' button the user is become owner of a new dragon. This button sends a API GET request to the server, which generates a new dragon with some random traits, and assign this dragon to the account in the accountDragons table in the database, using the session's string from the http cookie for getting the account's details.
* In the Account Dragon page, a user can update his dragons name, set it public and set to it a price for selling, and if it is a female set price so other user's male dragon will be able to pay for breeding a new baby dragon. Of course after the user updates the details, an UPDATE request is sent to the server to update this data in the database. 
<br />

![userInfo1](https://user-images.githubusercontent.com/53992561/120970303-ee69a700-c773-11eb-985e-092c36d013e0.png)

<br />


### Buying and Breeding special calls and update account's balance
* In Public Dragon page (or in [Search](#Search-Sort-and-Filter) while filtering to public dragons) users can see other account's dragons which was set to public. User can buy those dragons, or breed a new baby dragon if his account can afford it financially.

![breed](https://user-images.githubusercontent.com/53992561/120974020-4f937980-c778-11eb-8736-d24f791421c5.png)


* By clicking the 'breed' button, the app fetch from the database the account's male dragons and presents them to the screen as button as well. Then, by clicking on of his dragons, the user activate a API POST request with the mother and the father dragons ID as params, and the buyer account's details from the http cookie.
* The server checks in the database if the buyer can afford the mother dragon's 'birth value' , increases the account's balance of the owner of the mother dragon with the 'birh value', decreases the account's balance of the owner of the father dragon with the same value in the account table in the database and finally, store a new baby dragon (with mixed traits of its parents) in the dragon table and account-dragon table for the buyer, the owner of the father dragon.
* The server sends back to the browser a message which announce that the process completed successfully, and presents the new account's balance.
* A similar logic is used when a user wants to buy a public dragon. Of course he gets the dragon he chose and not a new baby dragon.

<br />

### Rate Dragon by Like/Dislike Button

![like](https://user-images.githubusercontent.com/53992561/120981676-94bba980-c780-11eb-844e-45830e103068.png)

* A nice tool for evaluating dragons by knowing how popular they among other users. The server maintenance a table in the database with foreign keys of account-ID and dragon-ID, and by the user clicking the like/dislike button an UPDATE request is sent to the server. It checks if this like or dislike operation, and increases/decreases the likes field in the dragon table.
* The server sends back to the client the updated number of likes of this dragon, and if the user like or dislike this dragon to know which button to render to the screen.
* By clicking the number of people who like this dragon, a popup will be activated and would present a list of the accounts who likes this dragon.
* As can be seen in the [Home page](#Home-page) screenshot, when the Home component is rendered to the screen an api GET request is send to the server and fetch from the database to most 10 popular dragons.

<br />

### Search Sort and Filter

![search1](https://user-images.githubusercontent.com/53992561/120985152-03e6cd00-c784-11eb-9718-760bb87b18c7.png)

* A searching system, with the option for filter the results and sort them by some paramters.
* For more efficient search, and for minimize the load on the server (prevent from fetching a large and unnecessary amount of items every time) the search is take place in the backend of the app.
* The search, filter and sort values are sent to the server in a GET request, and it Selects only 10 items each time and returns to the frontend a list of the searched dragons, and the amount of all the dragons that match the search values.
* The frontend renders to the screen the list of dragons, and pages buttons bar so each button is the offset that needs to be taken when fetching 10 results from the database ('1' would fetch the first 10, '2' from index 10-19 and so on).

