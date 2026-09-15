import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Compass, Car, Calendar, ExternalLink, ShieldCheck, CheckCircle2, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { companyDetails } from '../data/companyData';

interface RouteDistance {
  from: string;
  fromEn: string;
  distance: string;
  time: string;
  via: string;
  viaEn: string;
}

const routeDistances: RouteDistance[] = [
  {
    from: 'Beograd',
    fromEn: 'Belgrade',
    distance: '~145 km',
    time: '~2h 10min',
    via: 'Autoput A1 do Požarevca, zatim magistralom ka Petrovcu na Mlavi i Žagubici',
    viaEn: 'Highway A1 to Požarevac, then regional road via Petrovac na Mlavi to Žagubica'
  },
  {
    from: 'Požarevac',
    fromEn: 'Požarevac',
    distance: '~65 km',
    time: '~55 min',
    via: 'Putem Požarevac - Kučevo / Petrovac - Žagubica',
    viaEn: 'Direct regional road Požarevac – Petrovac – Žagubica'
  },
  {
    from: 'Bor / Zaječar',
    fromEn: 'Bor / Zaječar',
    distance: '~55 km',
    time: '~50 min',
    via: 'Preko Crnog Vrha ili Gornjaka ka Homolju',
    viaEn: 'Via Crni Vrh / Borsko Jezero into the heart of Homolje'
  },
  {
    from: 'Niš / Južna Srbija',
    fromEn: 'Niš / South Serbia',
    distance: '~150 km',
    time: '~2h 15min',
    via: 'Autoput ka Ćupriji / Despotovcu i prelaz ka Žagubici',
    viaEn: 'Highway to Ćuprija / Despotovac and pass into Žagubica'
  }
];

export const AtelierMapSection: React.FC = () => {
  const { isEn } = useLanguage();
  const [copiedCoords, setCopiedCoords] = useState(false);

  const coordinatesText = '44.2547, 21.7825';
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=44.2547,21.7825`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=Pesku%C5%A1a+9,+12318+Jo%C5%A1anica,+%C5%BDagubica,+Serbia`;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(coordinatesText);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <section id="atelje-lokacija" className="py-20 bg-white text-[#241D19] border-b border-[#E8E0D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E3E26]/10 text-[#9E3E26] text-xs font-semibold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#9E3E26]" />
            <span>{isEn ? 'Local SEO & Atelier Visit' : 'Lokalni Atelje • Homolje • Jošanica'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#241D19]">
            {isEn ? 'Atelier & Workshop in the Heart of Homolje' : 'Atelje i Radionica u Srcu Homolja'}
          </h2>

          <p className="text-sm sm:text-base text-[#241D19]/75 leading-relaxed">
            {isEn
              ? 'Visit our workshop in Jošanica (Žagubica municipality), Eastern Serbia. Experience traditional 5-needle hand knitting, custom fitting for folk costumes, and pickup for bespoke orders.'
              : 'Posetite našu autentičnu radionicu u selu Jošanica (opština Žagubica). Upoznajte majstora Tanju Petrić, pogledajte proces ručnog veza i pletenja ili lično preuzmite vašu porudžbinu.'}
          </p>
        </div>

        {/* Main Grid: Interactive Map Card + Visit Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map & Live Navigation */}
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl border border-[#E8E0D5] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E3E26] block">
                    {isEn ? 'Geo-Coordinates & Pinpoint' : 'GPS Koordinate Ateljea'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#241D19]">
                    Jošanica (Peskuša 9), 12318 Žagubica
                  </h3>
                </div>

                <button
                  onClick={copyCoordinates}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E8E0D5] hover:bg-[#F4E8E3] text-xs font-mono text-[#241D19] transition-colors cursor-pointer"
                  title="Kopiraj GPS koordinate"
                >
                  {copiedCoords ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4E6852]" />
                      <span className="text-[#4E6852] font-sans font-semibold">{isEn ? 'Copied' : 'Kopirano'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#241D19]/70" />
                      <span>44°15'17"N 21°46'57"E</span>
                    </>
                  )}
                </button>
              </div>

              {/* Map Container with Google Maps Embed */}
              <div className="relative w-full h-72 sm:h-84 rounded-xl overflow-hidden border border-[#E8E0D5] bg-[#EAE5DC] shadow-inner group">
                <iframe
                  title="Savremeni Koreni Atelje Jošanica Žagubica Google Mapa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45464.73977531742!2d21.7456722!3d44.2547222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4751478e24483a93%3A0x6b4fbff1ba3f07a7!2zSm_FoWFuaWNhLCDQodGA0LHQuNGY0LA!5e0!3m2!1ssr!2srs!4v1710000000000!5m2!1ssr!2srs"
                  className="w-full h-full border-0 filter saturate-90 contrast-105"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Overlay Badge */}
                <div className="absolute top-3 left-3 bg-[#241D19]/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg border border-white/10 text-xs flex items-center gap-2 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9E3E26] animate-pulse" />
                  <span className="font-semibold">{isEn ? 'Atelier Savremeni Koreni' : 'Atelje Savremeni Koreni'}</span>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Open Live Route' : 'Navigiraj (Google Maps)'}</span>
                </a>
              </div>
            </div>

            {/* Direct Google Action CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{isEn ? 'Get Driving Directions' : 'Uputstvo za vožnju'}</span>
              </a>

              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#241D19] border border-[#E8E0D5] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#9E3E26]" />
                <span>{isEn ? 'View in Google Maps' : 'Pregledaj u Google Mapama'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Distance from Cities & Visit Guidelines */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Atelier Visiting Guidelines Card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8E0D5] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#9E3E26]">
                <Calendar className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold text-[#241D19]">
                  {isEn ? 'Visiting & Consultation by Appointment' : 'Posete uz prethodnu najavu'}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#241D19]/80 leading-relaxed">
                {isEn
                  ? 'Since Tanja Petrić personally crafts each bespoke item, we kindly invite you to give us a brief phone or WhatsApp notice prior to your arrival.'
                  : 'Kako majstor Tanja lično ručno izrađuje unikatne komade, molimo vas da posetu najavite telefonskim pozivom ili porukom na WhatsApp radi usklađivanja termina.'}
              </p>

              <div className="space-y-2 pt-1 text-xs text-[#241D19]">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E8E0D5]">
                  <span className="text-[#241D19]/60">{isEn ? 'Working Hours:' : 'Radno vreme ateljea:'}</span>
                  <span className="font-bold text-[#241D19]">{companyDetails.workingHours}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E8E0D5]">
                  <span className="text-[#241D19]/60">{isEn ? 'Phone / WhatsApp:' : 'Telefon / Viber:'}</span>
                  <a href={`tel:${companyDetails.phone}`} className="font-bold text-[#9E3E26] hover:underline">
                    {companyDetails.phoneFormatted}
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E8E0D5]">
                  <span className="text-[#241D19]/60">{isEn ? 'Order Pickup:' : 'Lično preuzimanje:'}</span>
                  <span className="font-bold text-[#4E6852]">{isEn ? 'Available in Jošanica' : 'Dostupno u Jošanici'}</span>
                </div>
              </div>
            </div>

            {/* Driving Distances Accordion / Grid */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#4E6852]">
                <Car className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-base font-bold text-[#241D19]">
                  {isEn ? 'Distance from Major Cities' : 'Udaljenost i rute do ateljea'}
                </h3>
              </div>

              <div className="space-y-2.5 pt-1">
                {routeDistances.map((route, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]/70 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#241D19]">
                        {isEn ? route.fromEn : route.from} → Jošanica
                      </span>
                      <span className="font-mono font-bold text-[#9E3E26]">
                        {route.distance} ({route.time})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#241D19]/65 leading-tight">
                      {isEn ? route.viaEn : route.via}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
