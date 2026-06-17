import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { FeedRecord } from "./CardFeedsAdmin";
import {
  Stepper, TextInput, Select, Checkbox, LabelTag, Button, Icon,
} from "@medius-expense/design-system";
import type { StepDef } from "@medius-expense/design-system";
import { PageHeader } from "@medius-expense/design-system";
import AdminLayout from "../components/AdminLayout";
import styles from "./AddCardFeed.module.css";

const FAKE_BANKS = [
  "BNP Paribas - France", "ING - Netherlands", "Barclays - United Kingdom",
  "Deutsche Bank - Germany", "Santander - Spain", "Nordea - Sweden",
];

const FUNDING_OPTIONS = [
  { value: "company-funds",  label: "Company funds"  },
  { value: "employee-funds", label: "Employee funds" },
];

export default function AddCardFeed() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const locState     = location.state as { feed?: FeedRecord; feeds?: FeedRecord[]; prefillBin?: string } | null;
  const editingFeed  = locState?.feed;
  const existingFeeds: FeedRecord[] = locState?.feeds ?? [];
  const prefillBin   = locState?.prefillBin ?? "";

  /* ── Per-step form state — init from editing feed if resuming, or prefill from first screen ── */
  const [bin,            setBin]            = useState(editingFeed?.formData.bin ?? prefillBin);
  const [fundingType,    setFundingType]    = useState(editingFeed?.formData.fundingType ?? "");
  const [consentChecked, setConsentChecked] = useState(editingFeed?.formData.consentChecked ?? false);
  const [companyId,      setCompanyId]      = useState(editingFeed?.formData.companyId ?? "");

  /* ── Saved summaries (shown when step is done) ── */
  const [savedBin,         setSavedBin]         = useState(editingFeed?.formData.bin ?? prefillBin);
  const [savedFundingType, setSavedFundingType] = useState(editingFeed?.formData.fundingType ?? "");
  const [detectedName,     setDetectedName]     = useState(
    editingFeed?.name ?? (prefillBin ? FAKE_BANKS[Math.floor(Math.random() * FAKE_BANKS.length)] : "")
  );

  // If a BIN was pre-filled from the first screen, step 0 is already validated — start at step 1
  const [activeStep, setActiveStep] = useState(editingFeed?.savedStep ?? (prefillBin ? 1 : 0));
  const [copied,     setCopied]     = useState(false);
  const [isLoading,  setIsLoading]  = useState(false);
  const [isSaving,   setIsSaving]   = useState(false);

  const STEP_DELAYS = [2000, 500, 700, 1500];

  /* ── Navigation ── */
  function handleBack() {
    if (activeStep === 0) navigate("/admin/payment/card-feeds", { state: { feeds: existingFeeds.length ? existingFeeds : undefined } });
    else setActiveStep((s) => s - 1);
  }

  function formatNetwork(b: string) {
    const scheme = Math.random() < 0.5 ? "VISA" : "MC";
    const first4 = b.slice(0, 4);
    const next2  = b.slice(4, 6);
    return `${scheme} ${first4} ${next2}••`;
  }

  function buildFeed(status: FeedRecord["status"]): FeedRecord {
    const binStr       = savedBin || bin;
    const isImporting  = status === "importing";
    const cardsEnrolled = isImporting ? Math.floor(Math.random() * 401) + 100 : editingFeed?.cardsEnrolled;
    const importOutcome = isImporting
      ? (Math.random() < 0.75 ? "action-required" : "live") as "action-required" | "live"
      : editingFeed?.importOutcome;
    const unmatched = importOutcome === "action-required"
      ? Math.floor(Math.random() * 9) + 1
      : 0;
    const fundingLabel = fundingType === "company-funds" ? "Company funds" : fundingType === "employee-funds" ? "Employee funds" : undefined;

    return {
      id:           editingFeed?.id ?? `feed-${binStr}`,
      name:         detectedName || `Card feed – ${binStr}`,
      network:      editingFeed?.network ?? formatNetwork(binStr),
      cards:        "-",
      lastSync:     "-",
      status,
      savedStep:    activeStep,
      formData: {
        bin:            savedBin || bin,
        fundingType:    savedFundingType || fundingType,
        consentChecked,
        companyId,
      },
      importOutcome,
      cardsEnrolled,
      unmatched,
      fundsType:    fundingLabel ?? editingFeed?.fundsType,
      connectedOn:  isImporting ? "Jun 13, 2026" : editingFeed?.connectedOn,
    };
  }

  function goToList(status: FeedRecord["status"]) {
    const updated = buildFeed(status);
    const feeds = editingFeed
      ? existingFeeds.map((f) => (f.id === updated.id ? updated : f))
      : [...existingFeeds, updated];
    if (status === "importing") {
      navigate(`/admin/payment/card-feeds/${updated.id}`, { state: { feed: updated, feeds } });
    } else {
      navigate("/admin/payment/card-feeds", { state: { feeds } });
    }
  }

  function handleNext() {
    setIsLoading(true);
    setTimeout(() => {
      if (activeStep === 0) {
        setSavedBin(bin);
        if (!detectedName) setDetectedName(FAKE_BANKS[Math.floor(Math.random() * FAKE_BANKS.length)]);
      }
      if (activeStep === 1) setSavedFundingType(fundingType);
      if (activeStep === 3) { goToList("importing"); return; }
      setActiveStep((s) => s + 1);
      setIsLoading(false);
    }, STEP_DELAYS[activeStep]);
  }

  function handleSaveAndFinishLater() {
    setIsSaving(true);
    setTimeout(() => goToList("pending"), 600);
  }

  /* ── Email template ── */
  const emailTemplate = `I'm writing to request the setup of a VISA commercial card data feed for our card program starting with ${savedBin || "______"}, to be sent to our spend management platform Medius Expense powered by Astrada.\n\nPlease configure this feed and send us the company identifier once it's active.`;

  function handleCopy() {
    navigator.clipboard.writeText(emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const fundingLabel = FUNDING_OPTIONS.find((o) => o.value === savedFundingType)?.label ?? "";

  /* ── Validation ── */
  const isStep0Valid = bin.length >= 6 && bin.length <= 8 && /^\d+$/.test(bin);
  const isStep1Valid = Boolean(fundingType);
  const isStep3Valid = Boolean(companyId.trim());

  /* ── Step definitions ── */
  const steps: StepDef[] = [
    {
      title: "Check eligibility",
      description: "Enter the first 6 to 8 digits of any card in your program to check if a real-time feed is available.",
      children:
        activeStep === 0 ? (
          <TextInput
            label="BIN"
            required
            helpIcon
            placeholder="e.g. 456789"
            value={bin}
            maxLength={8}
            onChange={(e) => setBin(e.target.value.replace(/\D/g, ""))}
          />
        ) : (
          <LabelTag
            label="Real-time network feed available for this card program."
            variant="green"
            size="small"
            icon={<Icon name="navigation--check" size="small" />}
          />
        ),
    },
    {
      title: "Funding type",
      description: "Who pays the card bill? This applies to all cards imported from this feed.",
      children:
        activeStep === 1 ? (
          <Select
            label="Funding type"
            required
            placeholder="Select funding type…"
            options={FUNDING_OPTIONS}
            value={fundingType}
            onChange={setFundingType}
          />
        ) : (
          <LabelTag
            label={fundingLabel}
            variant="green"
            size="small"
            icon={<Icon name="navigation--check" size="small" />}
          />
        ),
      lockedMessage: "Complete step 1 first",
    },
    {
      title: "Consent",
      description: "Confirm your company has the necessary cardholder consent to enroll cards on their behalf.",
      children:
        activeStep === 2 ? (
          <div className={styles.consentBox}>
            <div className={styles.consentCheckboxRow}>
              <Checkbox
                checked={consentChecked}
                onChange={setConsentChecked}
              />
              <p className={styles.consentText}>
                By checking this box, I confirm that my company has obtained the necessary consent from
                individual cardholders, in accordance with applicable law, allowing VISA and Mastercard to
                access and share their transaction details with Medius Expense and my company to support their
                participation in expense management. Cardholders may withdraw their consent at any time by
                following the opt-out process.
              </p>
            </div>
          </div>
        ) : (
          <LabelTag
            label="Confirmed"
            variant="green"
            size="small"
            icon={<Icon name="navigation--check" size="small" />}
          />
        ),
      lockedMessage: "Complete step 2 first",
    },
    {
      title: "Enable corporate card feed",
      description: "Contact your bank to activate the feed, then enter the company identifier they provide.",
      children: (
        <div className={styles.enableSection}>
          <div className={styles.subSection}>
            <p className={styles.subTitle}>Step 1 - Send a request to your bank</p>
            <div className={styles.emailTemplate}>
              <div className={styles.emailHeader}>
                <span className={styles.emailHeaderLabel}>Email template</span>
                <Button
                  hierarchy="secondary"
                  size="small"
                  iconOnly
                  aria-label={copied ? "Copied!" : "Copy email template"}
                  onClick={handleCopy}
                >
                  <Icon name="content--copy" size="small" />
                </Button>
              </div>
              <div className={styles.emailDivider} />
              <p className={styles.emailBody}>{emailTemplate}</p>
            </div>
          </div>
          <div className={styles.subSection}>
            <div className={styles.subTitleBlock}>
              <p className={styles.subTitle}>Step 2 - Enter your company identifier</p>
              <p className={styles.subSubtitle}>
                Your bank will send this once the feed is configured on their side. You can save and come back later.
              </p>
            </div>
            <TextInput
              label="Company identifier"
              required
              placeholder="Enter company identifier…"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            />
          </div>
        </div>
      ),
      lockedMessage: "Complete step 3 first",
    },
  ];

  /* ── Per-step config ── */
  const nextLabels   = ["Check eligibility", "Continue", "Continue", "Finish"];
  const nextDisabled = [!isStep0Valid, !isStep1Valid, !consentChecked, !isStep3Valid];

  return (
    <AdminLayout activeSection="payment" activeItem="card-feeds" flush>
          <div className={styles.page}>
            <PageHeader
              breadcrumbs={[
                { label: "Admin",      onClick: () => navigate("/admin") },
                { label: "Card feeds", onClick: () => navigate("/admin/payment/card-feeds", { state: { feeds: existingFeeds.length ? existingFeeds : undefined } }) },
                { label: editingFeed ? editingFeed.name : "New feed" },
              ]}
            />
            <div className={styles.body}>
              <div className={styles.intro}>
                <h1 className={styles.title}>{editingFeed ? `Edit: ${editingFeed.name}` : "Add a card feed"}</h1>
                <p className={styles.subtitle}>Connect a corporate card program from your bank to Medius Expense.</p>
              </div>

              <Stepper
                className={styles.stepper}
                steps={steps}
                activeStep={activeStep}
                onBack={handleBack}
                onNext={handleNext}
                nextLabel={nextLabels[activeStep]}
                nextDisabled={nextDisabled[activeStep]}
                nextLoading={isLoading}
                secondaryLabel={activeStep >= 1 && activeStep <= 3 ? "Save" : undefined}
                secondaryIcon={activeStep >= 1 && activeStep <= 3 ? <Icon name="content--save" size="small" /> : undefined}
                onSecondary={activeStep >= 1 && activeStep <= 3 ? handleSaveAndFinishLater : undefined}
                secondaryLoading={isSaving}
              />
            </div>
          </div>
    </AdminLayout>
  );
}
