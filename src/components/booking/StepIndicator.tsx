import { Check } from "lucide-react";

const STEPS = ["Услуга", "Мастер", "Дата и время", "Подтверждение"];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {STEPS.map((label, idx) => {
        const step = idx + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={label} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs transition-colors ${
                  isCompleted
                    ? "bg-[var(--brand-pink)] text-[var(--brand-text)]"
                    : isActive
                    ? "bg-[var(--brand-text)] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? <Check size={14} /> : step}
              </div>
              <span
                className={`hidden md:inline font-sans text-xs transition-colors ${
                  isActive ? "text-[var(--brand-text)] font-medium" : "text-[var(--brand-text)]/40"
                }`}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-8 md:w-12 h-px transition-colors ${
                  isCompleted ? "bg-[var(--brand-pink-dark)]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
