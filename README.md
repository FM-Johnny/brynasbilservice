# Brynäs Bilservice

Website and booking system for Brynäs Bilservice — a local car repair shop in Gävle, Sweden.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Database**: MySQL/MariaDB
- **Deployment**: GitHub Actions (SSH + tar over SSH)
- **Hosting**: VPS at 194.14.207.224

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

## Database

### Connection Details

| Field    | Value                        |
| -------- | ---------------------------- |
| Host     | localhost (via SSH tunnel)   |
| Port     | 3306                         |
| Database | fenrirm_brynasbilservice     |
| Username | fenrirm_brynasbilservice     |

### SSH Tunnel (for local development)

The database is hosted on the remote server. To connect locally, set up an SSH tunnel:

```bash
ssh -i ~/.ssh/id_ed25519 -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224
```

This forwards your local port `3306` to the remote MySQL server. Once active, you can connect to the database at `127.0.0.1:3306`.

### Schema

The database schema is defined in [`database/schema.sql`](database/schema.sql). It includes:

- **customers** — Customer details (name, email, phone)
- **bookings** — Booking records linked to customers (service, date, time, status)
- **services** — Available services with descriptions and pricing

To apply the schema on the server:

```bash
mysql -u fenrirm_brynasbilservice -p fenrirm_brynasbilservice < database/schema.sql
```

## Deployment

Deployment is automated via GitHub Actions on every push to `main`.

### GitHub Secrets Required

| Secret           | Description                                      |
| ---------------- | ------------------------------------------------ |
| `DEPLOY_SSH_KEY` | Private SSH key (ed25519) for server access      |
| `DEPLOY_HOST`    | Server IP address                                |
| `DEPLOY_PORT`    | SSH port (default: 22)                           |
| `DEPLOY_USER`    | SSH username                                     |
| `DEPLOY_PATH`    | Absolute path to the web root on the server      |

### Manual Deploy Trigger

You can also trigger a deploy manually from the GitHub Actions tab using `workflow_dispatch`.

## Project Structure

```bash
src/
├── assets/          # Images and static assets
├── components/
│   ├── icons/       # Reusable SVG icon components
│   ├── layout/      # Header, Footer
│   ├── sections/    # Page sections (Hero, Services, About, etc.)
│   └── ui/          # Reusable UI components (Button, SectionHeader)
├── css/             # Stylesheets
└── App.tsx          # Main app component
database/
└── schema.sql       # Database schema
.github/
└── workflows/
    └── deploy.yml   # CI/CD pipeline
```
