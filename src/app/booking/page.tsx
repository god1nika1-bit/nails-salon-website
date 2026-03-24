"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { StepIndicator } from "@/components/booking/StepIndicator";
import { ServiceSelector } from "@/components/booking/ServiceSelector";
import { MasterSelector } from "@/components/booking/MasterSelector";
import { DateTimeSelector } from "@/components/booking/DateTimeSelector";
import { ConfirmationForm } from "@/components/booking/ConfirmationForm";
import { FadeInWhenVisible } from "@/components/ui/motion";

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-sans text-sm text-[var(--brand-text)]/40">Загрузка...</p>
      </main>
    }>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<{
    categoryId: string;
    name: string;
    price: string;
  } | null>(null);
  const [selectedMasterId, setSelectedMasterId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill master from URL query
  useEffect(() => {
    const masterId = searchParams.get("master");
    if (masterId) {
      setSelectedMasterId(masterId);
    }
  }, [searchParams]);

  const canGoNext = () => {
    switch (step) {
      case 1: return selectedService !== null;
      case 2: return true; // null = "any master"
      case 3: return selectedDate !== null && selectedTime !== null;
      default: return false;
    }
  };

  const handleNext = () => {
    if (canGoNext() && step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[var(--brand-pink)]/10 flex items-center justify-center px-6">
        <FadeInWhenVisible>
          <div className="text-center max-w-md bg-white p-12 rounded-3xl" style={{ boxShadow: "0 10px 30px -5px rgba(0,0,0,0.03)" }}>
            <div className="w-16 h-16 rounded-full bg-[var(--brand-pink)]/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-[var(--brand-pink-dark)]" />
            </div>
            <h2 className="font-serif text-3xl text-[var(--brand-text)] mb-4">Заявка отправлена!</h2>
            <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed mb-8">
              Мы свяжемся с вами для подтверждения записи в ближайшее время. Спасибо, что выбрали ЛАЙК НЭЙЛС!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setSelectedService(null);
                setSelectedMasterId(null);
                setSelectedDate(null);
                setSelectedTime(null);
              }}
              className="px-8 py-3 border border-[var(--brand-pink)] text-[var(--brand-text)] rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[var(--brand-pink)] transition-colors"
            >
              Новая запись
            </button>
          </div>
        </FadeInWhenVisible>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-12 pb-8 px-6 md:px-20 bg-[var(--brand-surface)] border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--brand-text)] mb-8 text-center">
            Онлайн-Запись
          </h1>
          <StepIndicator currentStep={step} />
        </div>
      </section>

      {/* Step Content */}
      <section className="px-6 md:px-20 py-12">
        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <ServiceSelector
              selectedService={selectedService}
              onSelect={(s) => setSelectedService(s)}
            />
          )}
          {step === 2 && (
            <MasterSelector
              categoryId={selectedService?.categoryId || null}
              selectedMasterId={selectedMasterId}
              onSelect={(id) => setSelectedMasterId(id)}
            />
          )}
          {step === 3 && (
            <DateTimeSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={setSelectedDate}
              onSelectTime={setSelectedTime}
            />
          )}
          {step === 4 && (
            <ConfirmationForm
              service={selectedService}
              masterId={selectedMasterId}
              date={selectedDate}
              time={selectedTime}
              onSubmit={() => setSubmitted(true)}
            />
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="px-6 md:px-20 pb-12">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full font-sans text-xs uppercase tracking-widest text-gray-500 hover:border-[var(--brand-text)] hover:text-[var(--brand-text)] transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
          >
            <ArrowLeft size={14} />
            Назад
          </button>

          {step < 4 && (
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="flex items-center gap-2 px-8 py-3 bg-[var(--brand-text)] text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[var(--brand-pink)] hover:text-[var(--brand-text)] transition-colors disabled:opacity-30"
            >
              Далее
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
