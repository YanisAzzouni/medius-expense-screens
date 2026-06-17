import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { FeedRecord } from "./CardFeedsAdmin";
import { PageHeader, Banner, Button, Icon, DataTable, StatusTag, FeedTile } from "@medius-expense/design-system";
import AdminLayout from "../components/AdminLayout";
import { FEED_CARDHOLDERS, CARD_NETWORK_LOGOS } from "../data";
import styles from "./CardFeedDetail.module.css";

/* ─── Table columns ──────────────────────────────────────────────────────── */

const UNMATCHED_COLUMNS = [
  { key: "card",       type: "text" as const,    title: "Card number", fill: true },
  { key: "cardholder", type: "text" as const,    title: "Card holder"             },
  { key: "status",     type: "status" as const,  title: "Status"                  },
  { key: "action",     type: "actions" as const, title: "Action"                  },
];

function networkLogo(scheme: string) {
  if (scheme === "VISA") return { logoSrc: CARD_NETWORK_LOGOS.VISA, logoAlt: "VISA" };
  if (scheme === "MC")   return { logoSrc: CARD_NETWORK_LOGOS.MC,   logoAlt: "Mastercard" };
  return { logoSrc: undefined, logoAlt: scheme };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function CardFeedDetail() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const locState  = location.state as { feed: FeedRecord; feeds: FeedRecord[] } | null;

  // Router state is undefined on direct navigation / refresh — guard against it
  // instead of asserting, so the page degrades gracefully rather than crashing.
  if (!locState?.feed) {
    return (
      <AdminLayout activeSection="payment" activeItem="card-feeds" flush>
        <div className={styles.page}>
          <PageHeader
            breadcrumbs={[
              { label: "Admin",      onClick: () => navigate("/admin") },
              { label: "Card feeds", onClick: () => navigate("/admin/payment/card-feeds") },
            ]}
          />
          <div className={styles.body}>
            <div className={styles.stateCard}>
              <div className={styles.stateIcon}>
                <Icon name="alert--error-outline" size="large" />
              </div>
              <div className={styles.stateBody}>
                <p className={styles.stateTitle}>Feed not found</p>
                <p className={styles.stateSubtitle}>
                  We couldn't load this card feed. Open it from the Card feeds list to view its details.
                </p>
                <div className={styles.stateActions}>
                  <Button hierarchy="secondary" onClick={() => navigate("/admin/payment/card-feeds")}>
                    Back to Card feeds
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return <CardFeedDetailContent initialFeed={locState.feed} initialFeeds={locState.feeds ?? []} />;
}

function CardFeedDetailContent({ initialFeed, initialFeeds }: { initialFeed: FeedRecord; initialFeeds: FeedRecord[] }) {
  const navigate = useNavigate();

  const [feed,  setFeed]  = useState<FeedRecord>(initialFeed);
  const [feeds, setFeeds] = useState<FeedRecord[]>(initialFeeds);

  function handleBack() {
    navigate("/admin/payment/card-feeds", { state: { feeds } });
  }

  function handleFinishImport() {
    const outcome = feed.importOutcome ?? "live";
    const updatedFeed: FeedRecord = {
      ...feed,
      status:   outcome,
      cards:    String(feed.cardsEnrolled ?? 0),
      lastSync: "Today, 09:14",
    };
    const updatedFeeds = feeds.map((f) => (f.id === feed.id ? updatedFeed : f));
    setFeed(updatedFeed);
    setFeeds(updatedFeeds);
  }

  const networkScheme = feed.network.split(" ")[0]; // "VISA" or "MC"

  const isImporting      = feed.status === "importing";
  const isActionRequired = feed.status === "action-required";
  const isLive           = feed.status === "live";

  const unmatchedRows = FEED_CARDHOLDERS.slice(0, feed.unmatched ?? 0).map((r) => ({
    id:          r.id,
    card:        `${networkScheme} •••• ${r.last4}`,
    cardholder:  r.cardholder,
    status:      { label: "Unmatched", variant: "orange" as const },
    action:      { icon: "social--person-add", label: "Assign to employee", onClick: () => {} },
  }));

  return (
    <AdminLayout activeSection="payment" activeItem="card-feeds" flush>
          <div className={styles.page}>
            <PageHeader
              breadcrumbs={[
                { label: "Admin",      onClick: () => navigate("/admin") },
                { label: "Card feeds", onClick: handleBack },
                { label: feed.name },
              ]}
              actions={[
                { label: "Payment instruments", hierarchy: "secondary" },
              ]}
            />

            <div className={styles.body}>
              <div className={styles.inner}>
              {/* ── Feed header ── */}
              <div className={styles.feedHeader}>
                <div className={styles.feedTitles}>
                  <h1 className={styles.feedName}>{feed.name}</h1>
                  <span className={styles.feedNetwork}>{feed.network}</span>
                </div>
                <StatusTag
                  label={
                    isImporting      ? "Importing"        :
                    isActionRequired ? "Action required"  : "Live"
                  }
                  variant={
                    isImporting      ? "blue"   :
                    isActionRequired ? "orange" : "green"
                  }
                />
              </div>

              {/* ── Banner (action required only) ── */}
              {isActionRequired && (
                <Banner variant="warning" title={`${feed.unmatched} card${feed.unmatched !== 1 ? "s" : ""} could not be matched`}>
                  We imported {feed.cardsEnrolled} cards but couldn't match {feed.unmatched} to an employee in Medius.
                  Review the unmatched cards below and assign them manually.
                </Banner>
              )}

              {/* ── Stats bar ── */}
              {!isImporting && (
                <div className={styles.tilesRow}>
                  <FeedTile
                    label="Cards enrolled"
                    variant="number"
                    value={feed.cardsEnrolled ?? 0}
                  />
                  <FeedTile
                    label="Unmatched"
                    variant="number"
                    value={feed.unmatched ?? 0}
                    numberColor={(feed.unmatched ?? 0) === 0 ? "success" : "default"}
                  />
                  <FeedTile
                    label="Connected on"
                    variant="text"
                    value={feed.connectedOn ?? "—"}
                  />
                  <FeedTile
                    label="Last sync"
                    variant="text"
                    value={feed.lastSync === "-" ? "—" : feed.lastSync}
                  />
                  <FeedTile
                    label="Funds"
                    variant="text"
                    value={feed.fundsType ?? "—"}
                  />
                  <FeedTile
                    label="Network"
                    variant="network"
                    {...networkLogo(networkScheme)}
                  />
                </div>
              )}

              {/* ── Importing state ── */}
              {isImporting && (
                <>
                  <div className={styles.stateCard}>
                    <div className={styles.stateIcon}>
                      <Icon name="av--loop" size="large" />
                    </div>
                    <div className={styles.stateBody}>
                      <p className={styles.stateTitle}>Importing cards from your bank</p>
                      <p className={styles.stateSubtitle}>
                        We're pulling in all cards from your {networkScheme} corporate program and matching
                        them to employees. This can take a few minutes to a few days.
                      </p>
                      <div className={styles.stateActions}>
                        <Button hierarchy="secondary" onClick={handleBack}>Back to Card feeds</Button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.devAction}>
                    <Button
                      hierarchy="tertiary"
                      appearance="danger"
                      icon={<Icon name="av--play-arrow" size="small" />}
                      onClick={handleFinishImport}
                    >
                      Finish import
                    </Button>
                  </div>
                </>
              )}

              {/* ── Action required — unmatched table ── */}
              {isActionRequired && (
                <>
                  <DataTable columns={UNMATCHED_COLUMNS} rows={unmatchedRows} />
                  <div className={styles.devAction}>
                    <Button
                      hierarchy="tertiary"
                      appearance="danger"
                      icon={<Icon name="social--person-add" size="small" />}
                      onClick={() => {
                        const updatedFeed: FeedRecord = { ...feed, status: "live", unmatched: 0 };
                        setFeed(updatedFeed);
                        setFeeds(feeds.map((f) => (f.id === feed.id ? updatedFeed : f)));
                      }}
                    >
                      Match all cards
                    </Button>
                  </div>
                </>
              )}

              {/* ── Live state ── */}
              {isLive && (
                <div className={styles.stateCard}>
                  <div className={`${styles.stateIcon} ${styles.stateIcon_live}`}>
                    <Icon name="alerts--check-circle" size="large" style={{ width: 72, height: 72 }} />
                  </div>
                  <div className={styles.stateBody}>
                    <p className={styles.stateTitle}>Your card feed is live and all cards are matched</p>
                    <p className={styles.stateSubtitle}>
                      All {feed.cardsEnrolled} cards have been imported, <strong>payment instruments</strong> have
                      been created, and each card has been matched to the right employee. Transactions are now
                      syncing in real time.
                    </p>
                    <div className={styles.stateActions}>
                      <Button hierarchy="secondary">Payment instruments</Button>
                      <Button hierarchy="secondary">Transactions</Button>
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
    </AdminLayout>
  );
}
