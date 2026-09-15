import React, { useState } from 'react';
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Scissors,
  ShieldCheck,
  MessageCircle,
  Phone,
  Sparkles,
  Copy,
  Check,
  Calendar,
  Tag,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { lookupOrder, mockOrdersData, BespokeOrder } from '../data/mockOrdersData';
import { companyDetails } from '../data/companyData';
import { trackConversion } from '../utils/analytics';

interface TrackOrderSectionProps {
  onOpenOrderModal?: (productName?: string) => void;
}

export const TrackOrderSection: React.FC<TrackOrderSectionProps> = ({ onOpenOrderModal }) => {
  const { isEn } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<BespokeOrder | null>(mockOrdersData['SK-2026-0891']);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const result = lookupOrder(searchQuery);
    setActiveOrder(result);
    setHasSearched(true);
    trackConversion('order_tracking_search', { query: searchQuery, found: Boolean(result) });
  };

  const handleQuickSelect = (id: string) => {
    setSearchQuery(id);
    setActiveOrder(mockOrdersData[id]);
    setHasSearched(true);
  };

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getStatusBadgeColor = (status: BespokeOrder['status']) => {
    switch (status) {
      case 'received':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
      case 'quality_check':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      case 'shipped':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  return (
    <section id="pracenje" className="py-16 sm:py-20 bg-[#FAF7F2] dark:bg-[#1A1512] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] dark:bg-[#2A221C] border border-[#E8E0D5] dark:border-[#382C24] text-[#9E3E26] dark:text-[#E8D0A9] text-xs font-semibold uppercase tracking-wider">
            <Package className="w-4 h-4 text-[#C2872A]" />
            <span>{isEn ? 'Order Status & Tracking' : 'Praćenje Statusa Izrade'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#241D19] dark:text-[#F3ECE6]">
            {isEn ? 'Track Your Bespoke Handcrafted Order' : 'Proverite dokle je stigla vaša unikatna porudžbina'}
          </h2>
          <p className="text-sm text-[#7A6B5D] dark:text-[#A89787] leading-relaxed">
            {isEn
              ? 'Enter your bespoke Order ID (e.g. SK-2026-0891) to view real-time atelier progress, materials preparation, and dispatch status directly from Jošanica.'
              : 'Unesite jedinstveni broj vaše porudžbine (npr. SK-2026-0891) i pratite u kom je stadijumu ručna izrada, priprema platna ili slanje kurirskom službom.'}
          </p>
        </div>

        {/* Main Card Wrapper */}
        <div className="bg-white dark:bg-[#221B17] rounded-3xl border border-[#E8E0D5] dark:border-[#382C24] p-6 sm:p-8 md:p-10 shadow-xl space-y-8">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-4 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A6B5D] dark:text-[#A89787]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? 'Enter Order ID (e.g. SK-2026-0891)' : 'Unesite broj porudžbine (npr. SK-2026-0891)'}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#15110E] border border-[#E8E0D5] dark:border-[#382C24] text-base text-[#241D19] dark:text-[#F3ECE6] placeholder-[#A89787] focus:outline-none focus:ring-2 focus:ring-[#9E3E26]"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 rounded-2xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-semibold text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{isEn ? 'Check Status' : 'Proveri Status'}</span>
              </button>
            </div>

            {/* Quick Demo Sample Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-1">
              <span className="text-[#7A6B5D] dark:text-[#A89787] font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C2872A]" />
                {isEn ? 'Click sample IDs to test:' : 'Isprobajte uzočni kod:'}
              </span>
              {Object.keys(mockOrdersData).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleQuickSelect(id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                    activeOrder?.orderId === id
                      ? 'bg-[#9E3E26] text-white border-[#9E3E26] shadow-sm'
                      : 'bg-[#FAF7F2] dark:bg-[#15110E] text-[#241D19] dark:text-[#F3ECE6] border-[#E8E0D5] dark:border-[#382C24] hover:border-[#9E3E26]'
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>
          </form>

          {/* Active Order Details Panel */}
          {activeOrder ? (
            <div className="bg-[#FAF7F2] dark:bg-[#191411] rounded-2xl border border-[#E8E0D5] dark:border-[#382C24] p-6 sm:p-8 space-y-8">
              {/* Header Info Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E0D5] dark:border-[#382C24]">
                <div className="flex items-start gap-4">
                  {activeOrder.image && (
                    <img
                      src={activeOrder.image}
                      alt={activeOrder.productName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#E8E0D5] dark:border-[#382C24] shadow-sm shrink-0"
                    />
                  )}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#9E3E26] dark:text-[#E8D0A9]">
                        #{activeOrder.orderId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(activeOrder.orderId)}
                        className="text-xs text-[#7A6B5D] hover:text-[#241D19] dark:hover:text-white flex items-center gap-1 transition-colors"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-green-600">{isEn ? 'Copied' : 'Kopirano'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Copy' : 'Kopiraj'}</span>
                          </>
                        )}
                      </button>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusBadgeColor(activeOrder.status)}`}>
                        {isEn ? activeOrder.statusLabelEn : activeOrder.statusLabel}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#241D19] dark:text-[#F3ECE6]">
                      {isEn ? activeOrder.productNameEn : activeOrder.productName}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-[#7A6B5D] dark:text-[#A89787] flex-wrap">
                      <span>{isEn ? 'Customer:' : 'Naručilac:'} <strong className="text-[#241D19] dark:text-[#F3ECE6]">{activeOrder.customerName}</strong></span>
                      <span>•</span>
                      <span>{isEn ? 'Ordered:' : 'Datum porudžbine:'} <strong>{activeOrder.orderDate}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#251E19] p-4 rounded-2xl border border-[#E8E0D5] dark:border-[#382C24] space-y-1 text-left md:text-right shrink-0">
                  <span className="text-xs text-[#7A6B5D] dark:text-[#A89787] flex items-center md:justify-end gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C2872A]" />
                    {isEn ? 'Estimated Delivery Date' : 'Očekivani datum dostave'}
                  </span>
                  <div className="text-base font-bold text-[#9E3E26] dark:text-[#E8D0A9]">
                    {isEn ? activeOrder.estimatedDeliveryEn : activeOrder.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89787] flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#9E3E26]" />
                  {isEn ? 'Atelier Crafting & Logistics Timeline' : 'Faze izrade i logistike u radionici'}
                </h4>

                <div className="relative pl-7 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E0D5] dark:before:bg-[#382C24]">
                  {activeOrder.steps.map((step, idx) => {
                    const isCompleted = step.completed;
                    const isCurrent = step.current;

                    return (
                      <div key={step.id || idx} className="relative flex items-start gap-4">
                        <div
                          className={`absolute -left-7 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : isCurrent
                              ? 'bg-[#9E3E26] text-white ring-4 ring-[#9E3E26]/20 animate-pulse'
                              : 'bg-white dark:bg-[#241D19] text-[#A89787] border-2 border-[#E8E0D5] dark:border-[#382C24]'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isCurrent ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-[#A89787]" />
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h5
                              className={`text-base font-bold ${
                                isCompleted
                                  ? 'text-[#241D19] dark:text-[#F3ECE6]'
                                  : isCurrent
                                  ? 'text-[#9E3E26] dark:text-[#E8D0A9]'
                                  : 'text-[#A89787]'
                              }`}
                            >
                              {isEn ? step.titleEn : step.title}
                            </h5>
                            {step.timestamp && (
                              <span className="text-xs text-[#7A6B5D] dark:text-[#8C7B6C] font-mono">
                                {step.timestamp}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89787]">
                            {isEn ? step.descriptionEn : step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Artisan Note */}
              {(activeOrder.atelierNote || activeOrder.atelierNoteEn) && (
                <div className="p-5 rounded-2xl bg-white dark:bg-[#241D19] border border-[#E8D0A9] dark:border-[#4A3B32] space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9E3E26] dark:text-[#E8D0A9]">
                    <Sparkles className="w-4 h-4 text-[#C2872A]" />
                    <span>{isEn ? 'Direct Note from Artisan Tanja Petrić:' : 'Poruka iz radionice Tanja Petrić (Jošanica):'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#241D19]/90 dark:text-[#F3ECE6]/90 italic leading-relaxed">
                    "{isEn ? activeOrder.atelierNoteEn : activeOrder.atelierNote}"
                  </p>
                </div>
              )}

              {/* Courier Tracking */}
              {activeOrder.trackingNumber && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                        {activeOrder.courier || 'PostExpress'}
                      </span>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                        {isEn ? 'Tracking Number:' : 'Broj pošiljke za praćenje:'} <strong className="font-bold">{activeOrder.trackingNumber}</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeOrder.trackingNumber!)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
                  >
                    {isEn ? 'Copy Tracking Number' : 'Kopiraj kod pošiljke'}
                  </button>
                </div>
              )}

              {/* Techniques Tag Cloud */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="text-xs font-semibold text-[#7A6B5D] dark:text-[#A89787] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#C2872A]" />
                  {isEn ? 'Applied Craft Techniques:' : 'Primenjene tehnike u izradi:'}
                </span>
                {activeOrder.craftTechniques.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-white dark:bg-[#251E19] text-xs font-medium text-[#241D19] dark:text-[#F3ECE6] border border-[#E8E0D5] dark:border-[#382C24]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : hasSearched ? (
            <div className="bg-[#FAF7F2] dark:bg-[#191411] rounded-2xl border border-red-200 dark:border-red-900/40 p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#241D19] dark:text-[#F3ECE6]">
                {isEn ? 'No Order Found' : 'Porudžbina nije pronađena'}
              </h4>
              <p className="text-xs sm:text-sm text-[#7A6B5D] dark:text-[#A89787] max-w-md mx-auto">
                {isEn
                  ? 'We could not locate an active order with that ID. Please check the code or contact us directly.'
                  : 'Nismo pronašli porudžbinu pod tim brojem. Proverite uneti kod ili nas kontaktirajte direktno radi provere.'}
              </p>
            </div>
          ) : null}

          {/* Quick Contact Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#F3ECE0] dark:bg-[#15110E] border border-[#E8E0D5] dark:border-[#382C24]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#C2872A] shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-[#241D19] dark:text-[#F3ECE6]">
                  {isEn ? 'Direct Atelier Support' : 'Direktna podrška radionice Tanja Petrić'}
                </span>
                <p className="text-[#7A6B5D] dark:text-[#A89787] text-xs">
                  {isEn ? 'Need custom adjustments or change of delivery address?' : 'Želite da promenite adresu ili dodate posebne zahteve za izradu?'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/381603318319?text=${encodeURIComponent(
                  isEn
                    ? `Hello Tanja, I have a question about my order ${activeOrder?.orderId || searchQuery || ''}`
                    : `Dobar dan Tanja, imam pitanje u vezi porudžbine ${activeOrder?.orderId || searchQuery || ''}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${companyDetails.phone}`}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{companyDetails.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
