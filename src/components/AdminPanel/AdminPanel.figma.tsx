import figma from "@figma/code-connect";
import { AdminPanel } from "./AdminPanel";

/* ─── Admin panel (52:1130) ─── */
figma.connect(
  AdminPanel,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=52-1130",
  {
    // The outer Admin panel component has no Figma variant properties.
    // Section visibility and selection are controlled via props.
    example: () => (
      <AdminPanel
        companyName="Company name"
        activeSection="users-access"
        activeItem="users"
        onNavigate={() => {}}
      />
    ),
  }
);
