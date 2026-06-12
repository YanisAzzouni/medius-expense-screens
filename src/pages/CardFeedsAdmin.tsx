import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, Select, LabelTag, Icon } from "@medius-expense/design-system";
import type { StepDef } from "@medius-expense/design-system";
import { PageHeader } from "@medius-expense/design-system";
import styles from "./CardFeedsAdmin.module.css";

const DIMENSION_OPTIONS = [
  { value: "dimension-1", label: "Dimension 1" },
  { value: "dimension-2", label: "Dimension 2" },
  { value: "dimension-3", label: "Dimension 3" },
  { value: "dimension-4", label: "Dimension 4" },
  { value: "dimension-5", label: "Dimension 5" },
];

export default function CardFeedsAdmin() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep]         = useState(0);
  const [dimension, setDimension]           = useState("");
  const [savedDimension, setSavedDimension] = useState("");

  function handleValidate() {
    setSavedDimension(dimension);
    setActiveStep(1);
  }

  function handleBack() {
    setActiveStep(0);
  }

  function handleAddFeed() {
    navigate("/admin/payment/card-feeds/new");
  }

  const dimensionLabel = DIMENSION_OPTIONS.find((o) => o.value === dimension)?.label ?? "";
  const savedLabel     = DIMENSION_OPTIONS.find((o) => o.value === savedDimension)?.label ?? "";

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
            helpText
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
          nextIcon={activeStep === 1 ? <Icon name="content--add" size="small" /> : undefined}
        />
      </div>
    </div>
  );
}
