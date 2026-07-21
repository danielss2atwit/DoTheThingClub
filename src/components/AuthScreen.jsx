import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthScreen() {
  const [mode, setMode] = useState('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);

    if (mode === 'sign-up') {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      setLoading(false);
      if (err) setError(err.message);
      else setNotice('Check your email to confirm your account, then sign in.');
      return;
    }

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) setError(err.message);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fdfaf3',
        fontFamily: "'Nunito', system-ui",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: 360,
          maxWidth: '90vw',
          background: '#fff',
          border: '1px solid rgba(43,36,64,.1)',
          borderRadius: 20,
          padding: 30,
        }}
      >
        <div style={{ fontFamily: "'Fredoka', system-ui", fontWeight: 700, fontSize: 22, color: '#2b2440' }}>
          DoTheThingClub
        </div>
        <div style={{ fontSize: 13.5, color: '#8a83a0', marginTop: 4, marginBottom: 22 }}>
          {mode === 'sign-in' ? 'Welcome back — sign in to continue.' : 'Create your account.'}
        </div>

        {mode === 'sign-up' && (
          <label style={{ display: 'block', marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#5a5470', marginBottom: 5 }}>Name</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </label>
        )}

        <label style={{ display: 'block', marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#5a5470', marginBottom: 5 }}>Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#5a5470', marginBottom: 5 }}>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />
        </label>

        {error && <div style={{ fontSize: 12.5, color: '#d0554a', marginTop: 10 }}>{error}</div>}
        {notice && <div style={{ fontSize: 12.5, color: '#3f7d58', marginTop: 10 }}>{notice}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            marginTop: 18,
            padding: '11px 0',
            borderRadius: 12,
            border: 'none',
            background: '#ffd84c',
            color: '#2b2440',
            fontWeight: 800,
            fontSize: 14,
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Sign up'}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode((m) => (m === 'sign-in' ? 'sign-up' : 'sign-in'));
            setError('');
            setNotice('');
          }}
          style={{
            width: '100%',
            marginTop: 12,
            padding: '8px 0',
            borderRadius: 12,
            border: 'none',
            background: 'transparent',
            color: '#6562ac',
            fontWeight: 700,
            fontSize: 12.5,
            cursor: 'pointer',
          }}
        >
          {mode === 'sign-in' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 10,
  border: '1px solid rgba(43,36,64,.15)',
  fontSize: 13.5,
  fontFamily: "'Nunito', system-ui",
  boxSizing: 'border-box',
};
