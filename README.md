# TaskFlow – Task Management System

A responsive Task Management System built using React.js.

## About the Project

TaskFlow is a frontend web application that helps users organize and manage their daily tasks efficiently.

## Features

- Add new tasks
- Add task descriptions
- Set task priority (Low, Medium, High)
- Mark tasks as Completed or Pending
- Delete tasks
- Search tasks by title and description
- Filter tasks by status
- Save tasks using Browser LocalStorage
- Responsive user interface

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- LocalStorage

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/Sudarshandoke03/taskflow.git
```

Navigate to the project folder:

```bash
cd taskflow
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## React Concepts Used

- useState – To manage component state.
- useEffect – To save tasks in LocalStorage.
- map() – To display and update tasks.
- filter() – To search, filter and delete tasks.
- Event Handling – To handle user interactions.

## Project Structure

```text
taskflow/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Project Type

Frontend-only React application.

Task data is stored in the browser's LocalStorage. No backend or database is connected.

## Author

Sudarshan Doke

## GitHub Repository

https://github.com/Sudarshandoke03/taskflow
