import figma from "@figma/code-connect";
import { NavBar } from "./Navbar";

/* ─── Navigation bar (48:5411) ─── */
figma.connect(
  NavBar,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=48-5411",
  {
    // The outer Navigation bar component has no Figma variant properties.
    // Tab visibility is controlled by sub-component props.
    example: () => (
      <NavBar
        activeItem="dashboard"
        userInitials="YA"
        showRequests={false}
        showManager={false}
        showMediusCard={false}
        showAdmin={false}
        showAccountant={false}
        onNavigate={() => {}}
        onUserClick={() => {}}
      />
    ),
  }
);
