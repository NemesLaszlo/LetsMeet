# LetsMeet

LetsMeet is a meetup / workshop / event organizer and handler site, where you can post your coming events and interact with others. Lets organize your next futuristic tech event or any other what comes to your mind.

### Tech Stack - Backend

- .NET 5
- Mediator Pattern (MediatR)
- FluentValidation
- SignalR
- AutoMapper
- NLog
- Swagger
- Entity Framework Core
- Identity and Authentication
- Security with JSON Web Token
- Cloudinary
- SendGrid

### Tech Stack - Frontend

- React
- Semantic UI React
- Axios
- MobX
- React-Calendar
- React-Datepicker
- React-Cropper
- React-Dropzone
- React-Infinite-Scroller
- React-Toastify
- Formik

### Mediator Pattern

Imagine an application in which there are many objects that are communicating with each other. The mediator design pattern is useful when the number of objects grows so large that it becomes difficult to maintain the references to the objects. The mediator is essentially an object that encapsulates how one or more objects interact with each other. The mediator design pattern controls how these objects communicate, and helps to reduce the number of dependencies among them that you have to manage.

In the mediator design pattern, the objects don’t communicate with one another directly but through the mediator. When an object needs to communicate with another object or a set of objects, it transmits the message to the mediator. The mediator then transmits the message to each receiver object in a form that is understandable to it.

By eliminating the direct communication between objects, the mediator design pattern promotes loose coupling. The other benefit of using the mediator design pattern is that it improves code readability and maintainability.

### SignalR

ASP.NET SignalR is a library for ASP.NET developers that makes it incredibly simple to add real-time web functionality to your applications. What is "real-time web" functionality? It's the ability to have your server-side code push content to the connected clients as it happens, in real-time.

### Endpoints of the Backend

| Entity       | Type   | URL                                                    | Description                                                                          | Success                      | Authorize                         |
| ------------ | ------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------ | ---------------------------- | --------------------------------- |
| Activity     | GET    | /api/activities                                        | Get all activities with pagination.                                                  | 200 OK                       | Yes                               |
|              | GET    | /api/activities?pageSize=2&pageNumber=2                | Get all activities with 2 activities per page and get the second page of activities. | 200 OK                       | Yes                               |
|              | GET    | /api/activities?isgoing=true                           | Activities of the logged in user where he/she is going.                              | 200 OK                       | Yes                               |
|              | GET    | /api/activities?ishost=true                            | Activities of the logged in user where he/she is the host of this activities.        | 200 OK                       | Yes                               |
|              | GET    | /api/activities?startDate=2021-04-08                   | Get all upcoming activities from this start date.                                    | 200 OK                       | Yes                               |
|              | GET    | /api/activities?startDate=2021-04-14&isGoing=true      | Get all upcoming activities from this start date where the logged in user going.     | 200 OK                       | Yes                               |
|              | GET    | /api/activities/{id}                                   | Get the activity by Id.                                                              | 200 OK                       | Yes                               |
|              | POST   | /api/activities                                        | Create an activity.                                                                  | 200 OK                       | Yes                               |
|              | PUT    | /api/activities/{id}                                   | Update an activity.                                                                  | 200 OK                       | Yes & Logged in user is the host. |
|              | DELETE | /api/activities/{id}                                   | Delete an activity.                                                                  | 200 OK                       | Yes & Logged in user is the host. |
|              | POST   | /api/activities/{id}/attend                            | Subscribe to an activity / Unsubscribe from an activity.                             | 200 OK                       | Yes                               |
| User         | POST   | /api/account/login                                     | User Login.                                                                          | 200 OK & Token               | No                                |
|              | POST   | /api/account/fbLogin?accessToken={accessToken}         | User log in with Facebook                                                            | 200 OK                       | No                                |
|              | POST   | /api/account/register                                  | User registration.                                                                   | 200 OK                       | No                                |
|              | GET    | /api/account                                           | Get the current logged in user information like token, main image etc...             | 200 OK                       | Yes & Only the logged in user.    |
|              | POST   | /api/account/verifyEmail?token={token}&email={email}   | Email address verification.                                                          | 200 OK & Then you can log in | No                                |
|              | GET    | /api/account/resendEmailConfirmationLink?email={email} | Resend email address verification email with the link.                               | 200 OK                       | No                                |
|              | POST   | /api/account/passwordReset?token={token}&email={email} | Password Reset with the new Password in the body.                                    | 200 OK                       | No                                |
|              | GET    | /api/account/passwordResetRequest?email={email}        | Password reset request (Get an email with the link to reset the password.)           | 200 OK                       | No                                |
|              | POST   | /api/account/refreshToken                              | User token refresh.                                                                  | 200 OK                       | Yes                               |
| User Photo   | POST   | /api/photos                                            | Upload a photo.                                                                      | 200 OK                       | Yes                               |
|              | DELETE | /api/photos/{photo id}                                 | Delete a photo, the user cannot delete the current main photo.                       | 200 OK                       | Yes                               |
|              | PUT    | /api/photos/{photo id}/setmain                         | Set the photo to main. (Only one main - profile picture.)                            | 200 OK                       | Yes                               |
| User Profile | GET    | /api/profiles/{username}                               | Get the profile information about the user by the username.                          | 200 OK                       | Yes                               |
|              | PUT    | /api/profiles                                          | Update the profile information. (Only "Bio" and "DisplayName")                       | 200 OK                       | Yes                               |
|              | GET    | /api/profiles/{username}/activities?predicate=past     | Get the user past activities.                                                        | 200 OK                       | Yes                               |
|              | GET    | /api/profiles/{username}/activities?predicate=future   | Get the user future activities.                                                      | 200 OK                       | Yes                               |
|              | GET    | /api/profiles/{username}/activities?predicate=hosting  | Get the activities where this user is the host.                                      | 200 OK                       | Yes                               |
| User Follow  | POST   | /api/follow/{username}                                 | Follow this user.                                                                    | 200 OK                       | Yes                               |
|              | GET    | /api/follow/{username}?predicate=following             | Get the followings of this user.                                                     | 200 OK                       | Yes                               |
|              | GET    | /api/follow/{username}?predicate=followers             | Get the followers of this user.                                                      | 200 OK                       | Yes                               |
