import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Select, LabelTag, Icon, DataTable, PageHeader, Button } from "@medius-expense/design-system";
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

/* ─── Constants ──────────────────────────────────────────────────────────── */

const DIMENSION_OPTIONS = [
  { value: "dimension-1", label: "Dimension 1" },
  { value: "dimension-2", label: "Dimension 2" },
  { value: "dimension-3", label: "Dimension 3" },
  { value: "dimension-4", label: "Dimension 4" },
  { value: "dimension-5", label: "Dimension 5" },
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

export default function CardFeedsAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeStep, setActiveStep]         = useState(0);
  const [dimension, setDimension]           = useState("");
  const [savedDimension, setSavedDimension] = useState("");
  const [isValidating, setIsValidating]     = useState(false);
  const [isNavigating, setIsNavigating]     = useState(false);

  const incomingFeeds: FeedRecord[] | undefined = (location.state as { feeds?: FeedRecord[] })?.feeds;

  if (incomingFeeds?.length) {
    const handleRowClick = (id: string) => {
      const feed = incomingFeeds!.find((f) => f.id === id);
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

  function handleValidate() {
    setIsValidating(true);
    setTimeout(() => {
      setSavedDimension(dimension);
      setActiveStep(1);
      setIsValidating(false);
    }, 1200);
  }

  function handleBack() { setActiveStep(0); }

  function handleAddFeed() {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/admin/payment/card-feeds/new");
    }, 900);
  }

  const savedLabel = DIMENSION_OPTIONS.find((o) => o.value === savedDimension)?.label ?? "";

  const steps: StepDef[] = [
    {
      title: "Configure employee ID field",
      description:
        "Before setting up your first card feed, tell us where employee IDs are stored in Medius. We'll use this to automatically match imported cards to the right employees.",
      children:
        activeStep === 0 ? (
          <Select
            label="Employee ID"
            required
            placeholder="Select a dimension…"
            options={DIMENSION_OPTIONS}
            value={dimension}
            onChange={setDimension}
          />
        ) : (
          <LabelTag
            label={`Configured in: ${savedLabel}`}
            color="green"
            size="small"
            icon={<Icon name="navigation--check" size="small" />}
          />
        ),
    },
    {
      title: "Add your first card feed",
      description: "Connect a VISA or Mastercard corporate program from your bank.",
      lockedMessage: "Complete step 1 first",
    },
  ];

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: "Admin", onClick: () => navigate("/admin") },
          { label: "Card feeds" },
        ]}
      />
      <div className={styles.body}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Get started</h1>
          <p className={styles.subtitle}>Complete these steps to connect your first card</p>
        </div>
        <Stepper
          className={styles.stepper}
          steps={steps}
          activeStep={activeStep}
          onBack={activeStep > 0 ? handleBack : undefined}
          onNext={activeStep === 0 ? handleValidate : handleAddFeed}
          nextLabel={activeStep === 0 ? "Validate" : "Add feed"}
          nextDisabled={activeStep === 0 && !dimension}
          nextLoading={isValidating || isNavigating}
          nextIcon={activeStep === 1 ? <Icon name="content--add" size="small" /> : undefined}
        />
      </div>
    </div>
  );
}
