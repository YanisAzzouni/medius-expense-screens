import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stepper, TextInput, Select, Checkbox, LabelTag, Button, Icon,
} from "@medius-expense/design-system";
import type { StepDef } from "@medius-expense/design-system";
import { PageHeader } from "@medius-expense/design-system";
import AppLayout from "../components/AppLayout";
import { AdminPanel } from "@medius-expense/design-system";
import styles from "./AddCardFeed.module.css";
import adminStyles from "./AdminScreen.module.css";

const FUNDING_OPTIONS = [
  { value: "company-funds",  label: "Company funds"  },
  { value: "employee-funds", label: "Employee funds" },
];

export default function AddCardFeed() {
  const navigate = useNavigate();

  /* ── Per-step form state ── */
  const [bin,            setBin]            = useState("");
  const [fundingType,    setFundingType]    = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [companyId,      setCompanyId]      = useState("");

  /* ── Saved summaries (shown when step is done) ── */
  const [savedBin,         setSavedBin]         = useState("");
  const [savedFundingType, setSavedFundingType] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const [copied,     setCopied]     = useState(false);

  /* ── Navigation ── */
  function handleNavigate(sectionKey: string, itemKey?: string) {
    navigate(`/admin/${sectionKey}${itemKey ? `/${itemKey}` : ""}`);
  }

  function handleBack() {
    if (activeStep === 0) navigate("/admin/payment/card-feeds");
    else setActiveStep((s) => s - 1);
  }

  function handleNext() {
    if (activeStep === 0) setSavedBin(bin);
    if (activeStep === 1) setSavedFundingType(fundingType);
    setActiveStep((s) => s + 1);
  }

  function handleSaveAndFinishLater() {
    navigate("/admin/payment/card-feeds");
  }

  function handleFinish() {
    navigate("/admin/payment/card-feeds");
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
            color="green"
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
            helpText
            placeholder="Select funding type…"
            options={FUNDING_OPTIONS}
            value={fundingType}
            onChange={setFundingType}
          />
        ) : (
          <LabelTag
            label={fundingLabel}
            color="green"
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
            color="green"
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
          {/* Sub-step 1 */}
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

          {/* Sub-step 2 */}
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
  const nextLabels    = ["Check eligibility", "Continue", "Continue", "Finish"];
  const nextDisabled  = [!isStep0Valid, !isStep1Valid, !consentChecked, !isStep3Valid];

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
                { label: "Card feeds", onClick: () => navigate("/admin/payment/card-feeds") },
                { label: "New feed" },
              ]}
            />
            <div className={styles.body}>
              <div className={styles.intro}>
                <h1 className={styles.title}>Add a card feed</h1>
                <p className={styles.subtitle}>Connect a corporate card program from your bank to Medius Expense.</p>
              </div>

              <Stepper
                className={styles.stepper}
                steps={steps}
                activeStep={activeStep}
                onBack={handleBack}
                onNext={activeStep === 3 ? handleFinish : handleNext}
                nextLabel={nextLabels[activeStep]}
                nextDisabled={nextDisabled[activeStep]}
                secondaryActionLabel={activeStep === 3 ? "Save and finish later" : undefined}
                onSecondaryAction={activeStep === 3 ? handleSaveAndFinishLater : undefined}
              />
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
