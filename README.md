# Kanban Board

A simple Kanban board built from scratch with React, Tailwind CSS, and Local Storage. No backend — everything is saved in your browser.

## Features

- Add, edit, and delete tasks
- Three columns: Todo, In Progress, Done
- Drag and drop tasks between columns
- Set task priority (low / medium / high)
- Search tasks by title
- Data persists after refresh (Local Storage)
- Responsive layout (stacks on mobile, side-by-side on desktop)

## Tech stack

- React (Vite)
- JavaScript
- Tailwind CSS
- Local Storage
- @hello-pangea/dnd (drag and drop)

## Getting started

```bash
git clone https://github.com/shivam-0-1/kanban-board.git
cd kanban-board
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

## Project structure

src/
components/
Column.jsx # board column
TaskCard.jsx # task, with edit/delete buttons
TaskModal.jsx # add/edit task form (modal)
App.jsx # main state and layout

## Notes

See `decisions.md` for the reasoning behind the technical choices made in this project (state management, Local Storage, folder structure, and what would change for production).
