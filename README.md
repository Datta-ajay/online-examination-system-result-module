# Module 3 – Evaluation & Results Module

## Purpose
Read submitted examination records and present student result cards, scores and examination history.

## Features implemented in this source project
- Student login gate using the existing demo login component.
- Examination history table with course, exam title, submission timestamp and time taken.
- Results table with candidate, score, percentage and pass/fail status.
- Selected scorecard showing marks, percentage, correct/wrong counts and time elapsed.
- Reads result records saved by the examination module from the shared LocalStorage key.

## Implementation flow
Student login → Results / Examination History → read ExamResult records from LocalStorage. The result record is created by Module 2 when the student submits an examination; this module displays the saved record.

## Source files in this module
- `src/examination/StudentLoginView.jsx`
- `src/examination/StudentExamHistoryView.jsx`
- `src/examination/StudentResultsView.jsx`

## Shared files included so this module can run
- `src/components/common/` – reusable buttons, cards, form controls, modal and table.
- `src/components/layout/` – application layout, sidebar and top navigation.
- `src/data/seedData.js` and `src/data/questions.json` – initial browser data.
- `src/utils/storage.js` – shared LocalStorage functions.
- `src/App.css` and `src/index.css` – original project styling.
- `src/main.jsx`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js` – Vite application setup.

## Run the module
Open this extracted folder in VS Code or a terminal and run:

```bash
{info['run']}
```

## Manual verification
{info['manual']}

## Important implementation notes and limitations
{info['limitations']}

## Technology used in the uploaded project
- React 18
- JavaScript / JSX
- HTML
- CSS
- Vite
- Browser LocalStorage
- JSON seed data

There is no backend server, database or external API in this frontend project.

## Integration notes
The three modules share the same browser storage keys and data structures from `src/utils/storage.js`. For a combined application, keep one copy of the shared `src/components`, `src/data`, `src/utils`, `src/App.css` and `src/index.css` folders/files, then combine the module views and navigation in one `src/App.jsx`.

Do not run the separate module apps on different ports and expect them to share browser LocalStorage. Browser storage is isolated by origin (including port).
"# online-examination-system-result-module" 
"# online-examination-system-result-module" 
"# online-examination-system-result-module" 
