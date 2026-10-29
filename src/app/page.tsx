'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  Share2,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  Check,
  Menu,
  X,
  ExternalLink,
  Info,
  AlertTriangle,
  ArrowRight,
  Copy,
} from 'lucide-react';

interface ChecklistItem {
  id: number;
  number: number;
  title: string;
  detail: string;
  category: string;
}

const CHECKLIST_DATA: {
  category: string;
  subtitle: string;
  items: { num: number; title: string; body: string }[];
}[] = [
  {
    category: 'BEFORE ANYTHING GOES WRONG',
    subtitle: '4 foundational records to safeguard before any defect arises.',
    items: [
      {
        num: 1,
        title: 'Keep the invoice.',
        body: 'Save the original bill and a photo or PDF copy. The warranty normally starts on the invoice date.',
      },
      {
        num: 2,
        title: 'Register the product.',
        body: 'Many brands ask you to register on their website or app; some add extra warranty when you do.',
      },
      {
        num: 3,
        title: 'Read the warranty card once.',
        body: 'Note how long it lasts, what it covers, and what it excludes.',
      },
      {
        num: 4,
        title: 'Record the condition.',
        body: 'Take a few dated photos of the product once it is installed or unboxed.',
      },
    ],
  },
  {
    category: 'WHEN THE FAULT APPEARS',
    subtitle: 'Immediate steps to document evidence and lock in written records.',
    items: [
      {
        num: 5,
        title: 'Record the fault.',
        body: 'Take a clear photo or short video of the problem as soon as you see it, with the date visible if you can.',
      },
      {
        num: 6,
        title: 'Raise the complaint in writing.',
        body: "Use email, the brand's website or its app, not only a phone call, so there is a record.",
      },
      {
        num: 7,
        title: 'Note every reference number.',
        body: 'Write down the complaint or ticket number, the date and the name of anyone you speak to.',
      },
    ],
  },
  {
    category: 'WHEN A TECHNICIAN VISITS',
    subtitle: 'On-site verification essentials to preserve official diagnosis proof.',
    items: [
      {
        num: 8,
        title: 'Ask for the job sheet.',
        body: 'Ask the technician for a copy of the visit report or job sheet before they leave.',
      },
      {
        num: 9,
        title: 'Ask what was tested.',
        body: 'Ask which test or instrument was used to reach the diagnosis.',
      },
      {
        num: 10,
        title: 'Take your own photos.',
        body: 'Photograph the product and anything the technician points to, during the visit.',
      },
    ],
  },
  {
    category: 'IF THE CLAIM IS REFUSED',
    subtitle: 'The escalation protocol to dispute refusals with calm, factual evidence.',
    items: [
      {
        num: 11,
        title: 'Ask for the reason in writing.',
        body: 'Request a written explanation that names the exact cause and the evidence for it.',
      },
      {
        num: 12,
        title: 'Ask for the technical report.',
        body: 'If the refusal rests on an inspection, ask for that inspection report.',
      },
      {
        num: 13,
        title: 'Escalate inside the company.',
        body: 'Most brands list a grievance or escalation contact on their website. Write to it, quoting your complaint number.',
      },
      {
        num: 14,
        title: 'Keep it factual.',
        body: 'Stick to dates, documents and photos. Calm, written records are what a consumer forum or regulator will look at.',
      },
      {
        num: 15,
        title: 'Know your consumer helpline.',
        body: 'Most countries run a free consumer helpline or online complaint portal that can guide you on the next step.',
      },
    ],
  },
];

export default function LandingPage() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Toggle item check status
  const toggleItem = (num: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Download checklist text file
  const handleDownload = () => {
    const content = `CLAIM READY
A free checklist for anyone about to file a warranty claim.

THE IDEA IN ONE LINE:
A warranty claim is decided on records. Keep yours, and ask for theirs in writing.

WHO THIS IS FOR:
Anyone whose phone, TV, laptop or appliance stopped working while it is still under warranty, and who wants the claim to be decided on facts, in writing.

BEFORE ANYTHING GOES WRONG:
1. Keep the invoice. Save the original bill and a photo or PDF copy. The warranty normally starts on the invoice date.
2. Register the product. Many brands ask you to register on their website or app; some add extra warranty when you do.
3. Read the warranty card once. Note how long it lasts, what it covers, and what it excludes.
4. Record the condition. Take a few dated photos of the product once it is installed or unboxed.

WHEN THE FAULT APPEARS:
5. Record the fault. Take a clear photo or short video of the problem as soon as you see it, with the date visible if you can.
6. Raise the complaint in writing. Use email, the brand's website or its app, not only a phone call, so there is a record.
7. Note every reference number. Write down the complaint or ticket number, the date and the name of anyone you speak to.

WHEN A TECHNICIAN VISITS:
8. Ask for the job sheet. Ask the technician for a copy of the visit report or job sheet before they leave.
9. Ask what was tested. Ask which test or instrument was used to reach the diagnosis.
10. Take your own photos. Photograph the product and anything the technician points to, during the visit.

IF THE CLAIM IS REFUSED:
11. Ask for the reason in writing. Request a written explanation that names the exact cause and the evidence for it.
12. Ask for the technical report. If the refusal rests on an inspection, ask for that inspection report.
13. Escalate inside the company. Most brands list a grievance or escalation contact on their website. Write to it, quoting your complaint number.
14. Keep it factual. Stick to dates, documents and photos. Calm, written records are what a consumer forum or regulator will look at.
15. Know your consumer helpline. Most countries run a free consumer helpline or online complaint portal that can guide you on the next step.

KEY NUMBERS:
- 15 steps in the checklist.
- 4 records to keep before anything goes wrong.
- 1 rule: if it is not in writing, it did not happen.

FOOTER NOTE:
Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country's consumer rules.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'claim-ready-checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Checklist downloaded successfully! Keep it with your records.');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Claim Ready — Warranty Claim Checklist',
      text: 'A free checklist for anyone about to file a warranty claim. Decided on facts, in writing.',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully!');
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard! Share it with a friend.');
      }
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
      showToast('Checklist copy sent to your email!');
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-on-surface antialiased selection:bg-primary-soft-2 selection:text-primary-ink">
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-secondary px-5 py-3.5 text-white shadow-float transition-all"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-bright text-secondary">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </aside>
      )}

      {/* 1. TICKER STRIP */}
      <aside aria-label="Announcements" className="relative z-50 w-full overflow-hidden border-b border-primary-border bg-primary-soft py-3">
        <div className="flex w-max animate-ticker whitespace-nowrap">
          <div className="flex items-center gap-10 pr-10 text-[10px] font-medium tracking-[0.16em] text-primary-ink uppercase font-mono">
            <span>CLAIM READY</span>
            <span>•</span>
            <span>WARRANTY CLAIM CHECKLIST</span>
            <span>•</span>
            <span>DECIDED ON FACTS, IN WRITING</span>
            <span>•</span>
            <span>15 ACTIONABLE STEPS</span>
            <span>•</span>
            <span>KEEP YOUR INVOICES</span>
            <span>•</span>
            <span>ALWAYS ASK FOR THE JOB SHEET</span>
            <span>•</span>
            <span>FREE CONSUMER RESOURCE</span>
            <span>•</span>
            <span>IF IT IS NOT IN WRITING, IT DID NOT HAPPEN</span>
          </div>
          <div className="flex items-center gap-10 pr-10 text-[10px] font-medium tracking-[0.16em] text-primary-ink uppercase font-mono" aria-hidden="true">
            <span>CLAIM READY</span>
            <span>•</span>
            <span>WARRANTY CLAIM CHECKLIST</span>
            <span>•</span>
            <span>DECIDED ON FACTS, IN WRITING</span>
            <span>•</span>
            <span>15 ACTIONABLE STEPS</span>
            <span>•</span>
            <span>KEEP YOUR INVOICES</span>
            <span>•</span>
            <span>ALWAYS ASK FOR THE JOB SHEET</span>
            <span>•</span>
            <span>FREE CONSUMER RESOURCE</span>
            <span>•</span>
            <span>IF IT IS NOT IN WRITING, IT DID NOT HAPPEN</span>
          </div>
        </div>
      </aside>

      {/* 2. STICKY HEADER */}
      <header className="sticky top-0 z-40 h-[72px] w-full border-b border-outline bg-white/92 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-full max-w-shell items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-card transition-transform group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[18px] font-extrabold tracking-[-0.035em] text-on-surface-strong">
                CLAIM READY
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#who-this-is-for"
              className="text-[15px] font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              Who This Is For
            </a>
            <a
              href="#checklist"
              className="text-[15px] font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              Checklist
            </a>
            <a
              href="#key-numbers"
              className="text-[15px] font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              Key Numbers
            </a>
            <a
              href="#cta"
              className="text-[15px] font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              Action
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="hidden items-center gap-3 sm:flex">
            <button
              onClick={handleDownload}
              className="group inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-[13.5px] font-medium text-on-secondary shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:bg-primary"
            >
              <Download className="h-4 w-4" />
              <span>Download Checklist</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-outline text-on-surface-strong md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-outline bg-white px-6 py-6 shadow-float md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#who-this-is-for"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-on-surface-strong"
              >
                Who This Is For
              </a>
              <a
                href="#checklist"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-on-surface-strong"
              >
                The 15 Steps
              </a>
              <a
                href="#key-numbers"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-on-surface-strong"
              >
                Key Numbers
              </a>
              <a
                href="#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-on-surface-strong"
              >
                Download & Share
              </a>
              <div className="pt-2">
                <button
                  onClick={() => {
                    handleDownload();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full bg-primary px-5 py-3 text-center text-[15px] font-semibold text-white shadow-raised"
                >
                  Download Checklist
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* 3. HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column (55%) */}
              <div className="flex flex-col items-start lg:col-span-7">
                {/* Pill label */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3.5 py-1.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="label-pill-text text-primary-ink">
                    CLAIM READY • FREE CHECKLIST
                  </span>
                </div>

                {/* Hero Headline */}
                <h1 className="headline-display mt-6 text-on-surface-strong">
                  A free checklist for anyone about to file a warranty claim.
                </h1>

                {/* Lead paragraph */}
                <p className="body-lead mt-6 max-w-[62ch]">
                  Anyone whose phone, TV, laptop or appliance stopped working while it is still under warranty,
                  and who wants the claim to be decided on facts, in writing.
                </p>

                {/* Interactive tracker pill */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface-muted px-4 py-2 text-[13.5px] font-medium text-on-surface-variant">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span>
                      Checklist progress: <strong>{completedCount} of 15</strong> verified
                    </span>
                  </div>
                  {completedCount > 0 && (
                    <button
                      onClick={() => setCheckedItems({})}
                      className="text-[12px] font-mono text-on-surface-muted underline hover:text-error"
                    >
                      Reset checks
                    </button>
                  )}
                </div>

                {/* Hero CTA buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-white shadow-raised transition-all duration-200 hover:-translate-y-[2px] hover:bg-primary-strong"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Checklist</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded-full border border-outline bg-white px-6 py-3.5 text-[15px] font-semibold text-on-surface-strong shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:bg-surface-muted"
                  >
                    <Printer className="h-4 w-4 text-on-surface-variant" />
                    <span>Print Records</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-full border border-outline bg-white px-5 py-3.5 text-[15px] font-semibold text-on-surface-strong shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:bg-surface-muted"
                  >
                    <Share2 className="h-4 w-4 text-on-surface-variant" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Evidence Card (~45%) */}
              <div className="w-full lg:col-span-5">
                <div className="relative rounded-[26px] border border-outline bg-white p-6 shadow-raised md:p-8">
                  {/* Card top bar */}
                  <div className="flex items-center justify-between border-b border-outline pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="label-pill-text text-primary-ink">WARRANTY FILE #08-2026</div>
                        <div className="text-[13.5px] font-semibold text-on-surface-strong">Official Record Log</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary-ink">
                      ACTIVE VERIFICATION
                    </span>
                  </div>

                  {/* Body quote & document preview */}
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[12px] border border-primary-border bg-primary-soft p-4">
                      <p className="text-[13px] font-mono uppercase text-primary-ink">
                        CORE PRINCIPLE:
                      </p>
                      <p className="mt-1 text-[14.5px] font-semibold text-primary-ink">
                        &ldquo;A warranty claim is decided on records. Keep yours, and ask for theirs in writing.&rdquo;
                      </p>
                    </div>

                    <div className="rounded-[12px] border border-outline bg-surface-2 p-4 text-[13.5px] text-on-surface-variant">
                      <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-muted uppercase">
                        <span>Required Proof Stack</span>
                        <span className="text-primary font-bold">4 of 4 Verified</span>
                      </div>
                      <ul className="mt-2.5 space-y-2 text-[13px]">
                        <li className="flex items-center gap-2 text-on-surface">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>Original invoice / PDF copy stored</span>
                        </li>
                        <li className="flex items-center gap-2 text-on-surface">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>Product registration completed</span>
                        </li>
                        <li className="flex items-center gap-2 text-on-surface">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>Warranty card duration & exclusions noted</span>
                        </li>
                        <li className="flex items-center gap-2 text-on-surface">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>Dated photos of unboxing & condition</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-[12px] font-mono text-on-surface-muted">
                      <span>Ref: Consumer Protection Standard</span>
                      <span className="text-primary font-medium">100% Free Public Guide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE IDEA IN ONE LINE — HEADLINE CARD */}
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
            <div className="relative overflow-hidden rounded-[26px] bg-secondary p-8 md:p-14 text-white shadow-raised scanline-bg border border-white/10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-primary-bright">
                  THE IDEA IN ONE LINE
                </span>
              </div>

              <blockquote className="mt-6 font-mono text-[24px] sm:text-[32px] md:text-[38px] font-medium leading-[1.25] tracking-tight text-white">
                &ldquo;A warranty claim is decided on records. Keep yours, and ask for theirs in writing.&rdquo;
              </blockquote>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] font-mono text-white/70">
                <span>Rule #1: If it is not in writing, it did not happen.</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-primary-bright">Always obtain the job sheet.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHO THIS IS FOR SECTION */}
        <section id="who-this-is-for" className="py-20 md:py-28 bg-surface-muted border-y border-outline">
          <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
            {/* Section Header Stack */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="label-pill-text text-primary-ink">WHO THIS IS FOR</span>
              </div>
              <h2 className="headline-lg mt-4 text-on-surface-strong">
                Built for consumers who want claims settled on factual records.
              </h2>
              <p className="body-lead mt-5 max-w-[62ch]">
                Anyone whose phone, TV, laptop or appliance stopped working while it is still under warranty,
                and who wants the claim to be decided on facts, in writing.
              </p>
            </div>

            {/* Evidence & Audience Breakdown Grid */}
            <div className="mt-14 overflow-hidden rounded-[18px] border border-outline bg-outline grid grid-cols-1 gap-[1px] sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-7 transition-all duration-200 hover:bg-surface-2">
                <div className="label-mono text-primary font-bold">DEVICE #01</div>
                <h3 className="mt-2 text-[19px] font-bold text-on-surface-strong">Phones & Tablets</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-on-surface-variant">
                  Screen lines, sudden battery shutdown, motherboard failure, charging port defects while under warranty.
                </p>
              </div>

              <div className="bg-white p-7 transition-all duration-200 hover:bg-surface-2">
                <div className="label-mono text-primary font-bold">DEVICE #02</div>
                <h3 className="mt-2 text-[19px] font-bold text-on-surface-strong">Televisions & Monitors</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-on-surface-variant">
                  Panel burn-in, horizontal display lines, backlight failure, power supply or audio board defects.
                </p>
              </div>

              <div className="bg-white p-7 transition-all duration-200 hover:bg-surface-2">
                <div className="label-mono text-primary font-bold">DEVICE #03</div>
                <h3 className="mt-2 text-[19px] font-bold text-on-surface-strong">Laptops & PCs</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-on-surface-variant">
                  Keyboard malfunction, thermal throttling, hinge cracks, GPU crashes, SSD failure within the period.
                </p>
              </div>

              <div className="bg-white p-7 transition-all duration-200 hover:bg-surface-2">
                <div className="label-mono text-primary font-bold">DEVICE #04</div>
                <h3 className="mt-2 text-[19px] font-bold text-on-surface-strong">Major Home Appliances</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-on-surface-variant">
                  Refrigerators, washing machines, microwaves, air conditioning compressor issues and sensor faults.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. KEY NUMBERS SECTION (STAT GRID) */}
        <section id="key-numbers" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
            {/* Header Stack */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="label-pill-text text-primary-ink">KEY NUMBERS FOR THE PAGE</span>
              </div>
              <h2 className="headline-lg mt-4 text-on-surface-strong">
                Three numbers that separate approved claims from refusals.
              </h2>
              <p className="body-lead mt-5 max-w-[62ch]">
                When warranty disputes arise, vague recollections fail. Objective records and verified timelines prevail.
              </p>
            </div>

            {/* Stat Grid with 1px hairline gap inside rounded 18px container */}
            <div className="mt-14 overflow-hidden rounded-[18px] border border-outline bg-outline grid grid-cols-1 gap-[1px] md:grid-cols-3">
              {/* Stat 1 */}
              <div className="bg-white p-8 md:p-10 transition-all duration-200 hover:bg-surface-2">
                <div className="stat-number text-on-surface-strong">15</div>
                <div className="mt-3 text-[17px] font-bold text-on-surface-strong">
                  steps in the checklist.
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-on-surface-variant">
                  From invoice archiving to formal grievance escalation with consumer tribunals.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-8 md:p-10 transition-all duration-200 hover:bg-surface-2">
                <div className="stat-number text-on-surface-strong">4</div>
                <div className="mt-3 text-[17px] font-bold text-on-surface-strong">
                  records to keep before anything goes wrong.
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-on-surface-variant">
                  The invoice, warranty registration, terms review, and dated unboxing photos.
                </p>
              </div>

              {/* Stat 3 — HOT CELL with Emerald Accent */}
              <div className="bg-white p-8 md:p-10 transition-all duration-200 hover:bg-primary-soft/30">
                <div className="stat-number text-primary">1</div>
                <div className="mt-3 text-[17px] font-bold text-primary-ink">
                  rule: if it is not in writing, it did not happen.
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-on-surface-variant">
                  Verbal promises evaporate. Written tickets, job sheets, and emails decide the claim.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CHECKLIST SECTION — FULL 15 STEPS IN 4 PHASES */}
        <section id="checklist" className="py-12">
          {/* PHASE 1: BEFORE ANYTHING GOES WRONG (White background) */}
          <div className="py-16 md:py-24 bg-white border-t border-outline">
            <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
              <div className="flex flex-col items-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="label-pill-text text-primary-ink">PHASE 01 • PREVENTION</span>
                </div>
                <h2 className="headline-lg mt-4 text-on-surface-strong">
                  BEFORE ANYTHING GOES WRONG
                </h2>
                <p className="body-lead mt-5 max-w-[62ch]">
                  4 foundational records to safeguard before any defect arises.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="mt-12 overflow-hidden rounded-[18px] border border-outline bg-outline grid grid-cols-1 gap-[1px] md:grid-cols-2">
                {CHECKLIST_DATA[0].items.map((item) => {
                  const isChecked = !!checkedItems[item.num];
                  return (
                    <div
                      key={item.num}
                      onClick={() => toggleItem(item.num)}
                      className={`cursor-pointer p-8 transition-all duration-200 ${
                        isChecked ? 'bg-primary-soft/50' : 'bg-white hover:bg-surface-2'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[13px] font-semibold text-primary">
                          STEP 0{item.num}
                        </span>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                            isChecked
                              ? 'border-primary bg-primary text-white'
                              : 'border-outline-strong bg-white text-transparent'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-[21px] font-extrabold text-on-surface-strong">
                        {item.num}. {item.title}
                      </h3>
                      <p className="body-text mt-3 text-on-surface-variant">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PHASE 2: WHEN THE FAULT APPEARS (Mist background #F7F8FA) */}
          <div className="py-16 md:py-24 bg-surface-muted border-t border-outline">
            <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
              <div className="flex flex-col items-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="label-pill-text text-primary-ink">PHASE 02 • INCIDENT REPORTING</span>
                </div>
                <h2 className="headline-lg mt-4 text-on-surface-strong">
                  WHEN THE FAULT APPEARS
                </h2>
                <p className="body-lead mt-5 max-w-[62ch]">
                  Immediate steps to document evidence and lock in written records.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="mt-12 overflow-hidden rounded-[18px] border border-outline bg-outline grid grid-cols-1 gap-[1px] md:grid-cols-3">
                {CHECKLIST_DATA[1].items.map((item) => {
                  const isChecked = !!checkedItems[item.num];
                  return (
                    <div
                      key={item.num}
                      onClick={() => toggleItem(item.num)}
                      className={`cursor-pointer p-8 transition-all duration-200 ${
                        isChecked ? 'bg-primary-soft/50' : 'bg-white hover:bg-surface-2'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[13px] font-semibold text-primary">
                          STEP {item.num < 10 ? `0${item.num}` : item.num}
                        </span>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                            isChecked
                              ? 'border-primary bg-primary text-white'
                              : 'border-outline-strong bg-white text-transparent'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-[21px] font-extrabold text-on-surface-strong">
                        {item.num}. {item.title}
                      </h3>
                      <p className="body-text mt-3 text-on-surface-variant">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PHASE 3: WHEN A TECHNICIAN VISITS (White background) */}
          <div className="py-16 md:py-24 bg-white border-t border-outline">
            <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
              <div className="flex flex-col items-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="label-pill-text text-primary-ink">PHASE 03 • ON-SITE INSPECTION</span>
                </div>
                <h2 className="headline-lg mt-4 text-on-surface-strong">
                  WHEN A TECHNICIAN VISITS
                </h2>
                <p className="body-lead mt-5 max-w-[62ch]">
                  Critical steps to monitor on-site diagnosis and secure the physical job sheet.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="mt-12 overflow-hidden rounded-[18px] border border-outline bg-outline grid grid-cols-1 gap-[1px] md:grid-cols-3">
                {CHECKLIST_DATA[2].items.map((item) => {
                  const isChecked = !!checkedItems[item.num];
                  return (
                    <div
                      key={item.num}
                      onClick={() => toggleItem(item.num)}
                      className={`cursor-pointer p-8 transition-all duration-200 ${
                        isChecked ? 'bg-primary-soft/50' : 'bg-white hover:bg-surface-2'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[13px] font-semibold text-primary">
                          STEP {item.num < 10 ? `0${item.num}` : item.num}
                        </span>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                            isChecked
                              ? 'border-primary bg-primary text-white'
                              : 'border-outline-strong bg-white text-transparent'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-[21px] font-extrabold text-on-surface-strong">
                        {item.num}. {item.title}
                      </h3>
                      <p className="body-text mt-3 text-on-surface-variant">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Callout Card (Design component: card-callout) */}
              <div className="mt-10 rounded-[18px] border border-primary-border bg-primary-soft p-7 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-primary-ink">
                      Technician Visit Vital Rule
                    </h4>
                    <p className="mt-1 text-[15px] leading-relaxed text-primary-ink">
                      Never allow a technician to leave without furnishing a signed visit report or job sheet.
                      Once they leave your premises, reconstructing what they tested or recorded becomes substantially more difficult.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PHASE 4: IF THE CLAIM IS REFUSED — THE DARK SECTION */}
          {/* As specified in DESIGN.md: ink background #0D1117, white headlines, bright emerald #34D399 labels, panels in white/10 */}
          <div className="py-20 md:py-32 bg-secondary text-white border-t border-outline">
            <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
              {/* Header Stack */}
              <div className="flex flex-col items-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-primary-bright">
                    PHASE 04 • ESCALATION PROTOCOL
                  </span>
                </div>
                <h2 className="headline-lg mt-4 text-white">
                  IF THE CLAIM IS REFUSED
                </h2>
                <p className="body-lead mt-5 max-w-[62ch] text-white/70">
                  When a warranty claim is denied, do not panic or argue on phone calls. Switch immediately to written records.
                </p>
              </div>

              {/* Dark Cards Grid */}
              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {CHECKLIST_DATA[3].items.map((item) => {
                  const isChecked = !!checkedItems[item.num];
                  return (
                    <div
                      key={item.num}
                      onClick={() => toggleItem(item.num)}
                      className={`cursor-pointer rounded-[18px] border p-7 transition-all duration-200 hover:-translate-y-1 ${
                        isChecked
                          ? 'border-primary-bright/60 bg-white/20'
                          : 'border-white/15 bg-white/10 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[13px] font-bold text-primary-bright">
                          STEP {item.num}
                        </span>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                            isChecked
                              ? 'border-primary-bright bg-primary-bright text-secondary'
                              : 'border-white/30 bg-transparent text-transparent'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-[20px] font-extrabold text-white">
                        {item.num}. {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 8. CALL TO ACTION SECTION */}
        <section id="cta" className="py-20 md:py-32 bg-white border-t border-outline">
          <div className="mx-auto max-w-shell-narrow px-5 sm:px-8 text-center">
            {/* Header */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="label-pill-text text-primary-ink">CALL TO ACTION</span>
            </div>

            <h2 className="headline-lg mt-5 text-on-surface-strong">
              Download the checklist and keep it with your invoices.
            </h2>

            <p className="body-lead mx-auto mt-4 max-w-[58ch]">
              Share it with a friend who just bought something expensive.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold text-white shadow-raised transition-all duration-200 hover:-translate-y-[2px] hover:bg-primary-strong"
              >
                <Download className="h-5 w-5" />
                <span>Download the Checklist</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2.5 rounded-full border border-outline bg-white px-7 py-4 text-[15px] font-semibold text-on-surface-strong shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:bg-surface-muted"
              >
                <Share2 className="h-5 w-5 text-on-surface-variant" />
                <span>Share With a Friend</span>
              </button>
            </div>

            {/* Email form following DESIGN.md input specification */}
            <div className="mx-auto mt-14 max-w-md rounded-[18px] border border-outline bg-surface-muted p-6 text-left">
              <label
                htmlFor="email-checklist"
                className="block text-[13.5px] font-semibold text-on-surface-strong"
              >
                Get a backup copy sent to your email
              </label>
              <form onSubmit={handleEmailSubmit} className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="email-checklist"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="h-[44px] flex-1 rounded-sm border border-outline-strong bg-surface-sunken px-3.5 text-[15px] text-on-surface-strong shadow-input placeholder:text-on-surface-muted focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-[44px] items-center justify-center rounded-full bg-secondary px-6 text-[13.5px] font-semibold text-white transition-all hover:bg-primary sm:w-auto"
                >
                  Send
                </button>
              </form>
              {emailSubmitted && (
                <p className="mt-2 text-[12.5px] font-medium text-primary">
                  Checklist sent! Check your inbox shortly.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 9. FOOTER (DESIGN.md: Mist background #F7F8FA, 1px top hairline, three columns in caption grey, 13px legal line) */}
      <footer className="border-t border-outline bg-surface-muted py-16 text-on-surface-variant">
        <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* Column 1: About */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="font-sans text-[17px] font-extrabold tracking-tight text-on-surface-strong">
                  CLAIM READY
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-on-surface-variant max-w-[40ch]">
                A free checklist for anyone about to file a warranty claim. A warranty claim is decided on records. Keep yours, and ask for theirs in writing.
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-primary font-medium">
                <span>EST. 2026</span>
                <span>•</span>
                <span>PUBLIC CONSUMER RESOURCE</span>
              </div>
            </div>

            {/* Column 2: Checklist Sections */}
            <div className="md:col-span-4">
              <h4 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-on-surface-strong uppercase">
                Checklist Phases
              </h4>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                <li>
                  <a href="#checklist" className="hover:text-primary transition-colors">
                    1. Before Anything Goes Wrong (Steps 1–4)
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="hover:text-primary transition-colors">
                    2. When the Fault Appears (Steps 5–7)
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="hover:text-primary transition-colors">
                    3. When a Technician Visits (Steps 8–10)
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="hover:text-primary transition-colors">
                    4. If the Claim is Refused (Steps 11–15)
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Consumer Support */}
            <div className="md:col-span-3">
              <h4 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-on-surface-strong uppercase">
                Consumer Helplines
              </h4>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                <li>
                  <a href="#checklist" className="hover:text-primary transition-colors">
                    Official Grievance Portals
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="hover:text-primary transition-colors">
                    National Consumer Forum
                  </a>
                </li>
                <li>
                  <button onClick={handleDownload} className="text-primary font-semibold hover:underline">
                    Download Checklist (.txt)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* FOOTER NOTE from content.txt */}
          <div className="mt-14 border-t border-outline pt-8">
            <p className="text-[13px] leading-relaxed text-on-surface-muted">
              <strong>FOOTER NOTE:</strong> Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country&apos;s consumer rules.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
