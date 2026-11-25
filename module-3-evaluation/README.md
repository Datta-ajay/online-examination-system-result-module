# Module 3 – Evaluation & Results Module – Module Source Folder

## Purpose
Read submitted examination records and present student result cards, scores and examination history.

## Implemented responsibilities
- Student login gate using the existing demo login component.
- Examination history table with course, exam title, submission timestamp and time taken.
- Results table with candidate, score, percentage and pass/fail status.
- Selected scorecard showing marks, percentage, correct/wrong counts and time elapsed.
- Reads result records saved by the examination module from the shared LocalStorage key.

## Module implementation files
- `src/examination/StudentLoginView.jsx`
- `src/examination/StudentExamHistoryView.jsx`
- `src/examination/StudentResultsView.jsx`

## Data flow
Student login → Results / Examination History → read ExamResult records from LocalStorage. The result record is created by Module 2 when the student submits an examination; this module displays the saved record.

## Important limitations
The uploaded code performs the score calculation inside ExaminationInterfaceView.jsx in Module 2, not inside the result display components. Module 3 is the reporting/presentation layer. The original seed data can display sample results even before a real attempt. For actual cross-module data, run the modules on the same browser origin; different localhost ports have separate LocalStorage.

## How to run this module
This folder contains the module-specific source files. The ZIP archive root contains the Vite application shell, shared components, styling, seed data, storage utility and package files needed to run this module.

1. Extract the complete ZIP archive.
2. Open the extracted archive's root folder (not this nested module folder) in VS Code.
3. Run:

```bash
npm install
npm run dev
```

See the `README.md` at the archive root for full setup, manual verification and integration notes.
