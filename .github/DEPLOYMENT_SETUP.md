# Deploy SanskritiChokhani.ai to Firebase Hosting

## What was adapted

- Firebase project: `sanskritichokhani-ai`, verified against the local service account's `project_id`. The project ID and both workflow secret references consistently target this portfolio.
- GitHub repository: `Sans-commits101/SanskritiChokhani.ai`.
- Production branch: `main`, matching the local `origin/HEAD`. The working branch is `codex/portfolio-new-style`.
- This is a static HTML/CSS/JavaScript site with JSON content. Firebase Hosting serves `public/` directly; no npm install, build command, Firebase browser SDK, database, or SPA rewrite is needed. Navigation uses page anchors.
- The existing service account JSON is already in `.secrets/` with owner-only file permissions (0600); no key is currently present in `public/`. Both Git ignores and Hosting exclusions were added. `.gitignore` alone does **not** control Firebase uploads or a local HTTP server.
- `scripts/check-site.py` checks local asset references, JSON syntax, and recognizable credential material in `public/`. It also rejects credential-like filenames and symlinks. Both workflows run it; Firebase also runs it before deployment. It is a practical guard, not a comprehensive secret scanner.

## 1. Confirm Firebase Hosting and permissions

Open the [Firebase console](https://console.firebase.google.com/project/sanskritichokhani-ai/hosting). Confirm the project ID in Project settings is `sanskritichokhani-ai`. Open **Build → Hosting** (not App Hosting) and complete any initial setup prompts. These files assume the project's default Hosting site; confirm its site ID is `sanskritichokhani-ai` before continuing. A different or additional site needs an explicit Hosting site/target configuration.

You already have a service account key, so you do not need to generate another simply to follow this guide. In [Google Cloud IAM](https://console.cloud.google.com/iam-admin/iam?project=sanskritichokhani-ai), locate the account identified by `client_email` in your local key. Confirm its deployment permissions. The action's documented roles are Firebase Hosting Admin (`roles/firebasehosting.admin`) and API Keys Viewer (`roles/serviceusage.apiKeysViewer`); preview Auth-domain updates also require Firebase Authentication Admin (`roles/firebaseauth.admin`). Cloud Run Viewer is only relevant to server rewrites, which this site does not use. See the [official action service-account instructions](https://github.com/FirebaseExtended/action-hosting-deploy/blob/main/docs/service-account.md).

Generating an Admin SDK key does not prove it has Hosting permissions. If the existing account is broadly privileged, a dedicated deployment account with these relevant roles is preferable. Do not add Owner or Editor just to fix a deploy error. Account permissions and Hosting provisioning have not been verified remotely.

## 2. Add the existing key to GitHub Actions secrets

Open this repository's [Actions secrets settings](https://github.com/Sans-commits101/SanskritiChokhani.ai/settings/secrets/actions). Choose **New repository secret**:

- Name: `FIREBASE_SERVICE_ACCOUNT_SANSKRITICHOKHANI_AI`
- Value: the entire JSON document from `.secrets/sanskritichokhani-ai-firebase-adminsdk-fbsvc-1598e3ba92.json`, including braces. Paste it as JSON, without base64 encoding or extra surrounding quotes.

Save the secret. Never paste it into a workflow, site source, issue, or log. GitHub provides `GITHUB_TOKEN` automatically; do not create that secret yourself. The [Firebase action reference](https://github.com/FirebaseExtended/action-hosting-deploy#options) explains these inputs.

Under **Settings → Actions → General**, ensure GitHub Actions and the `actions/checkout` and `FirebaseExtended/action-hosting-deploy` actions are permitted. The preview job requests write permissions for checks and PR comments. Repository or organization policies can restrict them.

If this key was previously committed or served by a public deployment/server, revoke it in Google Cloud and replace the GitHub secret with a new key. Moving it now cannot revoke an exposed key.

## 3. Validate and push this branch

From the repository root, with Python 3.9 or newer:

```sh
python3 scripts/check-site.py
git status --short
git diff --check
git add .gitignore .firebaserc firebase.json .github/ scripts/check-site.py README.md public/index.html
git diff --cached --stat
git commit -m "Configure Firebase Hosting and GitHub deployments"
git push -u origin codex/portfolio-new-style
```

Review the staged file list before committing; `.secrets/` must not appear. The staging command covers the deployment changes; ensure any future website changes under `public/` are also intentionally committed when deploying them.

Open a pull request from `codex/portfolio-new-style` into `main`. Wait for **Validate and preview Firebase pull request**. For a same-repository PR, the action posts a temporary preview URL. Check the rendered sections, project dialogs, mobile navigation, portrait, and resume download there. Previews expire seven days after their last deployment and are publicly accessible. Fork and Dependabot PRs run validation but skip secret-backed preview deployment. Give repository write access only to trusted collaborators because their same-repository workflows can access deployment secrets.

No separate GitHub webhook or local Git hook is required: the workflow event triggers are the CI/CD integration. See [Firebase's GitHub integration guide](https://firebase.google.com/docs/hosting/github-integration).

## 4. Publish production

Merge the reviewed PR into `main`. Every push to `main`, including a merge, runs **Deploy Firebase production**. A failed validation prevents that run from deploying. Live deployments are serialized; PR previews use separate channels.

Open the repository's [Actions page](https://github.com/Sans-commits101/SanskritiChokhani.ai/actions) and confirm the production job succeeds. For the assumed default site, visit [the Firebase website](https://sanskritichokhani-ai.web.app). Confirm `/data/projects.json` loads, the resume downloads, and an unknown path returns a 404. The old credential URL should also return 404; do not upload the key to test this.

Once the workflow exists on `main`, you can use **Actions → Deploy Firebase production → Run workflow → main** to redeploy. The workflow refuses production deployment from another branch. Consider protecting `main` with PR review and the `validate` status check after its first run.

For future updates: edit content, commit to a branch, open a PR, inspect the preview, then merge. To roll back persistently, revert the problematic commit through a PR and merge it. Firebase Hosting release history also offers an immediate rollback; a later CI deployment will publish the Git version again.

## 5. Connect SanskritiChokhani.ai (optional)

After the Firebase URL works, choose **Add custom domain** in Hosting and enter `sanskritichokhani.ai`. At your domain registrar/DNS provider, add exactly the verification and routing records Firebase supplies. Add `www.sanskritichokhani.ai` separately if desired and choose whether it redirects to the apex domain. Preserve unrelated mail records. Wait until Firebase reports the domain connected and HTTPS certificate ready, then verify HTTPS in a browser. Follow the [Firebase custom-domain guide](https://firebase.google.com/docs/hosting/custom-domain); DNS values depend on your setup and are not hard-coded here.

The footer Portfolio link now points to `#home`, so it works on local, preview, Firebase, and custom-domain URLs without sending visitors to a domain that is not connected yet.

## Optional local Firebase preview or manual deployment

GitHub Actions installs its own deployment tooling; local Node/Firebase CLI installation is optional. To use the commands below, first install a supported Node.js release and the Firebase CLI using the [official CLI setup instructions](https://firebase.google.com/docs/cli#install_the_firebase_cli). Python 3.9+ is also required for this repository's predeploy check.

```sh
firebase login
firebase projects:list
python3 scripts/check-site.py
firebase emulators:start --only hosting --project sanskritichokhani-ai
```

Open the localhost URL printed by the emulator. A deliberate manual production deploy is:

```sh
firebase deploy --only hosting --project sanskritichokhani-ai
```

That command publishes the current local `public/`, including uncommitted site changes; use the CI route for reviewed production releases. You do not need to rerun `firebase init` or `firebase init hosting:github`: the project and workflows are already configured, and initialization can overwrite them.

## Troubleshooting and verification limits

- **Missing/invalid service-account JSON:** workflows stop with a setup message when the secret is missing; check the exact secret name and paste the complete JSON into the repository secret.
- **403 / permission denied:** check that the key's account belongs to the intended project, the key is active, and the documented IAM roles are assigned. Enable a required API only if the failure identifies it.
- **Site/project not found:** confirm Hosting setup, default site ID, and `sanskritichokhani-ai` in `.firebaserc` and both workflows.
- **PR comment denied:** inspect organization Actions policies and the preview job's `pull-requests: write` permission; the action logs may still contain the preview URL.
- **No production run:** production listens to `main`, not the feature branch or the copied `master` branch. Manual dispatch also requires `main`.
- **Credential guard fails:** move the identified file outside `public/`; do not disable the guard.

Local checks do not verify Google IAM, the saved GitHub secret, remote action execution, DNS, or a live release. No deployment, Git push, or remote settings change was performed while preparing this configuration.

### Local review results

The site validator and `git diff --check` passed. Both workflow files parsed as YAML. Isolated fixtures verified rejection of service-account content, credential-like filenames, malformed JSON, missing assets, file symlinks, and a symlinked public root; a nested HTML page with valid relative assets passed. The existing key is Git-ignored and has mode 0600. These checks do not execute GitHub Actions or authenticate to Firebase.
