# Full Stack interactive comments section

Full stack challenge project done for [FrontendMentor.io](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).
[Live Site](https://msg-app-kevin.herokuapp.com/)

 - On top of the regular challenge I added a Login and Registration page with form validation and Json Web Tokens for user authorizations.
 - Complete CRUD functionality, that allows auth users to create, edit, reply to, delete, and vote on comment messages.
 - Nodejs/Express backend with salted hashing of passwords and validation of data send from frontend. Json Web Tokens used for validating of restricted requests.
 - Utilized my own custom CSS for comment layout and design, and Material UI for navbar, forms, loading indicators and error prompts.
 - While requests are pending a loading indicators is placed where the comment would normally go until the request finishes.
 - If an rejected requests occurs, a Material UI error prompt will popup with the response error message.

## Used

- React with UseState, UseEffect, and UseRef hooks
- Redux Toolkit for state management to keep local record to comments and user data and tokens 
- Custom CSS for general comment layout and comment design
- Material UI for form areas and loading indactors and error prompts
- Typescript
- RESTful API
- Nodejs and Express with MongoDB for backend

## Practice

- RESTful API
- Backend and frontend HTTP request/response 
- Typescript 
- Redux Toolkit statement management
- MongoDB with Mongoose
- Monorepo Heroku deployment
