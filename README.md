# Project Name

## Description

EventHive is a social app where users connect through events. Users can host their own events, as well as browse and join events organized by others based on their interests and location. Users can also interact with each other by commenting on upcoming events.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start creating, joining and favoriting events
- **Login:** As a user I can login to the platform so that I can see my created, joined and favorited restaurants
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Create Events** As a user I want to create my own events that other people from the community can join
- **Join Events** As a user I want to join events that other people from the community created
- **Edit Events** As a user I want to update information about an event that I created
- **Delete Events** As a user I want to delete events that I created
- **Comment Events** As a user I want to comment events to ask questions or communicate with others
- **Search Events** As a user I want to search events by name so that I know if it´s already in the platform
- **Add to favorites Events** As a user I want to add events to favorite so that I can save them for later
- **See my favorites Events** As a user I want to see my favorite events so that I can check the details again
- **See my joined Events** As a user I want to see my joined events so that I can check the details again
- **See my organised Events** As a user I want to see my organized events so that I can check the details again
- **Edit my profile** As a user I want to update my profile information.
- **Learn more about the project** As a user I want to learn more about the website so I can decide to join or not

## Backlog

User profile:

- see other users profiles and their associated events

User groups:

- join user groups that have a specific interest and can join events only accessible to their group

Search by location:

- search events that are only in a specific area around one location

Other Search Filters:

- search events that are filtered by event type, date

Forget Password:

- ask for reset email in case of forgotten password

Random Location image

- set random image of the specified location in case there is no image url provided

# Client

## Routes

- / - Homepage
- /about - About website and team
- /event/create - Create an event
- /modify-event/:eventId - update event information
- /event/:eventId - Event details
- /profile - Profile info and associated events
- 404

## Pages

- HomePage (public)
- AboutPage (public only)
- CreateEventPage (user only)
- EventDetailPage (public)
- ModifyEventPage (user only)
- ErrorPage (public)
- UserProfilePage (user only)

## Components

- CommentForm
- Comments
- CustomNotification
- DeleteEventButton
- EmployeeCard
- EventCard
- EventForm
- EventGrid
- EventModifier
- FavoriteIcon
- FooterBar
- Header
- HeroSection
- IsPrivate
- Message
- ModifyEventButton
- PaginationControls
- SearchBox
- SignButtons
- SignIn
- SignUp
- UserDetails
- UserProfileForm

# Server

## Models

User model

```
username - String // required & unique
userType - String // ['User', 'Admin']
email - String // required & unique
passwordHash - String // required
favoritedEvents - [ObjectID<Event>]
info - Object {firstnName, lastName, location, hobbies, age, language}
```

Event model

```
eventname - String // required
description - String
photo - String
location - String //required
date - Date
organizer - [ObjectID<User>]
eventType - String ['Conference', 'Meetup', 'Seminar', 'Workshop']
attendees - [ObjectID<User>]
```

Comment model

```
commentText - String // required
eventId - [ObjectID<Event>]
commenter - [ObjectID<User>]
```

## API Endpoints/Backend Routes

For detailed information consider checking out the readme on the backend repository on github linked below

### Auth Routes

- GET /auth
- POST /auth/signup
- POST /auth/login
- GET /auth/user-details
- POST /auth/logout

### Event Routes

- GET /api/events
- GET /api/events/:eventId
- POST /api/events
- PUT /api/events/:eventId
- PATCH /api/events/:eventId/attend
- PATCH /api/events/:eventId/leave
- DELETE /api/events/:eventId

### Comments Routes

- GET /api/comments/event/:eventId
- POST /api/comments
- PUT /api/comments/:commentId
- DELETE /api/comments/:commentId

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/Qh9UrVy4/event-hive) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/codewithmirko/event-hive-frontend)
[Server repository Link](https://github.com/ftmgr/event-hive-backend)

[Deploy Link](https://eventhiveapp.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1KZTlYS4_-gdKyrmw_buiwKBAoFCg_nHKl6GMeBQFDVM/edit#slide=id.g2da5804e803_0_224)
