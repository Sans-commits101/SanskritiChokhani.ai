# SanskritiChokhani.ai

Personal portfolio adapted from the `gxa/new-style` branch of [GAInTheHouse/gainthehouse.com](https://github.com/GAInTheHouse/gainthehouse.com/tree/gxa/new-style), reference revision `ce4d5fba93fbd33f913dd079542c29b68abaab65`.

## Structure

The authored site follows the reference's static `public/` structure:

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

No dependencies or build step are required. Deployment remains deferred. No Firebase project, analytics credentials, or automatic deployment workflows have been copied from the source owner.

## Content

Edit `public/data/` to update projects, experience, education, skills, and career highlights. JSON uses the reference's collection keys (`projects`, `experiences`, `education`, `categories`), with portfolio-specific fields documented in `DATA_SCHEMA.md`. Highlights use a separate file because they represent supplied business results rather than inferred counts.

Only sections supported by Sanskriti's supplied material are included. Unused reference articles, organizations, hobbies, legacy Bootstrap/jQuery, test pages, and other people's assets are omitted. Project and work descriptions retain the existing local rich-text `body` field, rendered by the dialog, rather than the reference's plain-text `description` array. This deliberate extension preserves the current detailed stories; do not put untrusted HTML in these fields.

Design and Inter font provenance: reference branch above. All personal content comes from the supplied resume and Columbia coursework context. The original downloadable resume is unchanged. No deployment has occurred.
