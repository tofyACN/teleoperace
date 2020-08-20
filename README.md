# teleoperace

Based on MERN stack boilerplate code with GraphQL, Apollo, TypeScript, typegoose, user registration and authentication middleware.
Source: <https://github.com/garganurag893/Next.js_GraphQL_Express_Apollo_Boilerplate>

## Implementation status

Data model created for:

* User
* Rover
* Participant (->User, ->Rover)
* Race (->Participants, ->Scores)
* Score (->Participant, ->Race, )

API ready for:

* User - CRUD + logon
* Rover - CRUD

UI ready for:

* Logon
* User registration
* Welcome page (to be adapted)
