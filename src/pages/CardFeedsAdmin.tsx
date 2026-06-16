import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, LabelTag, Icon, DataTable, PageHeader, Button, TextInput } from "@medius-expense/design-system";
import type { StepDef, StatusTagVariant } from "@medius-expense/design-system";
import styles from "./CardFeedsAdmin.module.css";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type FeedStatus = "pending" | "importing" | "live" | "action-required";

export interface FeedRecord {
  id: string;
  name: string;
  network: string;
  cards: string;
  lastSync: string;
  status: FeedStatus;
  savedStep: number;
  formData: {
    bin: string;
    fundingType: string;
    consentChecked: boolean;
    companyId: string;
  };
  importOutcome?: "action-required" | "live";
  cardsEnrolled?: number;
  unmatched?: number;
  fundsType?: string;
  connectedOn?: string;
}

/* ─── Status helpers ─────────────────────────────────────────────────────── */

const STATUS_MAP: Record<FeedStatus, { label: string; variant: StatusTagVariant }> = {
  "pending":         { label: "Pending",         variant: "grey"   },
  "importing":       { label: "Importing",        variant: "blue"   },
  "live":            { label: "Live",             variant: "green"  },
  "action-required": { label: "Action required",  variant: "orange" },
};

/* ─── Table columns ──────────────────────────────────────────────────────── */

const FEED_COLUMNS = [
  { key: "name",     type: "text" as const, title: "Feed name", fill: true },
  { key: "network",  type: "text" as const, title: "Network"               },
  { key: "cards",    type: "text" as const, title: "Cards",   size: "S" as const },
  { key: "lastSync", type: "text" as const, title: "Last sync"             },
  { key: "status",   type: "status" as const, title: "Status", sortable: true },
];

/* ─── Feeds list view ────────────────────────────────────────────────────── */

function CardFeedsList({ feeds, onAddFeed, onReset, onRowClick }: {
  feeds: FeedRecord[];
  onAddFeed: () => void;
  onReset: () => void;
  onRowClick: (id: string) => void;
}) {
  const navigate = useNavigate();

  const rows = feeds.map((f) => ({
    id:       f.id,
    name:     f.name,
    network:  f.network,
    cards:    f.cards,
    lastSync: f.lastSync,
    status:   STATUS_MAP[f.status],
  }));

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: "Admin", onClick: () => navigate("/admin") },
          { label: "Card feeds" },
        ]}
        actions={[{
          label: "Add feed",
          icon: <Icon name="content--add" size="small" />,
          onClick: onAddFeed,
        }]}
      />
      <div className={styles.listBody}>
        <div className={styles.listSection}>
          <h2 className={styles.sectionTitle}>Connected cards</h2>
          <DataTable columns={FEED_COLUMNS} rows={rows} onRowClick={onRowClick} />
        </div>
        <div className={styles.devReset}>
          <Button hierarchy="tertiary" appearance="danger" icon={<Icon name="actions--delete" size="small" />} onClick={onReset}>
            Reset to empty state
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Setup wizard ───────────────────────────────────────────────────────── */

type SetupPhase =
  | "eligibility"       // step 1 active
  | "unlock"            // step 2 active
  | "unlock-waiting"    // step 2 waiting (activation requested)
  | "add-feed";         // step 3 active

export default function CardFeedsAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase]           = useState<SetupPhase>("eligibility");
  const [bin, setBin]               = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const incomingFeeds: FeedRecord[] | undefined = (location.state as { feeds?: FeedRecord[] })?.feeds;

  if (incomingFeeds?.length) {
    const handleRowClick = (id: string) => {
      const feed = incomingFeeds.find((f) => f.id === id);
      if (!feed) return;
      if (feed.status === "pending") {
        navigate("/admin/payment/card-feeds/new", { state: { feed, feeds: incomingFeeds } });
      } else {
        navigate(`/admin/payment/card-feeds/${feed.id}`, { state: { feed, feeds: incomingFeeds } });
      }
    };
    return (
      <CardFeedsList
        feeds={incomingFeeds}
        onAddFeed={() => navigate("/admin/payment/card-feeds/new", { state: { feeds: incomingFeeds } })}
        onReset={() => navigate("/admin/payment/card-feeds", { state: { feeds: [] } })}
        onRowClick={handleRowClick}
      />
    );
  }

  /* ── Step 1: check eligibility ── */
  function handleCheckEligibility() {
    setIsChecking(true);
    setTimeout(() => {
      setPhase("unlock");
      setIsChecking(false);
    }, 1200);
  }

  /* ── Step 2: request activation ── */
  function handleRequestActivation() {
    setIsRequesting(true);
    setTimeout(() => {
      setPhase("unlock-waiting");
      setIsRequesting(false);
    }, 1000);
  }

  /* ── Dev: simulate activation received ── */
  function handleSimulateActivation() {
    setPhase("add-feed");
  }

  /* ── Step 3: navigate to add feed ── */
  function handleAddFeed() {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/admin/payment/card-feeds/new");
    }, 900);
  }

  const activeStep =
    phase === "eligibility"    ? 0 :
    phase === "unlock"         ? 1 :
    phase === "unlock-waiting" ? 1 :
    2;

  const steps: StepDef[] = [
    {
      title: "Check eligibility",
      description: "Enter the first 6 to 8 digits of any card in your program to check if a real-time feed is available.",
      children: phase === "eligibility" ? (
        <TextInput
          label="BIN"
          required
          placeholder="e.g. 412345"
          value={bin}
          onChange={(e) => setBin(e.target.value)}
        />
      ) : (
        <LabelTag
          label="Real-time network feed available for this card program."
          variant="green"
          icon={<Icon name="navigation--check" size="small" />}
        />
      ),
    },
    {
      title: "Unlock card feeds",
      description: "Card feeds are available as a plan upgrade. Your account manager will be notified to reach out and get you set up.",
      waiting: phase === "unlock-waiting",
      lockedMessage: "Complete step 1 first",
      children: phase === "add-feed" ? (
        <LabelTag
          label="Account activated"
          variant="green"
          icon={<Icon name="navigation--check" size="small" />}
        />
      ) : phase === "unlock-waiting" ? (
        <LabelTag
          label="Activation requested · Your account manager will reach out within 1–2 business days"
          variant="yellow"
          icon={<Icon name="actions--hourglass-full" size="small" />}
        />
      ) : undefined,
    },
    {
      title: "Add your first card feed",
      description: "Connect your first VISA or Mastercard corporate program to start importing cards and transactions.",
      lockedMessage: "Complete step 2 first",
    },
  ];

  const nextLabel =
    phase === "eligibility"    ? "Check eligibility" :
    phase === "unlock"         ? "Request activation" :
    "Add first feed";

  const nextDisabled = phase === "eligibility" && bin.trim().length < 6;
  const nextLoading  =
    phase === "eligibility" ? isChecking :
    phase === "unlock"      ? isRequesting :
    isNavigating;

  const nextIcon =
    phase === "eligibility" ? undefined :
    phase === "unlock"      ? undefined :
    <Icon name="content--add" size="small" />;

  const onBack =
    phase === "unlock"      ? () => setPhase("eligibility") :
    phase === "add-feed"    ? () => setPhase("unlock")      :
    undefined;

  const onNext =
    phase === "eligibility"    ? handleCheckEligibility  :
    phase === "unlock"         ? handleRequestActivation  :
    phase === "unlock-waiting" ? undefined :
    handleAddFeed;

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: "Admin", onClick: () => navigate("/admin") },
          { label: "Card feeds" },
        ]}
      />
      <div className={styles.body}>
        {/* ── Hero card ── */}
        <div className={styles.heroCard}>
          <Icon name="actions--credit-card" size="large" className={styles.heroIcon} />
          <div className={styles.heroText}>
            <h2 className={styles.heroTitle}>Connect your existing corporate cards to Medius</h2>
            <p className={styles.heroSubtitle}>
              Card feeds let you import your company's corporate card transactions directly into Medius Expense,
              in real time, with no manual file exports. Keep your existing bank relationship and card pricing
              while getting full expense visibility.
            </p>
          </div>
        </div>

        {/* ── "Get started" heading ── */}
        <div className={styles.intro}>
          <h1 className={styles.title}>Get started</h1>
          <p className={styles.subtitle}>Complete these steps to connect your first card</p>
        </div>

        <Stepper
          className={styles.stepper}
          steps={steps}
          activeStep={activeStep}
          onBack={onBack}
          onNext={onNext}
          nextLabel={nextLabel}
          nextDisabled={nextDisabled}
          nextLoading={nextLoading}
          nextIcon={nextIcon}
        />

        {/* ── Dev buttons ── */}
        {phase === "unlock-waiting" && (
          <div className={styles.devAction}>
            <Button
              hierarchy="tertiary"
              appearance="danger"
              icon={<Icon name="av--play-arrow" size="small" />}
              onClick={handleSimulateActivation}
            >
              Simulate activation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
