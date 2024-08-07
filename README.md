# Express Tasks API

A simple REST API built with Express and TypeScript for managing tasks. This API uses `lowdb` as a lightweight JSON database to store task data.

## Features

- Create tasks
- Read tasks
- Update tasks
- Delete tasks

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
      "tasks": []
    }
    ```

4. **Run the application:**

    ```bash
    npm start
    # or
    yarn start
    ```

    The server will start and listen on port 4000.

### API Endpoints

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
          "endDate": null,
        }
        ```

    - **Response:**

        ```json
        {}
        ```

- **Update a task**

    - `PUT /tasks/:taskId`

    - **Request Body:**

        ```json
        {
          "taskTitle": "Updated Task Title",
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
