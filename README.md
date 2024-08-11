# Express Tasks API

A simple REST API built with Express and TypeScript for managing tasks and task lists. This API uses `lowdb` as a lightweight JSON database to store task data.

## Features

- Create, Read, Update, Delete (CRUD) tasks
- Create, Read, Update, Delete (CRUD) task lists
- Manage tasks within task lists

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/elixirika/taskboard-api.git
    cd taskboard-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up the database:**

    Create a `db.json` file in the root directory with the following content:

    ```json
    {
      "tasks": [],
      "taskLists": []
    }
    ```

4. **Run the application:**

    ```bash
    npm start
    # or
    yarn start
    ```

    The server will start and listen on port 9000.

### API Endpoints

#### Tasks

- **Get all tasks**

    - `GET /tasks`

    - **Response:**

        ```json
        [
          {
            "id": "task-id",
            "taskTitle": "Task Title",
            "taskDesc": "Task Description",
            "status": "Done", //   - Not Started/In Progress/Done/On Hold/Unassigned
            "startDate": null,
            "endDate": null,
            "previousStatus": null
          }
        ]
        ```

- **Create a task**

    - `POST /tasks`

    - **Request Body:**

        ```json
        {
          "taskTitle": "Task Title",            
          "taskDesc": "Task Description",          
          "status": "Unassigned", //   - Not Started/In Progress/Done/On Hold/Unassigned
          "startDate": null,
          "endDate": null
        }
        ```

    - **Response:**

        ```json
        {
          "id": "task-id",
          "taskTitle": "Task Title",
          "taskDesc": "Task Description",
          "status": "Unassigned",
          "startDate": null,
          "endDate": null
        }
        ```

- **Update a task**

    - `PUT /tasks/:taskId`

    - **Request Body:**

        ```json
        {
          "taskTitle": "Updated Task Title"
        }
        ```

    - **Response:**

        ```json
        {}
        ```

- **Delete a task**

    - `DELETE /tasks/:taskId`

    - **Response:**

        ```json
        {}
        ```

#### Task Lists

- **Get all task lists**

    - `GET /tasklists`

    - **Response:**

        ```json
        [
          {
            "id": "list-id",
            "listTitle": "Task List Title",
            "subtasks": [
              {
                "id": "task-id",
                "taskTitle": "Task Title",
                "taskDesc": "Task Description",
                "status": "Done", //   - Not Started/In Progress/Done/On Hold/Unassigned
                "startDate": null,
                "endDate": null,
                "previousStatus": null
              }
            ]
          }
        ]
        ```

- **Create a task list**

    - `POST /tasklists`

    - **Request Body:**

        ```json
        {
          "listTitle": "Task List Title",
          "subtasks": [
            {
              "taskTitle": "Task Title",
              "taskDesc": "Task Description",
              "status": "Unassigned",
              "startDate": null,
              "endDate": null
            }
          ]
        }
        ```

    - **Response:**

        ```json
        {
          "id": "list-id",
          "listTitle": "Task List Title",
          "subtasks": [
            {
              "id": "task-id",
              "taskTitle": "Task Title",
              "taskDesc": "Task Description",
              "status": "Unassigned",
              "startDate": null,
              "endDate": null
            }
          ]
        }
        ```

- **Update a task list**

    - `PUT /tasklists/:listId`

    - **Request Body:**

        ```json
        {
          "listTitle": "Updated Task List Title"
        }
        ```

    - **Response:**

        ```json
        {}
        ```

- **Delete a task list**

    - `DELETE /tasklists/:listId`

    - **Response:**

        ```json
        {}
        ```

### Development

- **Run TypeScript compiler in watch mode:**

    ```bash
    npm run watch
    # or
    yarn watch
    ```

- **Run tests (if applicable):**

    ```bash
    npm test
    # or
    yarn test
    ```

---

Thank you for checking out the Express Tasks API!
