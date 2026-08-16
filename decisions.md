# Decisions

## 1. Folder structure

Kept it flat and simple since this is a small project:

src/
components/
Column.jsx
TaskCard.jsx
TaskModal.jsx
App.jsx
main.jsx
index.css

Everything reusable lives in `components/`. No need for deeper nesting (like `features/` or `hooks/`) at this size — that would be over-engineering.

## 2. State management approach

Just React's built-in `useState`, no Redux or Zustand. All tasks live in one array in `App.jsx`, in a single state variable with a `status` field (`todo` / `in-progress` / `done`) on each task. Columns just filter that one array instead of each column managing its own list. This made drag-and-drop and search way simpler later, since there was only one source of truth to update.

Redux would be overkill here — one component owning state and passing it down a couple of levels doesn't need a global state library.

## 3. Why Local Storage?

No backend was required for this project, and Local Storage is the simplest way to persist data in the browser. Downsides I'm aware of: it's per-browser (not synced across devices), has a ~5-10MB limit, and isn't secure for sensitive data — none of which matter for a single-user learning project.

## 4. Component breakdown

- `App.jsx` — owns all state (tasks, modal open/close, search term), passes data and callbacks down.
- `Column.jsx` — displays one column, renders its filtered tasks, handles the drag-and-drop drop zone.
- `TaskCard.jsx` — displays one task, has Edit/Delete buttons.
- `TaskModal.jsx` — the add/edit form, reused for both actions (decided by whether a task was passed in or not).

## 5. Challenges faced

- Getting drag-and-drop working meant switching from `react-beautiful-dnd` (deprecated) to `@hello-pangea/dnd`, its maintained fork.
- Had a bug early on where deleting a task inside a `useCallback` used stale data — fixed by using the functional update form (`setTasks(prev => ...)`) instead of referencing `tasks` directly.
- Getting the modal to reset properly between "Add" and "Edit" (so old data didn't linger) needed a `useEffect` synced to when the modal opens.

## 6. Future improvements

- Toast notifications instead of nothing when a task is added/deleted.
- Due dates and filtering by priority.
- Undo after delete.
- Dark mode.

## 7. Production changes

If this were going to real users, I'd need:

- A real backend + database instead of Local Storage (data shouldn't live only in one browser).
- Input validation and sanitization on the server side, not just the form.
- Error handling for failed saves (Local Storage can silently fail if full or disabled).
- Automated tests (currently none).
- A proper build/deploy pipeline instead of just `npm run dev`.

## 8. Multi-user support approach

Right now there's no concept of a "user" at all — it's one shared task list in one browser. To support multiple users, I'd add a `userId` field to each task, move storage to a real database, and scope every read/write to the logged-in user's id.

## 9. Authentication integration plan

Would add a login page (email/password or OAuth), store a session token, and send it with every request to the backend so the server knows which user is asking. Until login happens, the app wouldn't show any tasks.

## 10. Open questions

- Should deleted tasks be recoverable (soft delete) instead of gone immediately?
- Should search also match description text, not just title?
- At what task count would Local Storage start being a real limitation?
