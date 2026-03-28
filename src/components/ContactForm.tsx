'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';

export default function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-surface border border-accent/30 rounded-lg p-8 text-center">
        <svg className="w-12 h-12 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p className="text-text-primary text-lg font-bold mb-2">{t.contact.success}</p>
        <p className="text-text-muted text-sm">{t.contact.responseTime}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-text-secondary text-sm mb-1">{t.contact.nameLabel}</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>
      <div>
        <label className="block text-text-secondary text-sm mb-1">{t.contact.emailLabel}</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>
      <div>
        <label className="block text-text-secondary text-sm mb-1">{t.contact.subjectLabel}</label>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>
      <div>
        <label className="block text-text-secondary text-sm mb-1">{t.contact.messageLabel}</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
      </div>
      <button type="submit" className="w-full bg-accent text-white font-bold py-2.5 rounded-lg hover:brightness-110 transition-all text-sm">
        {t.contact.send}
      </button>
    </form>
  );
}
