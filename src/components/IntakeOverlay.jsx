import { intakeSteps, fearOptions, fieldOptions } from '../data';

const textareaStyle = {
  width: '100%',
  minHeight: 56,
  resize: 'none',
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 14,
  padding: '11px 14px',
  fontFamily: 'inherit',
  fontSize: 14,
  color: '#2b2440',
  lineHeight: 1.5,
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

const errorTextStyle = { fontSize: 12.5, fontWeight: 700, color: '#d0554a' };

export default function IntakeOverlay({
  step,
  areas,
  areaDraft,
  areaDraftError,
  areaCountError,
  fears,
  suggestLoading,
  suggested,
  onSetAreaCategory,
  onAreaGoalChange,
  onAreaWhyChange,
  onAddArea,
  onRemoveArea,
  onToggleFear,
  onBack,
  onNext,
  onClose,
}) {
  const stepName = intakeSteps[step];
  const intakePct = ((step + 1) / intakeSteps.length) * 100;
  const intakeStepLabel = `Step ${step + 1} of ${intakeSteps.length}`;

  let intakeQ = '';
  let intakeHelp = '';
  let intakeIsAreas = false;
  let intakeIsChips = false;
  let intakeIsSuggest = false;
  let intakeChips = [];

  if (stepName === 'areas') {
    intakeQ = 'Pick 2–3 areas of growth for this semester';
    intakeHelp = 'These become your semester-long goals. For each one, name the specific goal and why it stretches you.';
    intakeIsAreas = true;
  } else if (stepName === 'fears') {
    intakeQ = 'What’s holding you back? (pick up to 3)';
    intakeHelp = 'No judgment here. Naming it is the first step to moving past it.';
    intakeIsChips = true;
    intakeChips = fearOptions.map((f) => {
      const on = fears.includes(f);
      return { label: (on ? '✓ ' : '') + f, on, onClick: () => onToggleFear(f) };
    });
  } else if (stepName === 'suggest') {
    intakeQ = 'Here’s your starting ladder 🪜';
    intakeHelp = 'We turned each area into 2 tiny, low-stakes first steps.';
    intakeIsSuggest = true;
  }

  const intakeNextLabel = stepName === 'fears' ? 'Break it down ✨' : stepName === 'suggest' ? 'Add these as my goals →' : 'Next →';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(43,36,64,.42)',
        backdropFilter: 'blur(3px)',
        zIndex: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          background: 'var(--surface,#fff)',
          borderRadius: 26,
          overflow: 'hidden',
          boxShadow: '0 30px 70px -20px rgba(43,36,64,.5)',
        }}
      >
        <div style={{ height: 6, background: 'rgba(43,36,64,.08)' }}>
          <div style={{ height: '100%', background: 'var(--coral,#f26f63)', transition: 'width .4s cubic-bezier(.34,1.56,.64,1)', width: `${intakePct}%` }} />
        </div>
        <div style={{ padding: '30px 32px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--muted,#8a83a0)' }}>
              {intakeStepLabel}
            </div>
            <button
              onClick={onClose}
              style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: 'rgba(43,36,64,.06)', cursor: 'pointer', fontSize: 15, color: '#5a5470' }}
            >
              ✕
            </button>
          </div>

          <div style={{ minHeight: 230 }}>
            <div
              style={{
                fontFamily: 'var(--font-display,\'Fredoka\')',
                fontWeight: 700,
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: '-.01em',
                fontStyle: 'var(--head-style,normal)',
              }}
            >
              {intakeQ}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted,#8a83a0)', marginTop: 8, lineHeight: 1.5 }}>{intakeHelp}</div>

            {intakeIsAreas && (
              <div style={{ marginTop: 18 }}>
                {areas.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {areas.map((a) => (
                      <div
                        key={a.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: 10,
                          background: 'var(--bg,#fdfaf3)',
                          border: '1px solid var(--line,rgba(43,36,64,.1))',
                          borderRadius: 14,
                          padding: '12px 14px',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.03em', color: 'var(--lilac,#6562ac)' }}>
                            {a.category}
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#2b2440', marginTop: 2 }}>{a.goal}</div>
                          <div style={{ fontSize: 12.5, color: 'var(--muted,#8a83a0)', marginTop: 2 }}>{a.why}</div>
                        </div>
                        <button
                          onClick={() => onRemoveArea(a.id)}
                          style={{ background: 'none', border: 'none', color: '#8a83a0', cursor: 'pointer', fontSize: 14, flex: 'none' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {areas.length < 3 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.03em', color: 'var(--muted,#8a83a0)' }}>
                      Area {areas.length + 1} of up to 3
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {fieldOptions.map((f) => {
                        const on = areaDraft.category === f;
                        return (
                          <button
                            key={f}
                            onClick={() => onSetAreaCategory(f)}
                            style={{
                              border: 'none',
                              fontFamily: 'inherit',
                              fontWeight: 700,
                              fontSize: 13,
                              padding: '9px 15px',
                              borderRadius: 13,
                              cursor: 'pointer',
                              background: on ? '#6562ac' : 'rgba(43,36,64,.05)',
                              color: on ? '#fff' : '#43405a',
                            }}
                          >
                            {f}
                          </button>
                        );
                      })}
                    </div>
                    <textarea
                      value={areaDraft.goal}
                      onChange={onAreaGoalChange}
                      placeholder="What's the specific goal for this area?"
                      style={textareaStyle}
                    />
                    <textarea
                      value={areaDraft.why}
                      onChange={onAreaWhyChange}
                      placeholder="Why does this stretch you?"
                      style={textareaStyle}
                    />
                    {areaDraftError && <div style={errorTextStyle}>Pick a category and fill in both fields before adding this area.</div>}
                    <button
                      onClick={onAddArea}
                      style={{
                        alignSelf: 'flex-start',
                        background: 'rgba(101,98,172,.12)',
                        color: 'var(--lilac,#6562ac)',
                        border: 'none',
                        fontFamily: 'inherit',
                        fontWeight: 700,
                        fontSize: 13.5,
                        padding: '10px 18px',
                        borderRadius: 13,
                        cursor: 'pointer',
                      }}
                    >
                      + Add this area
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)' }}>
                    You&rsquo;ve added 3 areas — the max for one semester. Ready to continue →
                  </div>
                )}
                {areaCountError && <div style={{ ...errorTextStyle, marginTop: 10 }}>Pick at least 2 areas before continuing.</div>}
              </div>
            )}

            {intakeIsChips && (
              <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {intakeChips.map((ch) => (
                  <button
                    key={ch.label}
                    onClick={ch.onClick}
                    style={
                      stepName === 'fears'
                        ? {
                            border: `2px solid ${ch.on ? '#f26f63' : 'rgba(43,36,64,.12)'}`,
                            fontFamily: 'inherit',
                            fontWeight: 700,
                            fontSize: 14,
                            padding: '10px 16px',
                            borderRadius: 14,
                            cursor: 'pointer',
                            background: ch.on ? 'rgba(242,111,99,.12)' : 'transparent',
                            color: ch.on ? '#d0554a' : '#43405a',
                          }
                        : {
                            border: 'none',
                            fontFamily: 'inherit',
                            fontWeight: 700,
                            fontSize: 14,
                            padding: '11px 18px',
                            borderRadius: 14,
                            cursor: 'pointer',
                            background: ch.on ? '#6562ac' : 'rgba(43,36,64,.05)',
                            color: ch.on ? '#fff' : '#43405a',
                          }
                    }
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            )}

            {intakeIsSuggest && (
              <>
                {suggestLoading && (
                  <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                    <div style={{ fontSize: 34, animation: 'wiggle .8s ease-in-out infinite' }}>✨</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--lilac,#6562ac)' }}>Breaking your areas into first steps…</div>
                  </div>
                )}
                {!suggestLoading && (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {suggested.map((grp) => (
                      <div key={grp.id}>
                        <div style={{ fontSize: 13.5, fontWeight: 800, color: grp.barColor }}>{grp.title}</div>
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 9 }}>
                          {grp.items.map((sg) => (
                            <div
                              key={sg.n}
                              style={{
                                display: 'flex',
                                gap: 12,
                                alignItems: 'flex-start',
                                background: 'var(--bg,#fdfaf3)',
                                border: '1px solid var(--line,rgba(43,36,64,.1))',
                                borderRadius: 15,
                                padding: '14px 16px',
                              }}
                            >
                              <div
                                style={{
                                  width: 26,
                                  height: 26,
                                  borderRadius: 9,
                                  background: 'var(--primary,#ffd84c)',
                                  color: '#7a5a00',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 800,
                                  fontSize: 13,
                                  flex: 'none',
                                }}
                              >
                                {sg.n}
                              </div>
                              <div style={{ fontSize: 14.5, color: '#33304a', lineHeight: 1.45, fontWeight: 600 }}>{sg.text}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
            <button
              onClick={onBack}
              style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, color: '#8a83a0', cursor: 'pointer', padding: '12px 4px' }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              style={{
                background: 'var(--coral,#f26f63)',
                color: '#fff',
                border: 'none',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 14,
                cursor: 'pointer',
                boxShadow: '0 3px 0 rgba(196,74,64,.5)',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(196,74,64,.5)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 3px 0 rgba(196,74,64,.5)';
              }}
            >
              {intakeNextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
