# Full stack school project

Simple CRUD full stack web application. The application is fully responsive and it looks good on all devices. The user can make a registration, sign in, add posts, delete posts and read all posts from another users. The Application is good for example for a job posts. Below are listed the technologies and tools used in this project. Also a short user manual.


# Front end / React (Hooks/ functional components)
Styling:
- SCSS/SASS (a little bit of scss just to try the technology)
- MATERIAL UI (Button /GRID /TextField /Link /ICONS /Typography /Alert /Container /Drawer /List / MakeStyles /90% of the components are styled with material ui)

Functionality:
- React Router (BrowseRouter, Switch, Route, Link, useHistory, useLocation, Redirect)
- useEffect
- useState
- useContext
- useReducer
- useForm
- axios
- Re-usable Component (Dependent on the path)
![image](https://user-images.githubusercontent.com/55087458/84622734-647f5900-aee6-11ea-9b1b-5fb79728f94d.png)
![image](https://user-images.githubusercontent.com/55087458/84622833-9ee8f600-aee6-11ea-9a6f-146ad317b4cf.png)
- localStorage (storing token, email and name, onLogin when received from backend)

![image](https://user-images.githubusercontent.com/55087458/84623436-eb810100-aee7-11ea-975c-331f1798a1db.png)

- Error handlers

![image](https://user-images.githubusercontent.com/55087458/84624172-8cbc8700-aee9-11ea-82d3-3c1f551ed881.png)




# Back end / Node.js (Express)
- The first and most important thing for the application to work is the MongoDB account!
### NB!!! For this project I have created an EXPIRING ACCOUNT (This account is valid only for 1 week, after that without connection to the database the project will NOT BE WORKING!!!). Account is VALID until 20.06.2020 after this date if you want to test the project please contact me and I can create new Account.

![image](https://user-images.githubusercontent.com/55087458/84629763-816e5900-aef3-11ea-9d00-d7bb60f17e5d.png)


- MongoDB 
- mongoose (creating models)
- dotenv (environment variables)
- JWT (creating token and sending it to the front end when signing in)
- bcrypt (hashing the password)
- Joi validation (even though the input fields are already validated in the front end, just in case I validate them again in the back end(double check))
- data validation

![image](https://user-images.githubusercontent.com/55087458/84624820-c3df6800-aeea-11ea-81a0-f183ffedfbb7.png)



# User Manual
### Starting the application
1) Navigate to the back end folder (cd backend)

![image](https://user-images.githubusercontent.com/55087458/84631629-618c6480-aef6-11ea-9a1c-bd0becc870cb.png)

2) Run the back end (npm start)

![image](https://user-images.githubusercontent.com/55087458/84631799-a57f6980-aef6-11ea-894e-bf182c4dd6da.png)

3) Two Success messages should appear. First for running the server and second for successful connection to the database. (if not, or errors appear please contact me)

![image](https://user-images.githubusercontent.com/55087458/84631915-d790cb80-aef6-11ea-9387-19e6adb87566.png)

4) Now when the server is running, we need to open second terminal where we will run the front end

5) Navigate to the front end folder (cd frontend)

![image](https://user-images.githubusercontent.com/55087458/84632443-9351fb00-aef7-11ea-945e-fbcbab1e1ee1.png)

6) Run the front end (npm start)

![image](https://user-images.githubusercontent.com/55087458/84632527-b67caa80-aef7-11ea-92bf-f097e63293fa.png)

7) Now after a short time should open the application

![image](https://user-images.githubusercontent.com/55087458/84632720-fd6aa000-aef7-11ea-8ee9-38f8c2ed951d.png)

![image](https://user-images.githubusercontent.com/55087458/84632788-15daba80-aef8-11ea-8482-ca70122117bf.png)


### How to use ?
- Sign up (You must create account in order to use the application)

![image](https://user-images.githubusercontent.com/55087458/84625580-343ab900-aeec-11ea-88da-382b4d5b997a.png)

- Sign in (You must be signed in, if you are not then only 2 pages are available Sing up and Sign in pages.)

![image](https://user-images.githubusercontent.com/55087458/84625689-795eeb00-aeec-11ea-8bbb-e31babf546c4.png)

- Home page (Once you are signed in you will be redirected to Home Page. You can reach the Home page also from the Logo, but only when you are signed in.)

![image](https://user-images.githubusercontent.com/55087458/84625937-df4b7280-aeec-11ea-853c-ac1af4b2677e.png)

![image](https://user-images.githubusercontent.com/55087458/84625991-fa1de700-aeec-11ea-96bf-4f48416dbcc2.png)

- Logout (You can logout from 2 places. The first one is from the navbar, just click the log out icon. The second is Log out button from the Home page)

![image](https://user-images.githubusercontent.com/55087458/84626197-5ed94180-aeed-11ea-92e9-c460202d2fdb.png)
![image](https://user-images.githubusercontent.com/55087458/84626230-6bf63080-aeed-11ea-8a62-4441270f0f10.png)

- Navigation menu (Material ui - Drawer. This is the menu where you can browse across the pages. You can open it from the Hamburger Icon)

![image](https://user-images.githubusercontent.com/55087458/84626522-e58e1e80-aeed-11ea-9bc0-58779b5801b1.png)

![image](https://user-images.githubusercontent.com/55087458/84626577-ff2f6600-aeed-11ea-9088-de333e4a908b.png)

- All posts (In this page are all the posts from all of the users. The posts are sorted from the newest to the oldest. If some of the posts are created by you, you can delete them from the delete button. Only 5 posts are displayed per page and on the bottom are navigation buttons. On the first page there is only one button "Next", on the second "Next" and "Previous", on the third and all after that is also button "Go to first page" and on the last page the button "Next" disappears.)

![image](https://user-images.githubusercontent.com/55087458/84627147-09059900-aeef-11ea-8f41-8d4815f0f584.png)

![image](https://user-images.githubusercontent.com/55087458/84627194-1cb0ff80-aeef-11ea-933d-cf5d34ce32d4.png)

![image](https://user-images.githubusercontent.com/55087458/84627235-32bec000-aeef-11ea-9a76-eb16430a41dc.png)

![image](https://user-images.githubusercontent.com/55087458/84627288-4e29cb00-aeef-11ea-9d9d-566ccd16996c.png)
"Next"

![image](https://user-images.githubusercontent.com/55087458/84627332-6dc0f380-aeef-11ea-80a8-4750865164b9.png)
"Previous" and "Next"

![image](https://user-images.githubusercontent.com/55087458/84627391-83361d80-aeef-11ea-89fc-a683dcac061c.png)
"First page", "Previous" and "Next"

![image](https://user-images.githubusercontent.com/55087458/84627488-b082cb80-aeef-11ea-81d6-bf319022e0b4.png)
"First page" and "Previous"


- My posts (This page use the same component as All posts, the difference is that only the posts added by exactly that user are displayed. Otherwise, of course, the functionality is exactly the same.)

![image](https://user-images.githubusercontent.com/55087458/84627831-474f8800-aef0-11ea-8f03-8a1fa22b7aa1.png)

- Add post (This is the last page and it is basically a form like Sing up/in. Two of the inputs (Name and Email) are set to the user's name and email. You cannot change this fields but all the others you can specify as you want. Here also as on the other forms are error handlers. When you successfully add new post, alert informs you and automatically clean the inputs and the form is ready for your next post.)

![image](https://user-images.githubusercontent.com/55087458/84628404-3bb09100-aef1-11ea-91d5-cdf24ead481f.png)

![image](https://user-images.githubusercontent.com/55087458/84628463-5aaf2300-aef1-11ea-8c51-f7a380b9d8f3.png)

![image](https://user-images.githubusercontent.com/55087458/84628608-a5c93600-aef1-11ea-8a46-65f8226b74e2.png)

