import { useState } from 'react';
import MemberRow from '../components/MemberRow';

const fieldStyle = {
  flex: '1 1 180px',
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 12,
  padding: '10px 14px',
  fontFamily: 'inherit',
  fontSize: 14,
  color: '#2b2440',
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

export default function Members({
  members,
  onInviteMember,
  onUpdateMember,
  onApprove,
  onDecline,
  onMarkJoined,
  onDeactivate,
  onReactivate,
  onRemove,
  onViewProfile,
}) {
  const [nameDraft, setNameDraft] = useState('');
  const [emailDraft, setEmailDraft] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState('');

  const pending = members.filter((m) => m.memberStatus === 'pending');
  const others = members.filter((m) => m.memberStatus !== 'pending');

  const submitInvite = async () => {
    const n = nameDraft.trim();
    const e = emailDraft.trim();
    if (!n || !e) {
      setError('Add a name and email before sending an invite.');
      return;
    }
    setSending(true);
    setError('');
    setSent('');
    const result = await onInviteMember(n, e);
    setSending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setNameDraft('');
    setEmailDraft('');
    setSent(`Invite sent to ${e}.`);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17 }}>Invite a new member</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} placeholder="Full name" style={fieldStyle} />
          <input value={emailDraft} onChange={(e) => setEmailDraft(e.target.value)} placeholder="Email address" style={fieldStyle} />
          <button
            onClick={submitInvite}
            disabled={sending}
            style={{
              flex: 'none',
              background: 'var(--coral,#f26f63)',
              color: '#fff',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 13.5,
              padding: '10px 18px',
              borderRadius: 12,
              cursor: sending ? 'default' : 'pointer',
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? 'Sending…' : 'Send invite'}
          </button>
        </div>
        {error && (
          <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a', marginTop: 8 }}>{error}</div>
        )}
        {sent && (
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3f7d58', marginTop: 8 }}>{sent}</div>
        )}
      </div>

      {pending.length > 0 && (
        <div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>
            Pending approval ({pending.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pending.map((m) => (
              <MemberRow
                key={m.id}
                member={m}
                onUpdateMember={onUpdateMember}
                onApprove={onApprove}
                onDecline={onDecline}
                onMarkJoined={onMarkJoined}
                onDeactivate={onDeactivate}
                onReactivate={onReactivate}
                onRemove={onRemove}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>
          All members ({others.length})
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {others.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              onUpdateMember={onUpdateMember}
              onApprove={onApprove}
              onDecline={onDecline}
              onMarkJoined={onMarkJoined}
              onDeactivate={onDeactivate}
              onReactivate={onReactivate}
              onRemove={onRemove}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
