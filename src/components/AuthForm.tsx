'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { t } = useLanguage();
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validate = (): boolean => {
    if (mode === 'signup' && !name.trim()) {
      setError(t.auth.errors.nameRequired);
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(t.auth.errors.invalidEmail);
      return false;
    }
    if (password.length < 8) {
      setError(t.auth.errors.passwordShort);
      return false;
    }
    if (mode === 'signup' && password !== confirmPassword) {
      setError(t.auth.errors.passwordMismatch);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    if (mode === 'signin') {
      const ok = signIn(email, password);
      if (!ok) {
        setError(t.auth.errors.invalidCredentials);
        return;
      }
    } else {
      const ok = signUp(name, email, password);
      if (!ok) {
        setError(t.auth.errors.invalidCredentials);
        return;
      }
    }

    router.push('/account');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 w-full max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-text-primary text-center mb-6">
        {mode === 'signin' ? t.auth.logIn : t.auth.signUp}
      </h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5 text-red-400 text-sm">
          {error}
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <label className="block text-text-secondary text-sm mb-1">{t.auth.name}</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
        </div>
      )}

      <div>
        <label className="block text-text-secondary text-sm mb-1">{t.auth.email}</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div>
        <label className="block text-text-secondary text-sm mb-1">{t.auth.password}</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>

      {mode === 'signup' && (
        <div>
          <label className="block text-text-secondary text-sm mb-1">{t.auth.confirmPassword}</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
        </div>
      )}

      {mode === 'signin' && (
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-border accent-accent" />
            {t.auth.rememberMe}
          </label>
          <Link href="/coming-soon/forgot-password" className="text-accent text-sm hover:underline">
            {t.auth.forgotPassword}
          </Link>
        </div>
      )}

      <button type="submit" className="w-full bg-accent text-white font-bold py-2.5 rounded-lg hover:brightness-110 transition-all text-sm">
        {mode === 'signin' ? t.auth.logIn : t.auth.signUp}
      </button>

      <p className="text-center text-text-muted text-sm">
        {mode === 'signin' ? t.auth.noAccount : t.auth.hasAccount}{' '}
        <Link href={mode === 'signin' ? '/account/signup' : '/account/signin'} className="text-accent hover:underline">
          {mode === 'signin' ? t.auth.signUp : t.auth.logIn}
        </Link>
      </p>
    </form>
  );
}
