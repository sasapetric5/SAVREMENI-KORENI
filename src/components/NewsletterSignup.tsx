import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NewsletterSignup: React.FC = () => {
  const { isEn } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('savremeni_newsletter_subscribed');
      if (savedEmail) {
        setStatus('success');
        setEmail(savedEmail);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage(
        isEn
          ? 'Please enter a valid email address.'
          : 'Molimo vas unesite ispravnu e-mail adresu.'
      );
      setStatus('error');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      try {
        localStorage.setItem('savremeni_newsletter_subscribed', email);
        
        // Load active welcome email default promo code
        let activePromo = 'KORENI10';
        try {
          const welcomeEmails = JSON.parse(localStorage.getItem('koreni_welcome_emails') || '[]');
          const defaultVer = welcomeEmails.find((v: any) => v.isDefault) || welcomeEmails[0];
          if (defaultVer && defaultVer.promoCode) {
            activePromo = defaultVer.promoCode;
          }
        } catch {}

        // Cascade provider assignment simulation
        const providers = ['Kit (ConvertKit)', 'MailerLite', 'EmailOctopus', 'Brevo (Sendinblue)'];
        
        const existingRaw = localStorage.getItem('koreni_newsletter_subscribers');
        let subscribersList: any[] = existingRaw ? JSON.parse(existingRaw) : [];

        if (!subscribersList.some((s: any) => (typeof s === 'string' ? s === email : s.email === email))) {
          const assignedProvider = providers[subscribersList.length % providers.length];
          const newRecord = {
            id: `sub-${Date.now()}`,
            email: email,
            subscribedAt: new Date().toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' }),
            providerAssigned: assignedProvider,
            status: 'synced',
            promoCodeSent: activePromo
          };
          subscribersList.unshift(newRecord);
          localStorage.setItem('koreni_newsletter_subscribers', JSON.stringify(subscribersList));
        }
      } catch {}

      setStatus('success');
    }, 600);
  };

  return (
    <div className="bg-[#241D19] border border-[#E8D0A9]/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl relative overflow-hidden text-white">
      {/* Decorative gradient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#9E3E26]/30 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C2872A]/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Heading & Text */}
        <div className="lg:col-span-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E3E26]/20 border border-[#9E3E26]/40 text-[#E8D0A9] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C2872A]" />
            <span>{isEn ? 'Stay Connected' : 'Budite u toku'}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
            {isEn
              ? 'Subscribe for New Creations & Heritage Stories'
              : 'Prijavite se za obaveštenja o novim radovima i blogu'}
          </h3>

          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
            {isEn
              ? 'Be the first to know about new hand-crafted releases, folk costume stories, and special custom order availability.'
              : 'Budite prvi koji će saznati za nove unikatne rukotvorine, tekstove o narodu i tradiciji, kao i raspored izrade po meri.'}
          </p>
        </div>

        {/* Right Form Input or Success Confirmation */}
        <div className="lg:col-span-6">
          {status === 'success' ? (
            <div className="bg-[#1A1512] border border-[#C2872A]/50 p-5 rounded-xl text-center space-y-2 animate-in fade-in duration-300">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#9E3E26]/20 text-[#C2872A]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#E8D0A9]">
                {isEn ? 'Successfully Subscribed!' : 'Uspešno ste se prijavili!'}
              </h4>
              <p className="text-xs text-[#FAF7F2]/80">
                {isEn
                  ? `Thank you! Updates will be sent to ${email}.`
                  : `Hvala vam! Obaveštenja će stizati na ${email}.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setEmail('');
                }}
                className="text-[11px] text-[#C2872A] hover:underline font-semibold cursor-pointer pt-1"
              >
                {isEn ? 'Change email address' : 'Promenite e-mail adresu'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#E8D0A9]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      isEn
                        ? 'Enter your email address...'
                        : 'Unesite vašu e-mail adresu...'
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A1512] border border-[#E8D0A9]/30 text-white placeholder-[#FAF7F2]/50 text-xs sm:text-sm focus:outline-none focus:border-[#C2872A] focus:ring-1 focus:ring-[#C2872A] transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-5 py-3 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{isEn ? 'Subscribe' : 'Prijavi se'}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-400 font-medium px-1">
                  {errorMessage}
                </p>
              )}

              <p className="text-[11px] text-[#FAF7F2]/60 flex items-center gap-1 px-1">
                <Bell className="w-3 h-3 text-[#C2872A]" />
                <span>
                  {isEn
                    ? 'No spam ever. Unsubscribe at any time.'
                    : 'Bez neželjene pošte. Možete se odjaviti u bilo kom trenutku.'}
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
