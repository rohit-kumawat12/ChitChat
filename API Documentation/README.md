### API Documentation

The Connectify application provides several RESTful API endpoints to manage user authentication, chat functionalities, and messages. Below is an overview of the available API endpoints:

#### User Management
- **Register a new user**
  - **Endpoint**: `POST /api/user/`
  - **Description**: Registers a new user with a name, email, and password.
  - **Request Body**: 
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password"
    }
    ```

- **User Login**
  - **Endpoint**: `POST /api/user/login`
  - **Description**: Authenticates a user and returns a JWT token.
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

- **Search Users**
  - **Endpoint**: `GET /api/user?search=term`
  - **Description**: Searches for users based on the search term.
  - **Query Parameter**: `search=term`

#### Chat Management
- **Create or Access a One-on-One Chat**
  - **Endpoint**: `POST /api/chat`
  - **Description**: Creates or accesses a one-on-one chat between two users.
  - **Request Body**:
    ```json
    {
      "userId": "recipientUserId"
    }
    ```

- **Fetch All Chats**
  - **Endpoint**: `GET /api/chat`
  - **Description**: Fetches all chats associated with the authenticated user.

- **Create a Group Chat**
  - **Endpoint**: `POST /api/chat/group`
  - **Description**: Creates a new group chat with multiple users.
  - **Request Body**: 
    ```json
    {
      "name": "Group Name",
      "users": ["userId1", "userId2"]
    }
    ```

- **Rename a Group Chat**
  - **Endpoint**: `PUT /api/chat/renamegroup`
  - **Description**: Renames an existing group chat.
  - **Request Body**:
    ```json
    {
      "chatID": "groupId",
      "chatName": "New Group Name"
    }
    ```

- **Add a User to Group Chat**
  - **Endpoint**: `PUT /api/chat/addtogroup`
  - **Description**: Adds a user to an existing group chat.
  - **Request Body**:
    ```json
    {
      "chatID": "groupId",
      "userID": "userId"
    }
    ```

- **Remove a User from Group Chat**
  - **Endpoint**: `PUT /api/chat/removefromgroup`
  - **Description**: Removes a user from an existing group chat.
  - **Request Body**:
    ```json
    {
      "chatID": "groupId",
      "userID": "userId"
    }
    ```

#### Message Management
- **Send a Message**
  - **Endpoint**: `POST /api/message`
  - **Description**: Sends a new message in a chat.
  - **Request Body**:
    ```json
    {
      "content": "Message content",
      "chatId": "chatId"
    }
    ```

- **Fetch All Messages**
  - **Endpoint**: `GET /api/message/{chatId}`
  - **Description**: Retrieves all messages for a specific chat.
