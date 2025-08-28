User Authentication Service 

A minimal NodeJS + Express + MongoDB backend focused on user authentication with a protected endpoints.

Features

-  Authentication

    Routes defined in ./routes/authRoutes (e.g., sign up / sign in; see that file for exact paths).

-  Protected user context

    GET /user returns the authenticated user set by requireAuth.

-  Health check

    GET / returns a welcome string (useful for uptime checks).

-  CORS + JSON

    CORS enabled and JSON bodies parsed globally.

-  MongoDB persistence

    Mongoose connection via keys.mongoURI; User model registered at startup.

-  Tech stack

    Node.js, Express

    MongoDB (Mongoose)

    CORS

   JWT

   
# To use simply install all dependencies command: npm install,  and replace the mongodb credentials with your own.




