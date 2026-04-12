# Contributing to Plant Power Hub

Welcome to the team! This guide covers how we work together as a remote team to keep the codebase clean, conflict-free, and moving fast.

---

## 👥 Team & Module Ownership

Each developer is the **primary owner** of their module. You should not edit files inside another developer's module without first discussing it in the team chat.

| Developer | Module Path | Responsibility |
|-----------|-------------|----------------|
| Dev 1 | `src/modules/inverters/` | Inverter data, RS485 parsing, device metrics |
| Dev 2 | `src/modules/dashboard/` | Dashboard views, charts, KPI widgets |
| Dev 3 | `src/modules/alerts/` | Alerts, notifications, threshold rules |

### ⚠️ Shared Files (Coordinate Before Editing)
These files affect everyone — always **post in team chat** before modifying:

- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`
- `src/routes/` (if added)
- `package.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `tsconfig*.json`

---

## 🌿 Branching Strategy

We follow the **Feature Branch Workflow**:

```
main                    ← Production-ready (protected)
  └── develop           ← Integration & testing (protected)
        ├── feat/inverters-rs485-parsing     ← Dev 1
        ├── feat/dashboard-plant-overview    ← Dev 2
        └── feat/alerts-threshold-rules      ← Dev 3
```

### Branch Naming Convention

```
feat/<module>-<short-description>      # new feature
fix/<module>-<short-description>       # bug fix
refactor/<module>-<short-description>  # code improvement
chore/<short-description>              # build, config, deps
docs/<short-description>               # documentation
```

**Examples:**
```
feat/inverters-rs485-parser
fix/dashboard-chart-rendering
refactor/alerts-threshold-logic
chore/update-dependencies
docs/add-api-reference
```

---

## 📋 Daily Workflow

### 1. Start of Day — Sync with `develop`

```bash
git fetch origin
git checkout your-feature-branch
git rebase origin/develop   # brings in latest changes from the team
```

> 💡 Do this **every morning** to avoid large conflicts at PR time.

### 2. During the Day — Commit Often

```bash
# Stage only your module's files
git add src/modules/inverters/

# Write a clear commit message (see Commit Format below)
git commit -m "feat(inverters): parse RS485 1hr interval data"

# Push regularly to back up your work
git push origin feat/inverters-rs485-parsing
```

### 3. End of Day — Push Everything

```bash
git push origin feat/inverters-rs485-parsing
```

---

## ✍️ Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<module>): <short description>

[optional body]
[optional footer]
```

### Types

| Type | When to Use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code change with no new feature or bug fix |
| `style` | Formatting only (no logic change) |
| `docs` | Documentation changes |
| `test` | Adding or updating tests |
| `chore` | Build process, config, dependencies |
| `data` | Changes to mock data or JSON schemas |

### Examples

```bash
feat(inverters): add current transformer reading component
fix(dashboard): resolve chart overflow on mobile screens
data(inverters): update inverter_rs485_1hr mock with new fields
refactor(alerts): extract threshold logic into custom hook
docs: add API integration notes to README
```

---

## 🔁 Pull Request Process

### Before Opening a PR

```bash
# 1. Sync your branch with develop
git fetch origin
git rebase origin/develop

# 2. Fix any conflicts, then push
git push origin feat/your-branch --force-with-lease

# 3. Run local checks
npm run build      # make sure it compiles
npm run lint       # check for lint errors
npm run test       # run unit tests
```

### Opening the PR

- **Base branch**: Always `develop` (never directly to `main`)
- **Title format**: `feat(inverters): RS485 1hr data parser`
- **Fill out the PR template** completely
- **Request review** from at least 1 other team member

### Review Rules

- PRs must have **1 approval** before merging
- Do not merge your **own** PR
- Address all review comments before merging
- Use **Squash and Merge** when merging feature branches into `develop`

---

## ⚔️ Resolving Conflicts

If you get a conflict during rebase:

```bash
git rebase origin/develop
# Git pauses — open the conflicted file and resolve manually

# After resolving:
git add src/conflicted-file.ts
git rebase --continue

# Push the resolved branch
git push origin feat/your-branch --force-with-lease
```

**Tips to avoid conflicts:**
- Rebase daily (not weekly)
- Keep commits small and focused
- Avoid reformatting files you didn't logically change
- Don't rename/move shared files without team discussion

---

## 🚫 What NOT to Commit

Never commit these files (already covered by `.gitignore`):

| File | Reason |
|------|--------|
| `.env`, `.env.*` | Contains API keys / secrets |
| `CLIENT_SIGNUP_DETAILS.txt` | Private client information |
| `node_modules/` | Auto-installed, not needed in repo |
| `dist/`, `build/` | Generated build artifacts |
| `*.pdf`, `*.docx` | Large binary files |
| `TheVoltaura_OM_Guide_v2.pdf` | Internal document, not for repo |

---

## 🏗️ Local Setup

```bash
# Clone the repo
git clone <repo-url>
cd plant-power-hub

# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Lint check
npm run lint
```

---

## 📁 Project Structure

```
plant-power-hub/
├── .github/
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
├── src/
│   ├── modules/
│   │   ├── inverters/     ← Dev 1 ownership
│   │   ├── dashboard/     ← Dev 2 ownership
│   │   └── alerts/        ← Dev 3 ownership
│   ├── components/        ← Shared UI components
│   ├── hooks/             ← Shared custom hooks
│   ├── lib/               ← Shared utilities
│   ├── pages/             ← Page-level components
│   └── data/              ← Global/shared mock data
├── public/
├── .gitignore
├── CONTRIBUTING.md        ← You are here
├── package.json
└── vite.config.ts
```

---

## 🆘 Getting Help

- **Merge conflict you can't resolve?** → Ask in team chat, share your branch name
- **Need to modify a shared file?** → Post in team chat first, agree on approach
- **Found a bug in another dev's module?** → Open a GitHub Issue, don't fix directly

---

*Last updated: April 2026 — Plant Power Hub Team*
