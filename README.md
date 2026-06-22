# Calcify

Loan EMI calculator with a real-time cross-tab shared workspace and a beautiful, modern Claymorphism UI.

**Live**: [calcify-demo.vercel.app](https://calcify-alpha.vercel.app/)
**Repo**: [github.com/kartikay/calcify](https://github.com/kartikay/calcify)

Multiple tabs share state instantly without a backend. Built with premium Claymorphism UI principles to provide a soft, tactile, and highly responsive user experience.

---

## Features

- **EMI Calculator**: Fluid sliders and inputs synced in real-time, dynamic summary cards, and a principal/interest breakdown bar.
- **Amortization Schedule**: Paginated table with break-even highlights, and a seamless toggle between table and Recharts-based graphical view.
- **Compare Mode**: Side-by-side comparison of up to 3 loan scenarios. The lowest total payable cost is automatically highlighted.
- **Sensitivity Grid**: A 7×7 matrix comparing combinations of interest rates and tenures, highlighting the current loan terms.
- **Prepayment Planner**: Plan lump-sum prepayments on specific months to visualize tenure reduction and total interest saved.
- **Cross-Tab Sync**: Powered by `BroadcastChannel`, all state (loan inputs, modes, prepayments, schedule views) syncs instantly across tabs.
- **Tab Identity**: Each tab gets a unique Tab ID and displays a live count of active, connected tabs.
- **Theme Sync**: Dark/Light mode is elegantly handled and propagates instantly across all connected tabs.
- **Claymorphism UI**: Uses soft inset/outset shadows, pastel/dark complementary colors, dynamic active pills, and micro-animations to mimic a physical, tactile surface.

---

## Tech Stack

- **Next.js 16 (App Router)** · **React 19**
- **TypeScript** · **Tailwind CSS v4**
- **Recharts** (Data Visualization)
- **NumberFlow** (Number animations)
- **BroadcastChannel API** (Cross-tab communication)
- *No backend* · Client-only state sync

---

## Getting Started

```bash
git clone https://github.com/kartikay/calcify.git
cd calcify
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Optional (Production Build):**
```bash
npm run build
npm start
```

*Prerequisites: Node.js 18+*

---

## Cross-Tab Sync Test

To test the cross-tab `BroadcastChannel` synchronization:

1. Open `http://localhost:3000` in **two or more tabs/windows** side-by-side.
2. The navbar will show your unique Tab ID (e.g., `Tab A1B2`) and display **"2 active tabs"**.
3. **Change the loan amount** in Tab 1 → Tab 2 updates instantly.
4. **Toggle Dark Mode** in Tab 1 → Tab 2 flips its theme simultaneously.
5. **Switch to Compare Mode** in Tab 1 → Tab 2 follows the mode switch.
6. **Add a Prepayment** in Tab 1 → The prepayment appears and affects the schedule in Tab 2.
7. **Close Tab 1** → Tab 2's active count drops down to **"1 active tab"**.

---

## Modes & Navigation

- **Single Mode**: `/?tab=single` (default)
- **Compare Mode**: `/?tab=compare`
- **Prepayment Mode**: `/?tab=prepayment`

**Note**: Loading a specific URL parameter initializes that tab's local mode, ensuring it doesn't forcibly hijack the mode of existing tabs until the user manually interacts.

---

## Project Structure

```text
app/
  components/
    calculator/   # Core UI features (EMI, Compare, Prepayment, Amortization)
    navbar/       # Navigation tabs, theme toggle, and live tab identity
  hooks/          # Logic (useLoanSummary, useSharedWorkspace, etc.)
  lib/
    finance/      # Pure math for EMI, amortization, and sensitivity calculations
    workspace/    # Workspace reducer, hydration, and data sanitization
  providers/      # WorkspaceProvider context wrapper
```

---

## Architecture Note

The application achieves zero-backend real-time sync using the following pattern:
- `WorkspaceProvider` holds a globally accessible `WorkspaceState`.
- Any UI interactions invoke `dispatchWorkspace` -> processes via the reducer -> posts to `BroadcastChannel`.
- Remote tabs listen for messages and hydrate state via `HYDRATE_REMOTE_STATE`.
- Presence is maintained via a 2-second heartbeat interval with a 5-second stale prune.

---

## Default Example

Sanity check based on default assignments:
> **₹15,00,000** · **11% p.a.** · **48 months** → EMI ≈ **₹38,768**

---

## Bonus Features Status

| Bonus | Status |
| :--- | :--- |
| **Tab leadership** | Implemented — auto-hydrate without flooding |
| **Cross-tab undo** | Not implemented |
| **CSV export** | Implemented — downloads schedule matching UI |
| **URL state encoding** | Implemented — amount, rate, tenure, tab, prep |

---

## Example shareable links

- [Single Mode: ₹15L, 11%, 48mo](/?tab=single&amount=1500000&rate=11&tenure=48)
- [Prepayment Mode: with ₹100,000 lump sum on month 12](/?tab=prepayment&amount=1500000&rate=11&tenure=48&prep=12:100000)
