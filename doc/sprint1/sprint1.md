# Sprint 1 Planning Meeting
___
On the 30th of May, 2022, we held our sprint 1 Planning meeting on Discord with the goal of deciding which user stories should be included, indentifying the related tasks to the user stories, and distributing the tasks among the team members. All member of Vectre Labs were present during this meeting.

Through the planning meeting, we have choosen five user stories that we deemed as necessary for the basic functionality of our application. These user stories allow users of our application to register and set up their account, and make posts onto our platform. We then break down the user stories to subtasks, evaluate the subtasks using plannig poker, and distribute them along with document responsibilities among our members. We also decided to present the Project Demo during the Tutorial on June 15th, 2022.

# Goal
____
- Finish user stories: VEC-2, VEC-3, VEC-4, VEC-7, and VEC-18

# User Stories and Tasks Breakdown
___
Story: **VEC-2**
Task:
- Create 'Login' and 'Setup' view in Frontend.
- Create POST endpoints for Login and Account creation.
- Implement JWT Authentication and Authorization.

Story: **VEC-3**
Task:
- Create 'User' model in the backend.
- Implement methods for the 'User' model to get and update user account.
- Design the 'User profile edit' view in the Frontend.
- Create the 'User profile edit' view in the Frontend.

Story: **VEC-4**
Task:
- Create methods for calling OpenSea API in the backend to retrive NFT information.
- Create GET endpoint to grab 'NFT Dashboard' information from the user.

Story: **VEC-7**
Task:
- Create 'Post' model in the Backend.
- Create 'Post' model methods in the backend to interact with posts.
- Create 'Post' view in the Frontend.

Story: **VEC-18**
Task:
- Create 'User' model methods for deleting the user account.
- Create DELETE endpoint for deleting user account.

# Spikes
___
- When handling backend authentication of Metamask login, we had to implement nonces and integrate JWTs, which we did not have prior experience.
- Since we are using React for our Frontend, we had to learn React framework and redux-saga to make HTTP request to our API.
- When writing methods for our Uesr model, we encountered some issues with parsing Cypher commands when attempting to run the queries.
- To collect NFTs from the user's wallet address, we had to learn to use OpenSea API and had to optain an API to interact with the Ethereum Mainet.

# Team Capacity
___
| Member | Estimated hours of work per day |
|---|---|
| Nikhil Lakhwani | 2|
| Henry Wong | 5|
| Peter Yan Tsai Chow | 4|
| Tuan Ky Pham | 2.5|
| Prachyo Sarker | 2|
| Zhao Ji Wang | 2|

# Participants
___
Nikhil Lakhwani, Henry Wong, Peter Yan Tsai Chow, Tuan Ky Pham, Prachyo Sarker, and Zhao Ji Wang.

