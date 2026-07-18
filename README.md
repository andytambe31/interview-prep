# Interview Prep — Amazon SDE Final Loop Command Center

A single-user web app to run Raveena's Amazon **Software Development Engineer (SDE I)**
final loop prep end to end: schedule & logistics, a coding-problem tracker, a
Leadership-Principles STAR story bank, a researched playbook, and a resource/to-do list.

- **Stack:** React + Vite + Tailwind CSS
- **Data:** everything is saved in your browser's **localStorage** (single user, no backend)
- **Hosting:** built and published to **GitHub Pages** by a GitHub Actions workflow on every push to `main`

## Features

| Section | What it does |
| --- | --- |
| **Dashboard** | Countdown, coding progress, LP coverage, next actions at a glance |
| **Schedule & Logistics** | Confirmed date, the 4 rounds, LiveCode link, travel, lunch buddy, availability sent |
| **Coding Prep** | ~80 high-frequency Amazon SDE-I problems grouped by topic, with status (to do / attempted / solved), a 0–5 confidence rating, per-problem notes, and filters. Flags 🔥 high-frequency questions. |
| **Leadership Principles** | All 16 LPs with commonly-asked questions and a per-LP readiness rating, plus a **STAR story bank** where each story maps to multiple LPs and coverage is tracked. |
| **Insights & Playbook** | Researched "what to expect": loop structure, LiveCode, the Bar Raiser, STAR the Amazon way, coding scoring signals, difficulty split, a 2-week study plan, day-of tips, timeline, rejection red flags, and Boston-office notes. |
| **Resources & To-Dos** | A categorized link library and a prioritized to-do list with due dates. |

Reference content (problem list, LPs, playbook) is seeded from research and can be
refreshed with **Sync content** without losing your progress. Use **Export / Import**
to back up your data as JSON.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deploying to GitHub Pages

Deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
every push to `main` builds the app and publishes `dist/` to GitHub Pages. No build
output is committed to the repo.

**One-time Pages setting** (Settings → Pages → Build and deployment):

- **Source:** **GitHub Actions**

Then merge to `main` (or push to it) and the workflow builds and deploys the site to
`https://<your-username>.github.io/interview-prep/`. Watch progress under the repo's
**Actions** tab.

The Vite `base` is `/interview-prep/` for the build so asset paths resolve on the
project Pages URL. If you rename the repo, update `base` in
[`vite.config.js`](vite.config.js) to match.

## Notes

- Data lives only in the browser you use — **export regularly** to keep a backup, and
  note that clearing site data will erase your progress.
- The playbook content reflects recurring patterns from firsthand candidate reports and
  official guidance; your recruiter is always the authority on the day's actual agenda.
