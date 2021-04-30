# Acta

Acta is a simple backend API for a wiki: a collaboratively edited encyclopedia-like system for storing, accessing and building knowledge. The best-known example of a wiki is [Wikipedia](https://www.wikipedia.org/), but a wiki may also be used by a school or business for maintaining an internal knowledge base. Please see [this page](https://cft.vanderbilt.edu/guides-sub-pages/wikis/) for a more complete definition of a wiki.

Acta was written in JavaScript and uses a [PostgreSQL](https://www.postgresql.org/) server, with [Express](https://expressjs.com/) for handling requests/responses and [Sequelize](http://sequelize.org/) for object-relationship management. Acta is meant to be self-contained and agnostic, so it can be simply dropped into a web host and used with any kind of front-end or markup content (like Markdown or Wikitext). Users are authorized but Acta is **not** meant to be secure enough for a high-traffic public website!

## Endpoints

### POST `/signup`
- **Request:** `{ username, password }`
- **Response:** `{ id, username, passwordHash, createdAt, updatedAt }`
- **Errors:** passing an empty string for either value will result in a `500` error

### POST `/signin`
- **Request:** `{ username, password }`
- **Response:** `{ id, username, accessToken }`
- **Errors:** passing a nonexistent user or an invalid password will result in a `500` error

### GET `/users/:userId`
- **Response:** `{ id, username, createdAt, updatedAt, edits }`

### GET `/articles/`
- **Response:**

### GET `/articles/:articleId`
- **Response:**

### POST `/articles/`
- **Headers:** `{ "Content-Type", "x-access-token" }` - a valid bcrypt token is required to create an article
- **Request:** `{ title, content }`
- **Response:**

### PATCH `/articles/:articleId`
- **Headers:** `{ "Content-Type", "x-access-token" }` - a valid bcrypt token is required to add an edit to an article
- **Request:** `{ content }`
- **Response:**
