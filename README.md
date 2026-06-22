# Calcify

Loan EMI calculator where multiple browser tabs share state in real-time via `BroadcastChannel` no backend, no polling.

**Live**: [calcify-alpha.vercel.app](https://calcify-alpha.vercel.app/)

## Features

- **EMI Calculator** — synced slider + number inputs, EMI / total interest / total payable, principal-interest ratio bar.
- **Amortization Schedule** — paginated table, break-even row highlight, table/chart toggle (Recharts).
- **Compare Mode** — up to 3 scenarios side by side; lowest total payable highlighted.
- **Sensitivity Grid** — 7×7 rate × tenure EMI matrix, current cell highlighted, memoized.
- **Prepayment Planner** — reduce-tenure strategy, shows new tenure + interest saved.
- **Cross-Tab Sync** — all state (inputs, scenarios, prepayments, mode, theme) syncs instantly across tabs.
- **Tab Identity** — unique Tab ID + live active-tab count via heartbeat/presence.
- **Theme Sync** — claymorphism inspired UI dark/light toggle propagates to all tabs; persisted across refresh.

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Recharts · NumberFlow · BroadcastChannel API. No backend.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requires Node.js 18+.

## Cross-Tab Sync Test

1. Open the app in two tabs side by side — navbar shows each Tab ID and "2 active tabs".
2. Change loan amount in Tab 1 → Tab 2 updates instantly.
3. Toggle theme / switch mode / add a prepayment in Tab 1 → Tab 2 mirrors it.
4. Close Tab 1 → Tab 2 count drops to "1 active tab".

## Architecture

- `WorkspaceProvider` holds global `WorkspaceState`.
- UI actions → `dispatchWorkspace` → reducer → posts to `BroadcastChannel`.
- Remote tabs hydrate via `HYDRATE_REMOTE_STATE`. Last-write-wins on conflicts.
- Presence: 2s heartbeat, 5s stale prune.
- **Source of truth (leaderless)**: a new tab posts `request_state` on mount; any existing tab replies with `state_offer`, so the new tab adopts the current workspace instead of defaults. Since every tab can answer, there is no single leader to lose — closing tabs never breaks hydration.

```text
app/
  components/   # UI: calculator (EMI, compare, prepayment, amortization), navbar
  hooks/        # useSharedWorkspace, useAmortization, etc.
  lib/          # finance math, workspace reducer + sanitization, url/export utils
  providers/    # WorkspaceProvider
```

## Default Example

₹15,00,000 · 11% p.a. · 48 months → EMI ≈ ₹38,768, total interest ≈ ₹3,60,878.

## Bonus features

| Bonus | Status |
| :--- | :--- |
| Tab leadership (leaderless source of truth) | Done |
| CSV export | Done |
| URL state encoding | Done |

## Shareable Link Examples

- [Single: ₹15L, 11%, 48mo](https://calcify-alpha.vercel.app/?tab=single&amount=1500000&rate=11&tenure=48)
- [Prepayment: ₹1L on month 12](https://calcify-alpha.vercel.app/?tab=prepayment&amount=1500000&rate=11&tenure=48&prep=12:100000)
