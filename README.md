# SanskritiChokhani.ai

Personal portfolio for Sanskriti Chokhani, highlighting work in data science, business analytics, and agentic AI.

## Structure

The site uses a lightweight static `public/` structure:

```text
public/
  index.html
  css/
    theme.css
    components.css
    lightbox.css
  js/
    custom.js
    lightbox.js
  data/
    projects.json
    work-experience.json
    education.json
    skills.json
    highlights.json
  images/portrait.jpeg
  docs/resume.pdf
  fonts/InterVariable.woff2
```

`index.html` contains the introduction, navigation, section containers, and contact links. `custom.js` fetches JSON and renders sections; `lightbox.js` owns detail dialogs and their navigation. Styles are separated into shared theme rules, page components/responsive rules, and detail-dialog styling.

## Preview

Serve the public directory over HTTP (ES modules and JSON fetches require a server):

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory public
```

No dependencies or build step are required to serve the website. Firebase Hosting and GitHub Actions are configured for `sanskritichokhani-ai`, with production deploys from `main` and pull-request previews. Follow [.github/DEPLOYMENT_SETUP.md](.github/DEPLOYMENT_SETUP.md) to add the GitHub secret and complete deployment. Keep all credentials outside `public/`; local keys belong in the ignored `.secrets/` directory.

## Content

Edit `public/data/` to update projects, experience, education, skills, and career highlights. The JSON collections (`projects`, `experiences`, `education`, and `categories`) and portfolio-specific fields are documented in `DATA_SCHEMA.md`. Highlights use a separate file because they represent supplied business results rather than inferred counts.

The portfolio includes only sections supported by Sanskriti's supplied material. Project and work descriptions use a local rich-text `body` field rendered by the detail dialog. This preserves the full project stories; do not put untrusted HTML in these fields.

The visual system uses custom CSS and a locally served Inter variable font. Personal content comes from Sanskriti's resume and Columbia coursework context. The downloadable resume is unchanged. No deployment has occurred.
