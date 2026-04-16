import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    slug: 'agents/build-case-study',
    image: '/images/step1.png',
    altText: 'Introduction to the Build Case Study feature in CorZen',
    title: 'Build Your Case Study',
    description: 'Credibility comes from social proof. Turn client wins into compelling case studies that build trust and close deals.',
    intro: true,
    hotspot: null,
  },
  {
    slug: 'agents/build-case-study',
    image: '/images/step1.png',
    altText: 'CorZen weekly focus kanban board showing Build Case Study task in the In Progress column',
    title: 'Step 1',
    description: 'Your weekly focus board surfaces the right task — Build Case Study is ready to run.',
    hotspot: { top: '52%', left: '62%', align: 'center' },
  },
  {
    slug: 'agents/build-case-study/detail',
    image: '/images/step2.png',
    altText: 'Build Case Study task detail modal showing description and Run agent button',
    title: 'Step 2',
    description: 'Open the task to review the brief, then click Run agent to hand it off to AI.',
    hotspot: { top: '33%', left: '45%', align: 'center' },
  },
  {
    slug: 'agents/build-case-study/running',
    image: '/images/step3.png',
    altText: 'Build Case Study agent running autonomously with progress bar and working status indicator',
    title: 'Step 3',
    description: 'The agent works autonomously — no prompting required. Watch the progress in real time.',
    hotspot: { top: '65%', left: '50%', align: 'center' },
  },
  {
    slug: 'agents/build-case-study/output',
    image: '/images/step4.png',
    altText: 'Completed case study output with two-liner summary, social media story version, and full situation summary',
    title: 'Step 4',
    description: 'Done. Your case study ships in three formats: two-liner, story version, and full write-up.',
    hotspot: null,
  },
];

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IntroCallout = ({ step, onNext }) => (
  <>
    {/* Dim overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(15, 23, 42, 0.45)',
    }} />
    {/* Centered card — matches regular callout styling */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#DBEAFE',
        borderRadius: '16px',
        border: '1px solid #93c5fd',
        padding: '28px 20%',
        width: '360px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(147,197,253,0.7), 0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>
        {step.title}
      </h2>
      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#0f172a', margin: '0 0 20px' }}>
        {step.description}
      </p>
      <div style={{ borderTop: '1px solid #93c5fd', paddingTop: '16px' }}>
        <button
          onClick={onNext}
          style={{
            fontSize: '13px', fontWeight: 600, color: '#1e40af',
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          }}
        >
          Start demo →
        </button>
      </div>
    </motion.div>
  </>
);

const Callout = ({ step, onBack, onNext, onRestart, isFirst, isLast }) => {
  if (!step.hotspot) return null;

  const xOffset = step.hotspot.align === 'right' ? '-82%' : '-50%';

  return (
    <motion.div
      key={step.slug}
      style={{
        position: 'absolute',
        top: step.hotspot.top,
        left: step.hotspot.left,
        transform: `translate(${xOffset}, -100%)`,
        marginTop: '-14px',
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: [0, -5, 0] }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 4px 16px rgba(147,197,253,0.5), 0 1px 4px rgba(0,0,0,0.06)',
            '0 8px 28px rgba(147,197,253,0.9), 0 2px 8px rgba(0,0,0,0.08)',
            '0 4px 16px rgba(147,197,253,0.5), 0 1px 4px rgba(0,0,0,0.06)',
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: '#DBEAFE', borderRadius: '12px',
          border: '1px solid #93c5fd', padding: '16px 20%',
          width: '260px', pointerEvents: 'auto',
        }}
      >
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#0f172a', margin: 0 }}>
          {step.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #93c5fd' }}>
          <button
            onClick={onBack}
            disabled={isFirst}
            style={{
              display: 'flex', alignItems: 'center', gap: '3px',
              fontSize: '13px', fontWeight: 600,
              color: isFirst ? '#93c5fd' : '#1e40af',
              background: 'none', border: 'none', padding: 0,
              cursor: isFirst ? 'default' : 'pointer',
            }}
          >
            <ChevronLeft /> Back
          </button>
          {isLast ? (
            <button
              onClick={onRestart}
              style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Restart
            </button>
          ) : (
            <button
              onClick={onNext}
              style={{
                display: 'flex', alignItems: 'center', gap: '3px',
                fontSize: '13px', fontWeight: 600, color: '#1e40af',
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              }}
            >
              Next <ChevronRight />
            </button>
          )}
        </div>
      </motion.div>

      {/* Arrow tip */}
      <div style={{
        width: 0, height: 0,
        borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
        borderTop: '7px solid #DBEAFE',
        margin: '0 auto', position: 'relative', zIndex: 1,
        filter: 'drop-shadow(0 2px 2px rgba(147,197,253,0.6))',
        marginLeft: step.hotspot.align === 'right' ? 'calc(82% - 7px)' : 'auto',
      }} />

      {/* Anchor dot */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '10px', height: '10px', borderRadius: '50%',
          background: '#3b82f6', boxShadow: '0 0 0 3px rgba(59,130,246,0.25)',
          margin: '0 auto',
          marginLeft: step.hotspot.align === 'right' ? 'calc(82% - 5px)' : 'auto',
        }}
      />
    </motion.div>
  );
};

const CorZenDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const goBack = () => setCurrentStep((p) => Math.max(0, p - 1));
  const goNext = () => setCurrentStep((p) => Math.min(steps.length - 1, p + 1));
  const restart = () => setCurrentStep(0);

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="rounded-xl bg-white overflow-hidden max-w-4xl mx-auto font-sans" style={{ border: '3px solid #0f172a', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center justify-center">
        <span className="font-bold text-slate-900 text-sm tracking-tight">Agent Demo to Build Case Studies</span>
      </div>

      {/* Main Stage */}
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={`img-${currentStep}`}
            src={step.image}
            alt={step.altText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-top"
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step.intro ? (
            <IntroCallout key="intro" step={step} onNext={goNext} />
          ) : (
            <Callout
              key={`callout-${currentStep}`}
              step={step}
              onBack={goBack}
              onNext={goNext}
              onRestart={restart}
              isFirst={isFirst}
              isLast={isLast}
            />
          )}
        </AnimatePresence>

        {/* Last step nav */}
        {isLast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute', bottom: '16px', right: '16px',
              background: 'white', borderRadius: '12px',
              border: '1px solid #e2e8f0', padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            <button
              onClick={goBack}
              style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 600, color: '#64748b', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <ChevronLeft /> Back
            </button>
            <div style={{ width: '1px', height: '12px', background: '#e2e8f0' }} />
            <button
              onClick={restart}
              style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Restart
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default CorZenDemo;
