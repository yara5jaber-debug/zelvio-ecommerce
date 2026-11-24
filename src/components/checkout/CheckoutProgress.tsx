
type CheckoutStep = 1 | 2 | 3;

type CheckoutProgressProps = {
  currentStep: CheckoutStep;
};

const steps = [
  {
    number: 1,
    label: "Address",
    mobileLabel: "Address",
  },
  {
    number: 2,
    label: "Shipping & Payment",
    mobileLabel: "Shipping",
  },
  {
    number: 3,
    label: "Review",
    mobileLabel: "Review",
  },
] as const;

export default function CheckoutProgress({
  currentStep,
}: CheckoutProgressProps) {
  return (
    <nav
      aria-label="Checkout progress"
      className="mb-8 border-b border-border pb-7 sm:mb-10 sm:pb-8"
    >
      <ol className="grid grid-cols-3 gap-2 sm:gap-4">
        {steps.map(
          ({ number, label, mobileLabel }) => {
            const isCompleted = number < currentStep;
            const isCurrent = number === currentStep;

            return (
              <li
                key={number}
                aria-current={
                  isCurrent ? "step" : undefined
                }
                className="min-w-0"
              >
                <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                      isCurrent
                        ? "border-accent bg-accent text-white"
                        : isCompleted
                          ? "border-foreground bg-foreground text-white"
                          : "border-border text-text-secondary",
                    ].join(" ")}
                  >
                    {isCompleted ? (
                      <span aria-label="Completed">
                        ✓
                      </span>
                    ) : (
                      number
                    )}
                  </span>

                  <div className="min-w-0">
                    <p
                      className={[
                        "text-[9px] font-bold uppercase tracking-wider sm:text-[10px]",
                        isCurrent
                          ? "text-accent"
                          : "text-text-secondary",
                      ].join(" ")}
                    >
                      STEP 0{number}
                    </p>

                    <p
                      className={[
                        "mt-1 text-[11px] font-semibold leading-4 sm:text-xs",
                        isCurrent
                          ? "text-foreground"
                          : "text-text-secondary",
                      ].join(" ")}
                    >
                      <span className="sm:hidden">
                        {mobileLabel}
                      </span>

                      <span className="hidden sm:inline">
                        {label}
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  className={[
                    "mt-4 h-0.5 w-full",
                    number <= currentStep
                      ? "bg-accent"
                      : "bg-border",
                  ].join(" ")}
                />
              </li>
            );
          }
        )}
      </ol>

      <p
        className="mt-4 text-xs text-text-secondary"
        aria-live="polite"
      >
        Step {currentStep} of 3
      </p>
    </nav>
  );
}
