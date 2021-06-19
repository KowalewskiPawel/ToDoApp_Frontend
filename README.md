# To-Do App

A simple ToDo-App made with React, based on RESTful API.

### Installation

1. After cloning the repository install dependencies with the command `npm install` / `yarn install`
2. Create `.env` file in the main directory
3. Inside of the `.env` file add addresses to the API endpoints
4. Authorization endpoint `REACT_APP_API_URL_AUTH=<API_URL>`
5. User endpoint `REACT_APP_API_URL_TODOS=<API_URL>`


### Project Structure

- All of the components are connected to the `App.js` component, which is rendered in the `index.js`
- Inside of the `App.js` React router switches between Login and Registration form, and renders the user's content
based on whether JWT token is available or not
- The API calls modules are located inside of `service` folder
- `auth-header` send the user's JWT token stored in the localstorage to the request's header
- `auth.service` manages all of the requests related to user login and registration
- `user.service` manages all of the API calls related to the given user's content
- Styles has been created using SASS, and the styles file is hooked to the `App.js` file

### Known Issues and Possible Improvements

- Loading bar can be added between the async API calls
- Some functions can be divided into smaller/ separate clean functions
- Styles can be divided into separate modules
- Responsivness on smaller screens can be improved

## Live Version

()[]
