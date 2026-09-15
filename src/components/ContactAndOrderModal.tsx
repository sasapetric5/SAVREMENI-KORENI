import React, { useState, useEffect } from 'react';
import { X, Send, Phone, Mail, MapPin, CheckCircle, Clock, MessageSquare, MessageCircle, AlertCircle, CreditCard, Lock, ShieldCheck, Wallet, Building } from 'lucide-react';
import { companyDetails, productsData } from '../data/companyData';
import { OrderInquiry } from '../types';
import { trackConversion } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';
import { InteractiveCreditCard, CardBrandId } from './InteractiveCreditCard';

interface ContactAndOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
}

export const ContactAndOrderModal: React.FC<ContactAndOrderModalProps> = ({
  isOpen,
  onClose,
  prefilledProduct = '',
}) => {
  const { t, isEn } = useLanguage();
  const { formatProduct } = useCurrency();
  const defaultProduct = isEn ? 'General Inquiry / Custom Bespoke Order' : 'Opšti upit / Izrada po meri';

  const [formData, setFormData] = useState<OrderInquiry>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    productName: prefilledProduct || defaultProduct,
    customRequirements: '',
    preferredContactMethod: 'telefon',
    paymentMethod: 'kartica',
    cardDetails: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      cardBrand: 'visa',
    },
  });

  const [selectedBrand, setSelectedBrand] = useState<CardBrandId>('visa');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, productName: prefilledProduct }));
    }
    if (isOpen) {
      trackConversion('order_inquiry_open', {
        product: prefilledProduct || 'General',
      });
    }
  }, [prefilledProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert(isEn ? 'Please enter your name and phone number.' : 'Molimo vas unesite ime i broj telefona.');
      return;
    }

    if (formData.paymentMethod === 'kartica') {
      if (!formData.cardDetails?.cardNumber || !formData.cardDetails?.expiryDate || !formData.cardDetails?.cvv) {
        alert(isEn ? 'Please fill in all credit card payment details.' : 'Molimo vas popunite sve podatke za plaćanje karticom.');
        return;
      }
    }

    const ref = 'SK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(ref);
    setSubmitted(true);

    trackConversion('order_inquiry_sent', {
      order_ref: ref,
      product_name: formData.productName,
      contact_method: formData.preferredContactMethod,
      payment_method: formData.paymentMethod,
      has_custom_requirements: !!formData.customRequirements,
    });
  };

  const handleWhatsAppDirect = () => {
    trackConversion('whatsapp_click', {
      source: 'order_modal',
      product_name: formData.productName,
    });
    const greeting = isEn
      ? `Hello Tanja! I am contacting you from the Savremeni Koreni website.\nName: ${formData.fullName || 'Interested customer'}\nPhone: ${formData.phone || ''}\nProduct / Wish: ${formData.productName}\nDetails: ${formData.customRequirements || 'I would like more details regarding an order.'}`
      : `Dobar dan Tanja! Javljam se sa sajta Savremeni Koreni.\nMoje ime: ${formData.fullName || 'Zainteresovani kupac'}\nTelefon: ${formData.phone || ''}\nProizvod / Želja: ${formData.productName}\nDetalji: ${formData.customRequirements || 'Želim više informacija o narudžbini.'}`;
    const text = encodeURIComponent(greeting);
    window.open(`https://wa.me/381603318319?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E0D5] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E8E0D5] sticky top-0 z-10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#9E3E26] block">
              Savremeni Koreni • Jošanica
            </span>
            <h3 className="font-serif text-xl font-bold text-[#241D19]">
              {submitted ? (isEn ? 'Inquiry Sent Successfully' : 'Upit uspešno poslat') : (isEn ? 'Order & Custom Inquiry' : 'Poručivanje i Upit za Unikat')}
            </h3>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <CurrencySelector variant="topbar" />
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-[#FAF7F2] hover:bg-[#9E3E26] text-[#241D19] hover:text-white rounded-full border border-[#E8E0D5] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center group shrink-0"
              aria-label={isEn ? 'Close order form' : 'Zatvori prozor'}
              title={isEn ? 'Close (ESC)' : 'Zatvori (ESC)'}
            >
              <X className="w-5 h-5 stroke-[2.5] transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#4E6852]/15 text-[#4E6852] flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-[#241D19]">
                  {isEn ? 'Thank you for your trust!' : 'Hvala vam na poverenju!'}
                </h4>
                <p className="text-sm text-[#241D19]/80 max-w-md mx-auto leading-relaxed">
                  {isEn ? (
                    <>Your inquiry under reference <strong className="font-mono text-[#9E3E26]">{orderRef}</strong> has been received. Tanja Petrić will contact you personally as soon as possible ({formData.preferredContactMethod}) to confirm details, sizing, and delivery.</>
                  ) : (
                    <>Vaš upit pod brojem <strong className="font-mono text-[#9E3E26]">{orderRef}</strong> je uspešno zabeležen. Tanja Petrić će vas lično kontaktirati u najkraćem roku ({formData.preferredContactMethod}) radi potvrde detalja, mera i slanja.</>
                  )}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E8E0D5] text-xs max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#241D19]/60">{isEn ? 'Selected Piece:' : 'Naručeni model:'}</span>
                  <span className="font-semibold text-[#241D19]">{formData.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#241D19]/60">{isEn ? 'Customer:' : 'Kupac:'}</span>
                  <span className="font-semibold text-[#241D19]">{formData.fullName} ({formData.phone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#241D19]/60">{isEn ? 'Delivery:' : 'Isporuka:'}</span>
                  <span className="font-semibold text-[#241D19]">{isEn ? 'Post Express courier (Serbia / Int.)' : 'Post Express kurir'}</span>
                </div>
                <div className="flex justify-between border-t border-[#E8E0D5] pt-2 mt-1">
                  <span className="text-[#241D19]/60">{isEn ? 'Payment Method:' : 'Način plaćanja:'}</span>
                  <span className="font-bold text-[#9E3E26] flex items-center gap-1">
                    {formData.paymentMethod === 'kartica' && <><CreditCard className="w-3.5 h-3.5" /> {isEn ? 'Card (Visa / Mastercard)' : 'Platna kartica (Visa / Mastercard)'}</>}
                    {formData.paymentMethod === 'pouzece' && <><Wallet className="w-3.5 h-3.5" /> {isEn ? 'Cash on Delivery' : 'Pouzećem pri preuzimanju'}</>}
                    {formData.paymentMethod === 'racun' && <><Building className="w-3.5 h-3.5" /> {isEn ? 'E-Banking / IPS' : 'Uplata na račun / IPS QR'}</>}
                    {formData.paymentMethod === 'paypal' && <>PayPal (EUR / USD)</>}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-semibold shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isEn ? 'Confirm Instantly on WhatsApp' : 'Potvrdi odmah preko WhatsApp-a'}</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#E8E0D5] hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold text-[#241D19]"
                >
                  {isEn ? 'Close' : 'Zatvori'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Quick direct contact note */}
              <div className="p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#241D19]/80">
                  {isEn ? 'Need faster answers or a direct phone consultation?' : 'Želite brži odgovor ili direktan poziv?'}
                </span>
                <a
                  href={`tel:${companyDetails.phone}`}
                  className="font-bold text-[#9E3E26] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {companyDetails.phoneFormatted}
                </a>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold text-[#241D19] uppercase tracking-wider mb-1.5">
                  {isEn ? 'Selected Piece / Commission Request' : 'Proizvod / Zahtev za izradu'}
                </label>
                <select
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E0D5] rounded-xl text-xs sm:text-sm text-[#241D19] focus:outline-hidden focus:border-[#9E3E26]"
                >
                  <option value={defaultProduct}>{isEn ? 'Custom Bespoke Creation by Request' : 'Unikat po mojoj meri / želji'}</option>
                  {productsData.map((p) => {
                    const priceInfo = formatProduct(p);
                    const label = isEn && p.nameEn ? p.nameEn : p.name;
                    const priceDisplay = priceInfo.isConverted
                      ? `${priceInfo.formatted} (${priceInfo.rsdFormatted})`
                      : `${priceInfo.rsdFormatted} ${p.priceEur ? `(~€${p.priceEur})` : ''}`;

                    return (
                      <option key={p.id} value={label}>
                        {label} — {priceDisplay}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241D19] mb-1">
                    {isEn ? 'Full Name *' : 'Ime i prezime *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isEn ? 'e.g. Milica Jovanović' : 'npr. Milica Jovanović'}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E0D5] rounded-xl text-xs sm:text-sm text-[#241D19] focus:outline-hidden focus:border-[#9E3E26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241D19] mb-1">
                    {isEn ? 'Phone Number (for courier & confirmation) *' : 'Broj telefona (za kurira i potvrdu) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isEn ? 'e.g. +381 64 123 4567' : 'npr. 064 123 4567'}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E0D5] rounded-xl text-xs sm:text-sm text-[#241D19] focus:outline-hidden focus:border-[#9E3E26]"
                  />
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241D19] mb-1">
                    {isEn ? 'Email Address (optional)' : 'Email adresa (opciono)'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E0D5] rounded-xl text-xs sm:text-sm text-[#241D19] focus:outline-hidden focus:border-[#9E3E26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241D19] mb-1">
                    {isEn ? 'City / Town' : 'Grad / Mesto isporuke'}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder={isEn ? 'e.g. Belgrade, Novi Sad, Vienna...' : 'npr. Beograd, Novi Sad, Požarevac...'}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E0D5] rounded-xl text-xs sm:text-sm text-[#241D19] focus:outline-hidden focus:border-[#9E3E26]"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-[#241D19] mb-1">
                  {isEn ? 'Street Address for Delivery' : 'Ulica i broj za Post Express'}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={isEn ? 'Street name, building/apartment number' : 'Ulica i kućni broj, stan (možete javiti i telefonom)'}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E0D5] rounded-xl text-xs sm:text-sm text-[#241D19] focus:outline-hidden focus:border-[#9E3E26]"
                />
              </div>

              {/* Custom Requirements / Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#241D19] mb-1">
                  {isEn ? 'Special requests, custom sizing or notes' : 'Posebne želje, mere ili napomene'}
                </label>
                <textarea
                  rows={3}
                  value={formData.customRequirements}
                  onChange={(e) => setFormData({ ...formData, customRequirements: e.target.value })}
                  placeholder={isEn ? 'Specify hat size (cm), sock shoe size, custom embroidery motif or preferred colors...' : 'Navedite veličinu šubare, broj čarapa, željenu boju veza ili opis unikatnog modela...'}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E0D5] rounded-xl text-xs sm:text-sm text-[#241D19] focus:outline-hidden focus:border-[#9E3E26] resize-none"
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-semibold text-[#241D19] mb-1.5">
                  {isEn ? 'Preferred confirmation method:' : 'Kako želite da vas kontaktiramo za potvrdu?'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'telefon', label: isEn ? 'Phone Call' : 'Poziv telefonom' },
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'viber', label: 'Viber' },
                    { id: 'email', label: 'Email' },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setFormData({ ...formData, preferredContactMethod: m.id as any })}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        formData.preferredContactMethod === m.id
                          ? 'bg-[#9E3E26] text-white border-[#9E3E26]'
                          : 'bg-white text-[#241D19] border-[#E8E0D5] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#241D19] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>{isEn ? 'Choose Payment Method *' : 'Izaberite način plaćanja *'}</span>
                  <span className="text-[10px] text-[#241D19]/60 font-normal flex items-center gap-1 normal-case">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4E6852]" />
                    {isEn ? '256-bit SSL Encrypted' : 'Sigurna 256-bit enkripcija'}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                  {/* Card Option */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'kartica' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'kartica'
                        ? 'border-[#9E3E26] bg-[#9E3E26]/5 ring-1 ring-[#9E3E26]'
                        : 'border-[#E8E0D5] bg-white hover:border-[#9E3E26]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-[#241D19] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#9E3E26]" />
                        {isEn ? 'Payment Card' : 'Platna kartica'}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#4E6852]/10 text-[#4E6852] font-semibold">
                        {isEn ? 'Instant' : 'Najbrže'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#241D19]/70 leading-tight">
                      {isEn ? 'Visa, Mastercard, Maestro, DinaCard (domestic & int.)' : 'Visa, Mastercard, Maestro, DinaCard (domaće i strane)'}
                    </p>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'pouzece' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'pouzece'
                        ? 'border-[#9E3E26] bg-[#9E3E26]/5 ring-1 ring-[#9E3E26]'
                        : 'border-[#E8E0D5] bg-white hover:border-[#9E3E26]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-[#241D19] flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-[#9E3E26]" />
                        {isEn ? 'Cash on Delivery' : 'Pouzećem (Gotovina)'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#241D19]/70 leading-tight">
                      {isEn ? 'Pay in cash upon Post Express courier delivery' : 'Plaćanje gotovinom pri preuzimanju pošiljke od kurira'}
                    </p>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'racun' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'racun'
                        ? 'border-[#9E3E26] bg-[#9E3E26]/5 ring-1 ring-[#9E3E26]'
                        : 'border-[#E8E0D5] bg-white hover:border-[#9E3E26]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-[#241D19] flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-[#9E3E26]" />
                        {isEn ? 'Bank Transfer / IPS' : 'E-Banking / IPS QR'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#241D19]/70 leading-tight">
                      {isEn ? 'Direct transfer via mobile bank app / IPS code' : 'Uplata na tekući račun ili skeniranjem IPS QR koda'}
                    </p>
                  </div>

                  {/* PayPal / International */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'paypal'
                        ? 'border-[#9E3E26] bg-[#9E3E26]/5 ring-1 ring-[#9E3E26]'
                        : 'border-[#E8E0D5] bg-white hover:border-[#9E3E26]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-[#241D19] flex items-center gap-1.5">
                        <span className="font-serif italic font-bold text-[#003087]">P</span>
                        {isEn ? 'PayPal / Intl Transfer' : 'PayPal / Inostranstvo'}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#241D19]/10 text-[#241D19] font-semibold">
                        EUR / USD / CHF
                      </span>
                    </div>
                    <p className="text-[11px] text-[#241D19]/70 leading-tight">
                      {isEn ? 'For diaspora & international buyers outside Serbia' : 'Za kupce iz dijaspore i inostranstva van Srbije'}
                    </p>
                  </div>
                </div>

                {/* Credit Card Section with Mini Cards & Large Interactive Card Preview */}
                {formData.paymentMethod === 'kartica' && (
                  <div className="p-4 bg-white rounded-xl border border-[#9E3E26]/30 shadow-xs space-y-4 my-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-2">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#4E6852]" />
                        <span className="text-xs font-bold text-[#241D19]">
                          {isEn ? 'Interactive Card Checkout' : 'Interaktivno plaćanje karticom'}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#4E6852] font-semibold bg-[#4E6852]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        3D Secure Verified
                      </span>
                    </div>

                    {/* 1. Large Realistic Interactive Credit Card Preview */}
                    <div className="pt-1">
                      <InteractiveCreditCard
                        selectedBrand={selectedBrand}
                        onSelectBrand={(brand) => {
                          setSelectedBrand(brand);
                          setFormData((prev) => ({
                            ...prev,
                            cardDetails: { ...prev.cardDetails!, cardBrand: brand },
                          }));
                        }}
                        cardNumber={formData.cardDetails?.cardNumber || ''}
                        cardHolder={formData.cardDetails?.cardHolder || ''}
                        expiryDate={formData.cardDetails?.expiryDate || ''}
                        cvv={formData.cardDetails?.cvv || ''}
                        isFlipped={isCardFlipped}
                        isEn={isEn}
                      />
                    </div>

                    {/* 2. Inputs Form */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#241D19] mb-1">
                          {isEn ? 'Card Number *' : 'Broj platne kartice *'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required={formData.paymentMethod === 'kartica'}
                            maxLength={19}
                            value={formData.cardDetails?.cardNumber || ''}
                            onFocus={() => setIsCardFlipped(false)}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, '');
                              const formatted = raw.replace(/(.{4})/g, '$1 ').trim();

                              // Auto-detect brand based on prefix
                              let detected: CardBrandId = selectedBrand;
                              if (raw.startsWith('4')) detected = 'visa';
                              else if (raw.startsWith('5')) detected = 'mastercard';
                              else if (raw.startsWith('9840')) detected = 'dinacard';
                              else if (raw.startsWith('34') || raw.startsWith('37')) detected = 'amex';
                              else if (raw.startsWith('50')) detected = 'maestro';
                              else if (raw.startsWith('6011')) detected = 'discover';
                              else if (raw.startsWith('62')) detected = 'unionpay';

                              if (detected !== selectedBrand) {
                                setSelectedBrand(detected);
                              }

                              setFormData({
                                ...formData,
                                cardDetails: {
                                  ...formData.cardDetails!,
                                  cardNumber: formatted,
                                  cardBrand: detected,
                                },
                              });
                            }}
                            placeholder="4532 •••• •••• 8892"
                            className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-xs font-mono font-semibold text-[#241D19] focus:outline-hidden focus:border-[#9E3E26] focus:bg-white"
                          />
                          <CreditCard className="w-4 h-4 text-[#9E3E26] absolute left-3 top-3" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#241D19] mb-1">
                            {isEn ? 'Name on Card *' : 'Ime i prezime na kartici *'}
                          </label>
                          <input
                            type="text"
                            required={formData.paymentMethod === 'kartica'}
                            value={formData.cardDetails?.cardHolder || ''}
                            onFocus={() => setIsCardFlipped(false)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardDetails: { ...formData.cardDetails!, cardHolder: e.target.value },
                              })
                            }
                            placeholder="MILICA JOVANOVIC"
                            className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-xs uppercase font-semibold text-[#241D19] focus:outline-hidden focus:border-[#9E3E26] focus:bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#241D19] mb-1">
                              {isEn ? 'Expiry Date *' : 'Datum (MM/YY) *'}
                            </label>
                            <input
                              type="text"
                              required={formData.paymentMethod === 'kartica'}
                              maxLength={5}
                              value={formData.cardDetails?.expiryDate || ''}
                              onFocus={() => setIsCardFlipped(false)}
                              onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '');
                                if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                setFormData({
                                  ...formData,
                                  cardDetails: { ...formData.cardDetails!, expiryDate: val },
                                });
                              }}
                              placeholder="12/28"
                              className="w-full px-2.5 py-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-xs font-mono font-semibold text-center text-[#241D19] focus:outline-hidden focus:border-[#9E3E26] focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#241D19] mb-1 flex items-center justify-between">
                              <span>CVV / CVC *</span>
                              <span className="text-[9px] text-[#9E3E26] font-normal">(3 cifre)</span>
                            </label>
                            <input
                              type="password"
                              required={formData.paymentMethod === 'kartica'}
                              maxLength={4}
                              value={formData.cardDetails?.cvv || ''}
                              onFocus={() => setIsCardFlipped(true)}
                              onBlur={() => setIsCardFlipped(false)}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  cardDetails: { ...formData.cardDetails!, cvv: e.target.value },
                                })
                              }
                              placeholder="123"
                              className="w-full px-2.5 py-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-xs font-mono font-semibold text-center text-[#241D19] focus:outline-hidden focus:border-[#9E3E26] focus:bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#4E6852] font-medium pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {isEn
                          ? '3D Secure Verified by Visa, Mastercard Identity Check & DinaCard Secure.'
                          : 'Sigurno 3D Secure online plaćanje sa 256-bitnom zaštitom bankarskih podataka.'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#E8E0D5] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl bg-white hover:bg-red-50 hover:text-red-700 border border-[#E8E0D5] hover:border-red-200 text-[#241D19]/70 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title={isEn ? 'Close order form' : 'Zatvori formu'}
                >
                  <X className="w-4 h-4" />
                  <span>{isEn ? 'Close' : 'Zatvori'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="px-4 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/40 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isEn ? 'Direct WhatsApp' : 'Pošalji direktno na WhatsApp'}</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isEn ? 'Submit Order Inquiry' : 'Pošalji narudžbinu'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const ContactSection: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const { t, isEn } = useLanguage();

  return (
    <section id="kontakt" className="py-20 bg-[#241D19] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E8D0A9] text-xs font-semibold uppercase tracking-widest">
              <Phone className="w-3.5 h-3.5 text-[#C2872A]" />
              <span>{t.contactBadge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {t.contactTitle}
            </h2>

            <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-light">
              {t.contactSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-[#E8D0A9] font-bold uppercase tracking-wider block">
                  Telefon / Viber / WhatsApp
                </span>
                <a href={`tel:${companyDetails.phone}`} className="text-lg font-bold text-white hover:text-[#E8D0A9] block">
                  {companyDetails.phoneFormatted}
                </a>
                <p className="text-xs text-white/60">{isEn ? 'Available for calls & direct messages' : 'Dostupni za pozive i poruke'}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-[#E8D0A9] font-bold uppercase tracking-wider block">
                  {isEn ? 'Email Address' : 'Elektronska pošta'}
                </span>
                <a href={`mailto:${companyDetails.email}`} className="text-sm font-semibold text-white hover:text-[#E8D0A9] block truncate">
                  {companyDetails.email}
                </a>
                <p className="text-xs text-white/60">{isEn ? 'We reply within 24 hours' : 'Odgovaramo u roku od 24h'}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-[#E8D0A9] font-bold uppercase tracking-wider block">
                  {isEn ? 'Workshop Address' : 'Adresa radionice'}
                </span>
                <span className="text-sm font-semibold text-white block">
                  {companyDetails.address.street} {companyDetails.address.number}
                </span>
                <p className="text-xs text-white/60">{isEn ? '12318 Jošanica, Žagubica Municipality, Homolje, Serbia' : '12318 Jošanica, Opština Žagubica, Srbija'}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-[#E8D0A9] font-bold uppercase tracking-wider block">
                  {isEn ? 'Working Hours & Dispatch' : 'Radno vreme i slanje'}
                </span>
                <span className="text-sm font-semibold text-white block">
                  {isEn ? 'Mon - Sat: 08:00 - 19:00 CET' : 'Pon - Sub: 08:00 - 19:00'}
                </span>
                <p className="text-xs text-white/60">{isEn ? 'Delivery: Post Express Courier' : 'Dostava: Post Express kurir'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Order CTA Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F2] text-[#241D19] rounded-2xl p-7 sm:p-8 shadow-xl border border-[#E8E0D5] space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9E3E26]">
                  {isEn ? 'Seamless Ordering' : 'Jednostavno naručivanje'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#241D19]">
                  {isEn ? 'Send Your Order Online' : 'Pošaljite porudžbinu online'}
                </h3>
                <p className="text-xs text-[#241D19]/70 leading-relaxed">
                  {isEn ? 'Choose your item or custom parameters, leave your delivery details and Tanja Petrić will contact you directly to confirm.' : 'Izaberite željeni proizvod, ostavite svoje podatke za dostavu i Tanja Petrić će vas kontaktirati radi realizacije.'}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={onOpenModal}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isEn ? 'Open Order Form' : 'Otvorite formu za narudžbinu'}</span>
                </button>

                <a
                  href={`https://wa.me/381603318319?text=${encodeURIComponent(isEn ? 'Hello! I am writing from the Savremeni Koreni website regarding your handmade pieces.' : 'Dobar dan! Pišem vam sa sajta Savremeni Koreni u vezi vaših radova.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/40 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isEn ? 'Message Tanja on WhatsApp' : 'Pošaljite poruku na WhatsApp'}</span>
                </a>
              </div>

              <div className="pt-2 text-[11px] text-[#241D19]/60 text-center border-t border-[#E8E0D5]">
                {isEn 
                  ? 'Payment is made upon delivery via Post Express courier (cash on delivery) or direct bank transfer.' 
                  : 'Plaćanje se vrši pouzećem prilikom preuzimanja od PostExpress kurira ili uplatom na račun firme.'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
