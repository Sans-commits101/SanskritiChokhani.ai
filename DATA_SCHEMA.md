# Portfolio content schema

All content files live in `public/data/` and are loaded independently by `public/js/custom.js`. A failed request displays a section-specific error without preventing other sections from rendering.

- `projects.json`: `{ "projects": [...] }`. Each item has `id`, `title`, `category`, `summary`, `subtitle`, `period`, `label`, `fact`, and `body`. `label` and `fact` supply the card header. `body` contains trusted, locally authored HTML for the detail dialog.
- `work-experience.json`: `{ "experiences": [...] }`. Each item has `id`, `title` (company), `summary` (role), `category` (dates/location), `subtitle`, `initials`, and trusted HTML `body`.
- `education.json`: `{ "education": [...] }`. Each school has `institution`, `initials`, `date`, `location`, `degree`, `summary`, and `courseGroups`. Each group has `name` and a `courses` string array.
- `skills.json`: `{ "categories": [...], "tools": [...] }`. Categories contain `name`, `skills` (objects with `label`), and `note`. Tools are strings.
- `highlights.json`: `{ "highlights": [...] }`. Each highlight has `value`, `label`, and `organization`.

These use the upstream collection conventions with extensions for the user's existing content. Do not substitute the original author's data or invent achievements. Keep course cases distinguished from employment results.
