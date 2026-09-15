import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Building2, FileText, Phone, Mail, MapPin, Calendar, Award } from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { useLogo } from '../context/LogoContext';
import { useLanguage } from '../context/LanguageContext';

export const CompanyVerification: React.FC = () => {
  const { logoUrl } = useLogo();
  const { t, isEn } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const copyAllDetails = () => {
    const all = isEn 
      ? `LEGAL BUSINESS ENTITY DETAILS:
Name: ${companyDetails.legalName}
Short: ${companyDetails.shortName}
Owner: ${companyDetails.owner}
Tax ID (PIB): ${companyDetails.pib}
Registration No. (MB): ${companyDetails.maticniBroj}
Activity: ${companyDetails.activityCode} - ${companyDetails.activityName}
Address: ${companyDetails.address.street} ${companyDetails.address.number}, ${companyDetails.address.postalCode} ${companyDetails.address.city}, Municipality ${companyDetails.address.municipality}
Phone: ${companyDetails.phoneFormatted}
Email: ${companyDetails.email}
Status: ${companyDetails.status}`
      : `PRAVNI PODACI PREDUZEĆA:
Naziv: ${companyDetails.legalName}
Skraćeno: ${companyDetails.shortName}
Vlasnik: ${companyDetails.owner}
PIB: ${companyDetails.pib}
Matični broj: ${companyDetails.maticniBroj}
Šifra delatnosti: ${companyDetails.activityCode} - ${companyDetails.activityName}
Sedište: ${companyDetails.address.street} ${companyDetails.address.number}, ${companyDetails.address.postalCode} ${companyDetails.address.city}, Opština ${companyDetails.address.municipality}
Telefon: ${companyDetails.phoneFormatted}
Email: ${companyDetails.email}
Status: ${companyDetails.status}`;
    copyToClipboard(all, 'all');
  };

  return (
    <section id="podaci-firme" className="py-20 bg-[#FAF7F2] text-[#241D19] border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4E6852]/15 text-[#4E6852] text-xs font-semibold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.legalBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241D19] tracking-tight">
            {t.legalTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#241D19]/75 leading-relaxed">
            {t.legalSubtitle}
          </p>
        </div>

        {/* Verification Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
          {/* Card Banner */}
          <div className="bg-[#241D19] text-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C2872A] shadow-lg bg-[#161210] shrink-0 hidden sm:block">
                <img
                  src={logoUrl}
                  alt="Zvanični žig i amblem Savremeni Koreni"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E8D0A9] font-bold block">
                  {isEn ? 'Serbian Business Registers Agency • APR RS' : 'Agencija za privredne registre • APR RS'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  {companyDetails.shortName}
                </h3>
                <p className="text-xs text-[#FAF7F2]/80 font-mono">
                  {companyDetails.legalName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4E6852] text-white text-xs font-semibold shadow-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.legalStatus}</span>
              </span>
            </div>
          </div>

          {/* Key Identifiers (PIB & MB) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 sm:p-8 bg-[#FAF7F2]/60 border-b border-[#E8E0D5]">
            {/* PIB Box */}
            <div className="p-4 rounded-xl bg-white border border-[#E8E0D5] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#241D19]/60 block">
                  {t.legalPib}
                </span>
                <span className="font-mono text-2xl font-bold text-[#9E3E26]">
                  {companyDetails.pib}
                </span>
              </div>

              <button
                onClick={() => copyToClipboard(companyDetails.pib, 'pib')}
                className="p-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F4E8E3] text-[#241D19] border border-[#E8E0D5] transition-colors cursor-pointer"
                title="Kopiraj PIB"
              >
                {copiedField === 'pib' ? (
                  <Check className="w-4 h-4 text-[#4E6852]" />
                ) : (
                  <Copy className="w-4 h-4 text-[#241D19]/70" />
                )}
              </button>
            </div>

            {/* MB Box */}
            <div className="p-4 rounded-xl bg-white border border-[#E8E0D5] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#241D19]/60 block">
                  {t.legalMb}
                </span>
                <span className="font-mono text-2xl font-bold text-[#241D19]">
                  {companyDetails.maticniBroj}
                </span>
              </div>

              <button
                onClick={() => copyToClipboard(companyDetails.maticniBroj, 'mb')}
                className="p-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F4E8E3] text-[#241D19] border border-[#E8E0D5] transition-colors cursor-pointer"
                title="Kopiraj Matični broj"
              >
                {copiedField === 'mb' ? (
                  <Check className="w-4 h-4 text-[#4E6852]" />
                ) : (
                  <Copy className="w-4 h-4 text-[#241D19]/70" />
                )}
              </button>
            </div>
          </div>

          {/* Detailed Data List */}
          <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              
              <div className="flex items-start gap-3 py-2 border-b border-[#E8E0D5]/70">
                <Building2 className="w-4 h-4 text-[#9E3E26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#241D19]/60 block">{isEn ? 'Founder & Authorized Person:' : 'Osnivač i ovlašćeno lice:'}</span>
                  <span className="font-semibold text-[#241D19] text-base">{companyDetails.owner}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b border-[#E8E0D5]/70">
                <FileText className="w-4 h-4 text-[#9E3E26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#241D19]/60 block">{t.legalActivity}:</span>
                  <span className="font-semibold text-[#241D19]">
                    {companyDetails.activityCode} – {isEn ? 'Hand embroidery, manufacture of other outerwear and ethnic handicrafts' : companyDetails.activityName}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b border-[#E8E0D5]/70">
                <MapPin className="w-4 h-4 text-[#9E3E26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#241D19]/60 block">{t.legalAddress}:</span>
                  <span className="font-semibold text-[#241D19]">
                    {companyDetails.address.street} {companyDetails.address.number}, {companyDetails.address.postalCode} {companyDetails.address.city} (Žagubica)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b border-[#E8E0D5]/70">
                <Calendar className="w-4 h-4 text-[#9E3E26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#241D19]/60 block">{isEn ? 'Registration Date:' : 'Datum osnivanja:'}</span>
                  <span className="font-semibold text-[#241D19]">{companyDetails.establishedDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b border-[#E8E0D5]/70">
                <Phone className="w-4 h-4 text-[#9E3E26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#241D19]/60 block">{isEn ? 'Contact Phone:' : 'Kontakt telefon:'}</span>
                  <a href={`tel:${companyDetails.phone}`} className="font-semibold text-[#9E3E26] hover:underline">
                    {companyDetails.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b border-[#E8E0D5]/70">
                <Mail className="w-4 h-4 text-[#9E3E26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#241D19]/60 block">{isEn ? 'Official Email:' : 'Zvanični email:'}</span>
                  <a href={`mailto:${companyDetails.email}`} className="font-semibold text-[#241D19] hover:underline">
                    {companyDetails.email}
                  </a>
                </div>
              </div>

            </div>

            {/* Certifications and Membership */}
            <div className="pt-4 border-t border-[#E8E0D5]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#241D19]/70 block mb-2">
                {isEn ? 'Recognitions & Certifications' : 'Priznanja i sertifikati'}
              </span>
              <div className="flex flex-wrap gap-2">
                {companyDetails.associations.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] text-xs font-medium text-[#241D19]"
                  >
                    <Award className="w-3.5 h-3.5 text-[#C2872A]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Copy All Data CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#241D19]/60">
                {isEn ? 'Need official business details for invoice or bank wire payment?' : 'Potrebni su vam podaci za uplatu na račun ili izradu profakture?'}
              </span>

              <button
                onClick={copyAllDetails}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#241D19] hover:bg-[#3B2F28] text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                {copiedField === 'all' ? (
                  <>
                    <Check className="w-4 h-4 text-[#C2872A]" />
                    <span>{t.legalCopySuccess}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.legalCopyAll}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
