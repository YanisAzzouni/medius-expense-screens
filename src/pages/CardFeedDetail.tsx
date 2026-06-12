import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { FeedRecord } from "./CardFeedsAdmin";
import { PageHeader, Banner, Button, Icon, DataTable, StatusTag, FeedTile, AdminPanel } from "@medius-expense/design-system";
import AppLayout from "../components/AppLayout";
import adminStyles from "./AdminScreen.module.css";
import styles from "./CardFeedDetail.module.css";

/* ─── Fake unmatched card data ───────────────────────────────────────────── */

const FAKE_CARDHOLDERS = [
  { id: "u1", cardholder: "Sarah Chen",    last4: "7821" },
  { id: "u2", cardholder: "Marcus Webb",   last4: "3456" },
  { id: "u3", cardholder: "Priya Sharma",  last4: "9012" },
  { id: "u4", cardholder: "Tom Eriksen",   last4: "1847" },
  { id: "u5", cardholder: "Ana Costa",     last4: "6234" },
  { id: "u6", cardholder: "David Park",    last4: "5509" },
  { id: "u7", cardholder: "Emma Wilson",   last4: "4128" },
  { id: "u8", cardholder: "Liam Nguyen",   last4: "8763" },
  { id: "u9", cardholder: "Fatima Al-Ali", last4: "2291" },
];

const UNMATCHED_COLUMNS = [
  { key: "card",       type: "text" as const,    title: "Card number", fill: true },
  { key: "cardholder", type: "text" as const,    title: "Card holder"             },
  { key: "status",     type: "status" as const,  title: "Status"                  },
  { key: "action",     type: "actions" as const, title: "Action"                  },
];

/* ─── Network logo URLs ──────────────────────────────────────────────────── */

const VISA_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Visa_2014_logo_detail.svg/2560px-Visa_2014_logo_detail.svg.png";
const MC_LOGO   = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png";

function networkLogo(scheme: string) {
  if (scheme === "VISA") return { logoSrc: VISA_LOGO, logoAlt: "VISA" };
  if (scheme === "MC")   return { logoSrc: MC_LOGO,   logoAlt: "Mastercard" };
  return { logoSrc: undefined, logoAlt: scheme };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function CardFeedDetail() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const locState  = location.state as { feed: FeedRecord; feeds: FeedRecord[] } | null;
  const [feed,  setFeed]  = useState<FeedRecord>(locState?.feed!);
  const [feeds, setFeeds] = useState<FeedRecord[]>(locState?.feeds ?? []);

  function handleNavigate(sectionKey: string, itemKey?: string) {
    navigate(`/admin/${sectionKey}${itemKey ? `/${itemKey}` : ""}`);
  }

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

  const unmatchedRows = FAKE_CARDHOLDERS.slice(0, feed.unmatched ?? 0).map((r) => ({
    id:          r.id,
    card:        `${networkScheme} •••• ${r.last4}`,
    cardholder:  r.cardholder,
    status:      { label: "Unmatched", variant: "orange" as const },
    action:      { icon: "social--person-add", label: "Assign to employee", onClick: () => {} },
  }));

  return (
    <AppLayout>
      <div className={adminStyles.body}>
        <AdminPanel
          companyName="Medius AB"
          activeSection="payment"
          activeItem="card-feeds"
          onNavigate={handleNavigate}
        />
        <main className={adminStyles.content_flush}>
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
                <Banner type="warning" title={`${feed.unmatched} card${feed.unmatched !== 1 ? "s" : ""} could not be matched`}>
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
                  <div className={styles.stateIcon}>
                    <Icon name="alerts--check-circle" size="large" />
                  </div>
                  <div className={styles.stateBody}>
                    <p className={styles.stateTitle}>Your card feed is live and receiving transactions</p>
                    <p className={styles.stateSubtitle}>
                      All {feed.cardsEnrolled} cards are matched to employees and transactions are syncing
                      in real time. You can review payment instruments or check incoming transactions below.
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
        </main>
      </div>
    </AppLayout>
  );
}
