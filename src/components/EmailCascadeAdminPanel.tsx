import React, { useState, useEffect } from 'react';
import { 
  Mail, CheckCircle2, Download, RefreshCw, Copy, Check, Users, ExternalLink, 
  Sparkles, Plus, Trash2, Edit3, Eye, Send, Clock, Layers, ShieldCheck, 
  HelpCircle, Code, ArrowRight, FileText, CheckSquare, Sparkle
} from 'lucide-react';

export interface WelcomeEmailVersion {
  id: string;
  title: string;
  isDefault: boolean;
  status: 'active' | 'ab_test' | 'draft';
  delay: 'immediate' | '15m' | '1h' | '24h';
  delayLabel: string;
  // Serbian
  subjectSr: string;
  previewTextSr: string;
  bodySr: string;
  // English
  subjectEn: string;
  previewTextEn: string;
  bodyEn: string;
  // Promo code
  promoCode: string;
  // Stats
  sentCount: number;
  openRate: string;
  clickRate: string;
  createdAt: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  subscribedAt: string;
  providerAssigned: string;
  status: 'active' | 'synced';
  promoCodeSent: string;
  versionUsed?: string;
}

export interface EmailCascadeAdminPanelProps {
  showToast: (message: string) => void;
}

// Pre-defined initial Welcome Email Templates
const INITIAL_WELCOME_EMAILS: WelcomeEmailVersion[] = [
  {
    id: 'welcome-v1',
    title: 'Standardna Dobrodošlica (-10% Kupon za prvu kupovinu)',
    isDefault: true,
    status: 'active',
    delay: 'immediate',
    delayLabel: 'Odmah po prijavi',
    promoCode: 'KORENI10',
    subjectSr: '🌸 Dobrodošli u Savremene Korene! Vaš 10% kupon popusta je tu',
    previewTextSr: 'Hvala Vam na poverenju. Unesite kod KORENI10 pri naručivanju.',
    bodySr: `Poštovani/a,\n\nHvala Vam što ste postali deo porodice Savremeni Koreni!\n\nSa ponosom vam poklanjamo kupon za 10% popusta na vašu prvu narudžbinu autentičnih Homoljskih šubara, vezenih jeleka, vunene odeće i etno aksesoara.\n\nVaš promo kod: KORENI10\n\nPrimenite kod na kasi prilikom naručivanja na našem sajtu:\nhttps://savremenikoreni.rs\n\nS poštovanjem,\nTanja Petrić\nMajstorice ručnog rada - Savremeni Koreni, Jošanica`,
    subjectEn: '🌸 Welcome to Savremeni Koreni! Your 10% discount code inside',
    previewTextEn: 'Thank you for joining. Use code KORENI10 at checkout.',
    bodyEn: `Dear Customer,\n\nThank you for joining the Savremeni Koreni family!\n\nWe are delighted to gift you a 10% discount code for your first purchase of authentic Serbian fur hats, hand-embroidered vests, and artisan crafts.\n\nYour promo code: KORENI10\n\nApply the code at checkout on our store:\nhttps://savremenikoreni.rs\n\nWarmest regards,\nTanja Petrić\nFounder & Artisan, Savremeni Koreni, Serbia`,
    sentCount: 142,
    openRate: '68.4%',
    clickRate: '34.2%',
    createdAt: '15. Septembar 2026.'
  },
  {
    id: 'welcome-v2',
    title: 'VIP Priča o Tradiciji Homolja + Vodič za Negu Vune (-10%)',
    isDefault: false,
    status: 'ab_test',
    delay: 'immediate',
    delayLabel: 'Odmah po prijavi (A/B Test)',
    promoCode: 'HOMOLJE10',
    subjectSr: '🌿 Tajne Homolja i poklon od 10% popusta [Savremeni Koreni]',
    previewTextSr: 'Upoznajte tradiciju ručnog rada iz Jošanice i preuzmite popust.',
    bodySr: `Dragi ljubitelju srpske tradicije,\n\nDobrodošli u priču koja spaja tradiciju Homoljskih planina i savremeni dizajn.\n\nSvaki naš komad - od jagnjeće šubare do tkanog pojasa - nastaje ručno u radionici u Jošanici.\n\nKao znak dobrodošlice, poklanjamo vam kod HOMOLJE10 za 10% popusta pri prvoj kupovini.\n\nPosetite našu prodavnicu i pronađite unikat za sebe ili drage ljude u dijaspori:\nhttps://savremenikoreni.rs\n\nSrdačno,\nPorodica Petrić, Jošanica`,
    subjectEn: '🌿 Secrets of Homolje & 10% Welcome Gift [Savremeni Koreni]',
    previewTextEn: 'Discover authentic Serbian artisan craftsmanship and get your discount.',
    bodyEn: `Dear Heritage Lover,\n\nWelcome to a story that bridges the tradition of Homolje mountains and modern elegance.\n\nEvery piece - from natural lambskin shepherd hats to woven sashes - is handcrafted in Jošanica, Serbia.\n\nAs a welcome gift, use code HOMOLJE10 for 10% off your first order.\n\nExplore our catalog:\nhttps://savremenikoreni.rs\n\nBest wishes,\nThe Petrić Family, Jošanica`,
    sentCount: 89,
    openRate: '74.1%',
    clickRate: '41.5%',
    createdAt: '10. Septembar 2026.'
  }
];

export const EmailCascadeAdminPanel: React.FC<EmailCascadeAdminPanelProps> = ({ showToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<'welcome_emails' | 'cascade_providers' | 'subscribers'>('welcome_emails');
  
  // Welcome Email State
  const [welcomeEmails, setWelcomeEmails] = useState<WelcomeEmailVersion[]>([]);
  const [editingEmail, setEditingEmail] = useState<WelcomeEmailVersion | null>(null);
  const [previewEmail, setPreviewEmail] = useState<WelcomeEmailVersion | null>(null);
  const [previewLang, setPreviewLang] = useState<'sr' | 'en'>('sr');

  // Form state for creating/editing version
  const [formTitle, setFormTitle] = useState('');
  const [formDelay, setFormDelay] = useState<'immediate' | '15m' | '1h' | '24h'>('immediate');
  const [formPromoCode, setFormPromoCode] = useState('KORENI10');
  const [formSubjectSr, setFormSubjectSr] = useState('');
  const [formPreviewSr, setFormPreviewSr] = useState('');
  const [formBodySr, setFormBodySr] = useState('');
  const [formSubjectEn, setFormSubjectEn] = useState('');
  const [formPreviewEn, setFormPreviewEn] = useState('');
  const [formBodyEn, setFormBodyEn] = useState('');

  // Subscribers state
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Providers list
  const providersStatus = [
    {
      id: 'kit',
      name: 'Kit (ConvertKit)',
      limit: '1.000 pretplatnika',
      tier: 'Nulti nivo (Primarni)',
      status: 'Aktivno & Povezano',
      apiKeyStatus: 'Spreman (Kit API Key + Secret)',
      dashboardUrl: 'https://app.kit.com/publications/22531946',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300'
    },
    {
      id: 'mailerlite',
      name: 'MailerLite',
      limit: '1.000 pretplatnika / 12.000 mejlova',
      tier: 'Sekundarni nivo',
      status: 'Aktivno & Povezano',
      apiKeyStatus: 'Spreman (Token kreiran)',
      dashboardUrl: 'https://dashboard.mailerlite.com',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300'
    },
    {
      id: 'emailoctopus',
      name: 'EmailOctopus',
      limit: '2.500 pretplatnika',
      tier: 'Tercijarni nivo',
      status: 'Aktivno & Povezano',
      apiKeyStatus: 'Spreman (API Key + List ID: 142fcaae-...)',
      dashboardUrl: 'https://emailoctopus.com/lists',
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-300'
    },
    {
      id: 'brevo',
      name: 'Brevo (Sendinblue)',
      limit: 'Neograničeno kontakata / 300 dnevno',
      tier: 'Kaskadni osigurač',
      status: 'Aktivno & Povezano',
      apiKeyStatus: 'Spreman (xkeysib-67f4f5...)',
      dashboardUrl: 'https://app.brevo.com',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300'
    }
  ];

  useEffect(() => {
    loadWelcomeEmails();
    loadSubscribers();
  }, []);

  const loadWelcomeEmails = () => {
    try {
      const saved = localStorage.getItem('koreni_welcome_emails');
      if (saved) {
        setWelcomeEmails(JSON.parse(saved));
      } else {
        setWelcomeEmails(INITIAL_WELCOME_EMAILS);
        localStorage.setItem('koreni_welcome_emails', JSON.stringify(INITIAL_WELCOME_EMAILS));
      }
    } catch {
      setWelcomeEmails(INITIAL_WELCOME_EMAILS);
    }
  };

  const loadSubscribers = () => {
    try {
      const saved = localStorage.getItem('koreni_newsletter_subscribers');
      if (saved) {
        setSubscribers(JSON.parse(saved));
      } else {
        const demo: SubscriberRecord[] = [
          {
            id: 'sub-1',
            email: 'skoksap5@gmail.com',
            subscribedAt: new Date().toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' }),
            providerAssigned: 'Kit (ConvertKit)',
            status: 'synced',
            promoCodeSent: 'KORENI10',
            versionUsed: 'Standardna Dobrodošlica (-10% Kupon)'
          }
        ];
        setSubscribers(demo);
      }
    } catch {
      setSubscribers([]);
    }
  };

  const saveWelcomeEmailsToStorage = (updated: WelcomeEmailVersion[]) => {
    setWelcomeEmails(updated);
    localStorage.setItem('koreni_welcome_emails', JSON.stringify(updated));
  };

  const handleCreateNewVersion = () => {
    setEditingEmail({
      id: `welcome-${Date.now()}`,
      title: '',
      isDefault: false,
      status: 'draft',
      delay: 'immediate',
      delayLabel: 'Odmah po prijavi',
      promoCode: 'KORENI10',
      subjectSr: '',
      previewTextSr: '',
      bodySr: '',
      subjectEn: '',
      previewTextEn: '',
      bodyEn: '',
      sentCount: 0,
      openRate: '0%',
      clickRate: '0%',
      createdAt: new Date().toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })
    });

    setFormTitle('');
    setFormDelay('immediate');
    setFormPromoCode('KORENI10');
    setFormSubjectSr('');
    setFormPreviewSr('');
    setFormBodySr('');
    setFormSubjectEn('');
    setFormPreviewEn('');
    setFormBodyEn('');
  };

  const handleEditClick = (version: WelcomeEmailVersion) => {
    setEditingEmail(version);
    setFormTitle(version.title);
    setFormDelay(version.delay);
    setFormPromoCode(version.promoCode);
    setFormSubjectSr(version.subjectSr);
    setFormPreviewSr(version.previewTextSr);
    setFormBodySr(version.bodySr);
    setFormSubjectEn(version.subjectEn);
    setFormPreviewEn(version.previewTextEn);
    setFormBodyEn(version.bodyEn);
  };

  const handleSaveVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSubjectSr.trim() || !formBodySr.trim()) {
      showToast("Molimo unesite naziv verzije, naslov i tekst poruke na srpskom.");
      return;
    }

    const delayLabels: Record<string, string> = {
      'immediate': 'Odmah po prijavi',
      '15m': 'Nakon 15 minuta',
      '1h': 'Nakon 1 sat',
      '24h': 'Nakon 24 sata'
    };

    const isFirst = welcomeEmails.length === 0;

    const newVersion: WelcomeEmailVersion = {
      id: editingEmail?.id || `welcome-${Date.now()}`,
      title: formTitle.trim(),
      isDefault: editingEmail ? editingEmail.isDefault : isFirst,
      status: editingEmail ? editingEmail.status : 'active',
      delay: formDelay,
      delayLabel: delayLabels[formDelay] || 'Odmah po prijavi',
      promoCode: formPromoCode.trim() || 'KORENI10',
      subjectSr: formSubjectSr.trim(),
      previewTextSr: formPreviewSr.trim(),
      bodySr: formBodySr.trim(),
      subjectEn: formSubjectEn.trim() || formSubjectSr.trim(),
      previewTextEn: formPreviewEn.trim() || formPreviewSr.trim(),
      bodyEn: formBodyEn.trim() || formBodySr.trim(),
      sentCount: editingEmail ? editingEmail.sentCount : 0,
      openRate: editingEmail ? editingEmail.openRate : '0%',
      clickRate: editingEmail ? editingEmail.clickRate : '0%',
      createdAt: editingEmail ? editingEmail.createdAt : new Date().toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    let updatedList: WelcomeEmailVersion[];
    if (editingEmail && welcomeEmails.some(v => v.id === editingEmail.id)) {
      updatedList = welcomeEmails.map(v => v.id === editingEmail.id ? newVersion : v);
    } else {
      updatedList = [newVersion, ...welcomeEmails];
    }

    saveWelcomeEmailsToStorage(updatedList);
    setEditingEmail(null);
    showToast(`Verzija pozdravnog mejla "${newVersion.title}" je sačuvana!`);
  };

  const handleSetDefaultVersion = (id: string) => {
    const updated = welcomeEmails.map(v => ({
      ...v,
      isDefault: v.id === id
    }));
    saveWelcomeEmailsToStorage(updated);
    showToast("Izabrana je primarna podrazumevana verzija pozdravnog mejla! 🌸");
  };

  const handleDeleteVersion = (id: string) => {
    if (welcomeEmails.length <= 1) {
      showToast("Morate imati bar jednu aktivnu verziju pozdravnog mejla.");
      return;
    }
    const updated = welcomeEmails.filter(v => v.id !== id);
    if (!updated.some(v => v.isDefault)) {
      updated[0].isDefault = true;
    }
    saveWelcomeEmailsToStorage(updated);
    showToast("Verzija pozdravnog mejla je obrisana.");
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      showToast("Nema pretplatnika za izvoz.");
      return;
    }
    const headers = "Email,Datum Prijave,Dodeljeni Servis (Stub),Kupon\n";
    const rows = subscribers.map(s => `"${s.email}","${s.subscribedAt}","${s.providerAssigned}","${s.promoCodeSent}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `savremeni_koreni_pretplatnici_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Objedinjena lista pretplatnika je izvezena u CSV!");
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    showToast(`E-mail ${email} je kopiran u clipboard!`);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Navigation Sub-Tabs */}
      <div className="bg-[#241D19] border border-[#C2872A]/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif text-[#E8D0A9] flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#C2872A]" />
              Upravljanje Pozdravnim Mejlovima & Kaskadnim Automatizacijama
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Kreirajte višekratne verzije "Welcome Email" sekvenci na srpskom i engleskom i pratite kaskadne e-mail stubove (Kit, MailerLite, EmailOctopus, Brevo).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('welcome_emails')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'welcome_emails'
                  ? 'bg-[#C2872A] text-stone-950 font-semibold shadow-md'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome Emails ({welcomeEmails.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('cascade_providers')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'cascade_providers'
                  ? 'bg-[#C2872A] text-stone-950 font-semibold shadow-md'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4 E-mail Stuba</span>
            </button>

            <button
              onClick={() => setActiveSubTab('subscribers')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'subscribers'
                  ? 'bg-[#C2872A] text-stone-950 font-semibold shadow-md'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Lista Pretplatnika ({subscribers.length})</span>
            </button>
          </div>
        </div>

        {/* SUB TAB 1: WELCOME EMAIL SEQUENCES */}
        {activeSubTab === 'welcome_emails' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <span>Aktivne Verzije Pozdravnih E-mail Poruka</span>
                  <span className="text-[10px] bg-[#C2872A]/20 text-[#E8D0A9] px-2 py-0.5 rounded border border-[#C2872A]/40">
                    Dvojezično (SR / EN)
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Novi pretplatnici dobijaju podrazumevanu verziju ili rotirajuću A/B test verziju odmah nakon prijave.
                </p>
              </div>

              <button
                onClick={handleCreateNewVersion}
                className="px-4 py-2 bg-[#C2872A] hover:bg-[#a87422] text-stone-950 font-medium text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Dodaj Novu Verziju Poruke</span>
              </button>
            </div>

            {/* List of Email Versions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {welcomeEmails.map((ver) => (
                <div
                  key={ver.id}
                  className={`bg-[#181310] border rounded-xl p-5 space-y-4 transition-all relative ${
                    ver.isDefault 
                      ? 'border-[#C2872A] shadow-lg shadow-[#C2872A]/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {ver.isDefault && (
                          <span className="bg-[#C2872A] text-stone-950 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3" /> Primarna Verzija
                          </span>
                        )}
                        <span className="bg-stone-800 text-stone-300 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#C2872A]" /> {ver.delayLabel}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white pt-1">{ver.title}</h4>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreviewEmail(ver)}
                        className="p-1.5 text-stone-400 hover:text-white bg-white/5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                        title="Predpregled poruke"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleEditClick(ver)}
                        className="p-1.5 text-stone-400 hover:text-[#E8D0A9] bg-white/5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                        title="Izmeni verziju"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteVersion(ver.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400 bg-white/5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                        title="Obriši verziju"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subject line preview */}
                  <div className="space-y-2 bg-[#121212] p-3 rounded-lg border border-stone-800 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 font-medium">🇷🇸 Naslov poruke (SR):</span>
                      <p className="text-stone-200 font-mono truncate">{ver.subjectSr}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 font-medium">🇬🇧 Subject (EN):</span>
                      <p className="text-stone-300 font-mono truncate">{ver.subjectEn}</p>
                    </div>
                  </div>

                  {/* Stats & Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-3 text-[11px] text-stone-400">
                      <span>Poslato: <strong className="text-white">{ver.sentCount}</strong></span>
                      <span>Otvaranje: <strong className="text-emerald-400">{ver.openRate}</strong></span>
                      <span>Klikovi: <strong className="text-amber-400">{ver.clickRate}</strong></span>
                    </div>

                    {!ver.isDefault && (
                      <button
                        onClick={() => handleSetDefaultVersion(ver.id)}
                        className="text-[11px] text-[#E8D0A9] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <span>Postavi kao glavnu</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FORM FOR CREATING / EDITING WELCOME EMAIL */}
            {editingEmail && (
              <div className="bg-[#181310] border border-[#C2872A]/50 rounded-2xl p-6 shadow-2xl space-y-6 mt-8 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-base font-serif text-[#E8D0A9] flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#C2872A]" />
                    {editingEmail.title ? `Uređivanje verzije: "${editingEmail.title}"` : 'Kreiranje nove verzije pozdravne poruke'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingEmail(null)}
                    className="text-xs text-stone-400 hover:text-white cursor-pointer"
                  >
                    Odustani
                  </button>
                </div>

                <form onSubmit={handleSaveVersion} className="space-y-6">
                  {/* General settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1 font-medium">
                        Naziv Verzije Poruke *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="npr. Specijalan Popust za Homoljske Šubare"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1 font-medium">
                        Vreme slanja (Delay)
                      </label>
                      <select
                        value={formDelay}
                        onChange={(e: any) => setFormDelay(e.target.value)}
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#C2872A] focus:outline-none"
                      >
                        <option value="immediate">Odmah po prijavi kupca</option>
                        <option value="15m">Nakon 15 minuta</option>
                        <option value="1h">Nakon 1 sat</option>
                        <option value="24h">Nakon 24 sata (Sledeći dan)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1 font-medium">
                        Kupon Kod popusta
                      </label>
                      <input
                        type="text"
                        value={formPromoCode}
                        onChange={(e) => setFormPromoCode(e.target.value)}
                        placeholder="KORENI10"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-[#E8D0A9] font-mono focus:border-[#C2872A] focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  {/* SRPSKA VERZIJA PORUKE */}
                  <div className="bg-[#121212] border border-stone-800 rounded-xl p-4 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8D0A9] flex items-center gap-1.5">
                      <span>🇷🇸</span> Poruka na Srpskom Jeziku
                    </h4>

                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1 font-medium">
                        Naslov poruke (Subject line) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formSubjectSr}
                        onChange={(e) => setFormSubjectSr(e.target.value)}
                        placeholder="🌸 Dobrodošli u Savremeni Koreni! Vaš 10% kupon popusta je tu"
                        className="w-full bg-[#181310] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1 font-medium">
                        Pre-header sažetak (Preview text)
                      </label>
                      <input
                        type="text"
                        value={formPreviewSr}
                        onChange={(e) => setFormPreviewSr(e.target.value)}
                        placeholder="Hvala Vam na poverenju. Unesite kod KORENI10..."
                        className="w-full bg-[#181310] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-300 placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1 font-medium">
                        Telo poruke (Body content) *
                      </label>
                      <textarea
                        rows={6}
                        required
                        value={formBodySr}
                        onChange={(e) => setFormBodySr(e.target.value)}
                        placeholder="Poštovani/a, Hvala Vam što ste postali deo porodice..."
                        className="w-full bg-[#181310] border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none leading-relaxed font-mono"
                      />
                    </div>
                  </div>

                  {/* ENGLESKA VERZIJA PORUKE */}
                  <div className="bg-[#121212] border border-stone-800 rounded-xl p-4 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8D0A9] flex items-center gap-1.5">
                      <span>🇬🇧</span> English Message Version
                    </h4>

                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1 font-medium">
                        Subject Line (English)
                      </label>
                      <input
                        type="text"
                        value={formSubjectEn}
                        onChange={(e) => setFormSubjectEn(e.target.value)}
                        placeholder="🌸 Welcome to Savremeni Koreni! Your 10% discount code inside"
                        className="w-full bg-[#181310] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1 font-medium">
                        Preview Text (English)
                      </label>
                      <input
                        type="text"
                        value={formPreviewEn}
                        onChange={(e) => setFormPreviewEn(e.target.value)}
                        placeholder="Thank you for joining. Use code KORENI10..."
                        className="w-full bg-[#181310] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-300 placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1 font-medium">
                        Message Body (English)
                      </label>
                      <textarea
                        rows={6}
                        value={formBodyEn}
                        onChange={(e) => setFormBodyEn(e.target.value)}
                        placeholder="Dear Customer, Thank you for joining..."
                        className="w-full bg-[#181310] border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none leading-relaxed font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingEmail(null)}
                      className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Odustani
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#C2872A] hover:bg-[#a87422] text-stone-950 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Sačuvaj Verziju Pozdravne Poruke</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* SUB TAB 2: CASCADE PROVIDERS */}
        {activeSubTab === 'cascade_providers' && (
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <span>Status 4 Povezana Kaskadna Autorispondera</span>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Besplatna Baza
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {providersStatus.map((p, idx) => (
                <div 
                  key={p.id}
                  className={`bg-gradient-to-br ${p.color} border rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-stone-900/80 px-2 py-0.5 rounded text-stone-300">
                        Stub #{idx + 1}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Povezano
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white pt-1">{p.name}</h4>
                    <p className="text-[11px] text-stone-300 italic">{p.tier}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-[11px]">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Kapacitet:</span>
                      <span className="font-semibold text-white">{p.limit}</span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono truncate">
                      {p.apiKeyStatus}
                    </div>
                  </div>

                  <a
                    href={p.dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[11px] text-[#E8D0A9] hover:underline flex items-center gap-1 font-medium pt-1"
                  >
                    <span>Otvori nalog</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB TAB 3: SUBSCRIBERS LIST */}
        {activeSubTab === 'subscribers' && (
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif text-[#E8D0A9] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C2872A]" />
                Objedinjena Baza Pretplatnika Sa Sajta ({subscribers.length})
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadSubscribers}
                  className="text-xs text-stone-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Osveži</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 bg-[#C2872A] hover:bg-[#a87422] text-stone-950 font-medium text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Izvezi CSV</span>
                </button>
              </div>
            </div>

            {subscribers.length === 0 ? (
              <div className="p-8 text-center text-stone-400 bg-[#121212] rounded-xl border border-stone-800">
                Još uvek nema unetih pretplatnika u bazi. Kada posetioci unesu e-mail u pop-up za 10% popusta, ovde će se automatski pojaviti!
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181310] text-[#E8D0A9] uppercase tracking-wider text-[10px] font-medium border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">E-mail Adresa</th>
                      <th className="py-3 px-4">Datum Prijave</th>
                      <th className="py-3 px-4">Dodeljeni Stub (Servis)</th>
                      <th className="py-3 px-4">Kupon Popusta</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 bg-[#121212] text-stone-300">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-medium text-white font-mono flex items-center gap-2">
                          <span>{sub.email}</span>
                          <button
                            onClick={() => handleCopyEmail(sub.email)}
                            className="text-stone-500 hover:text-white transition-colors p-1"
                            title="Kopiraj e-mail"
                          >
                            {copiedEmail === sub.email ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-stone-400">{sub.subscribedAt}</td>
                        <td className="py-3 px-4">
                          <span className="bg-[#C2872A]/20 text-[#E8D0A9] px-2.5 py-1 rounded-full border border-[#C2872A]/30 text-[11px] font-medium">
                            {sub.providerAssigned}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30 font-mono text-[10px]">
                            {sub.promoCodeSent} (-10%)
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Poslat Mejl
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PREVIEW EMAIL MODAL */}
      {previewEmail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#181310] border border-[#C2872A]/40 rounded-2xl max-w-xl w-full p-6 space-y-5 relative shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#C2872A]" />
                <h3 className="text-sm font-bold text-white">Predpregled Pozdravnog E-maila</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewLang(previewLang === 'sr' ? 'en' : 'sr')}
                  className="px-2.5 py-1 bg-stone-800 text-stone-300 hover:text-white text-xs rounded-lg border border-stone-700 cursor-pointer"
                >
                  Jezik: {previewLang === 'sr' ? '🇷🇸 Srpski' : '🇬🇧 English'}
                </button>
                <button
                  onClick={() => setPreviewEmail(null)}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Simulated Email Client UI */}
            <div className="bg-white text-stone-900 rounded-xl p-6 space-y-4 shadow-inner text-sm leading-relaxed">
              <div className="border-b border-stone-200 pb-3 space-y-1 text-xs text-stone-600">
                <p><strong>Od:</strong> Savremeni Koreni &lt;info@savremenikoreni.rs&gt;</p>
                <p><strong>Za:</strong> kupac@gmail.com</p>
                <p><strong>Naslov:</strong> {previewLang === 'sr' ? previewEmail.subjectSr : previewEmail.subjectEn}</p>
              </div>

              <div className="whitespace-pre-line text-stone-800 pt-2 font-serif text-sm">
                {previewLang === 'sr' ? previewEmail.bodySr : previewEmail.bodyEn}
              </div>

              <div className="pt-4 border-t border-stone-200 text-center">
                <a
                  href="https://savremenikoreni.rs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2.5 bg-[#C2872A] text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Iskoristi Kupon ({previewEmail.promoCode})
                </a>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setPreviewEmail(null)}
                className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs rounded-xl transition-all cursor-pointer"
              >
                Zatvori Pregled
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
