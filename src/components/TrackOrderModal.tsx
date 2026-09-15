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
  X,
  HelpCircle,
  Sparkles,
  Copy,
  Check,
  Calendar,
  Tag,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { lookupOrder, mockOrdersData, BespokeOrder } from '../data/mockOrdersData';
import { companyDetails } from '../data/companyData';
import { trackConversion } from '../utils/analytics';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  onOpenOrderModal?: (productName?: string) => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
  onOpenOrderModal
}) => {
  const { isEn } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<BespokeOrder | null>(() => {
    return initialOrderId ? lookupOrder(initialOrderId) : mockOrdersData['SK-2026-0891'];
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#FAF7F2] dark:bg-[#1C1613] text-[#241D19] dark:text-[#F3ECE6] rounded-2xl border border-[#E8E0D5] dark:border-[#3A2F27] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#E8E0D5] dark:border-[#3A2F27] bg-[#F3ECE0] dark:bg-[#251E19] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9E3E26] text-white flex items-center justify-center shadow-sm">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#241D19] dark:text-[#F3ECE6]">
                {isEn ? 'Bespoke Order Status Tracker' : 'Praćenje Statusa Izrade Unikata'}
              </h3>
              <p className="text-xs text-[#7A6B5D] dark:text-[#A89787]">
                {isEn
                  ? 'Real-time atelier progress from Jošanica, Homolje'
                  : 'Status u realnom vremenu direktno iz radionice u Jošanici'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E8E0D5] dark:hover:bg-[#3A2F27] text-[#7A6B5D] dark:text-[#A89787] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89787]">
              {isEn ? 'Enter your Order ID or Customer Name / Phone:' : 'Unesite broj porudžbine ili ime kupca / telefon:'}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5D] dark:text-[#A89787]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? 'e.g. SK-2026-0891' : 'Npr. SK-2026-0891'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#15110E] border border-[#E8E0D5] dark:border-[#3A2F27] text-sm text-[#241D19] dark:text-[#F3ECE6] placeholder-[#A89787] focus:outline-none focus:ring-2 focus:ring-[#9E3E26]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-medium text-sm transition-all cursor-pointer shadow-xs flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{isEn ? 'Track' : 'Pronađi'}</span>
              </button>
            </div>

            {/* Quick Demo Sample Order IDs */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-[#7A6B5D] dark:text-[#A89787] font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C2872A]" />
                {isEn ? 'Test Sample IDs:' : 'Primeri porudžbina za testiranje:'}
              </span>
              {Object.keys(mockOrdersData).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleQuickSelect(id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border ${
                    activeOrder?.orderId === id
                      ? 'bg-[#9E3E26] text-white border-[#9E3E26]'
                      : 'bg-white dark:bg-[#251E19] text-[#241D19] dark:text-[#F3ECE6] border-[#E8E0D5] dark:border-[#3A2F27] hover:border-[#9E3E26]'
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>
          </form>

          {/* Result Card */}
          {activeOrder ? (
            <div className="bg-white dark:bg-[#241D19] rounded-2xl border border-[#E8E0D5] dark:border-[#3A2F27] p-5 sm:p-6 shadow-sm space-y-6">
              {/* Top Banner Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E8E0D5] dark:border-[#3A2F27]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#9E3E26] dark:text-[#E8D0A9]">
                      #{activeOrder.orderId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeOrder.orderId)}
                      className="text-xs text-[#7A6B5D] hover:text-[#241D19] dark:hover:text-white flex items-center gap-1 transition-colors"
                      title={isEn ? 'Copy Order ID' : 'Kopiraj broj porudžbine'}
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
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${getStatusBadgeColor(activeOrder.status)}`}>
                      {isEn ? activeOrder.statusLabelEn : activeOrder.statusLabel}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-[#241D19] dark:text-[#F3ECE6]">
                    {isEn ? activeOrder.productNameEn : activeOrder.productName}
                  </h4>
                  <p className="text-xs text-[#7A6B5D] dark:text-[#A89787]">
                    {isEn ? 'Naručilac:' : 'Kupac:'} <span className="font-medium text-[#241D19] dark:text-[#F3ECE6]">{activeOrder.customerName}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-1 bg-[#FAF7F2] dark:bg-[#191411] p-3 rounded-xl border border-[#E8E0D5]/70 dark:border-[#3A2F27]">
                  <div className="text-[11px] text-[#7A6B5D] dark:text-[#A89787] flex items-center sm:justify-end gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C2872A]" />
                    <span>{isEn ? 'Estimated Delivery' : 'Očekivano učenje/dostava'}</span>
                  </div>
                  <div className="text-sm font-bold text-[#9E3E26] dark:text-[#E8D0A9]">
                    {isEn ? activeOrder.estimatedDeliveryEn : activeOrder.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-3">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#7A6B5D] dark:text-[#A89787] flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-[#9E3E26]" />
                  {isEn ? 'Crafting & Delivery Stages' : 'Faze izrade i isporuke u ateljeu'}
                </h5>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E0D5] dark:before:bg-[#3A2F27]">
                  {activeOrder.steps.map((step, idx) => {
                    const isCompleted = step.completed;
                    const isCurrent = step.current;

                    return (
                      <div key={step.id || idx} className="relative flex items-start gap-3">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-[#9E3E26] text-white ring-4 ring-[#9E3E26]/20 animate-pulse'
                              : 'bg-white dark:bg-[#1C1613] text-[#A89787] border-2 border-[#E8E0D5] dark:border-[#3A2F27]'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : isCurrent ? (
                            <Clock className="w-3.5 h-3.5" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A89787]" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h6
                              className={`text-sm font-bold ${
                                isCompleted
                                  ? 'text-[#241D19] dark:text-[#F3ECE6]'
                                  : isCurrent
                                  ? 'text-[#9E3E26] dark:text-[#E8D0A9]'
                                  : 'text-[#A89787]'
                              }`}
                            >
                              {isEn ? step.titleEn : step.title}
                            </h6>
                            {step.timestamp && (
                              <span className="text-[11px] text-[#7A6B5D] dark:text-[#8C7B6C] font-mono">
                                {step.timestamp}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#7A6B5D] dark:text-[#A89787] mt-0.5">
                            {isEn ? step.descriptionEn : step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Atelier Note from Tanja */}
              {(activeOrder.atelierNote || activeOrder.atelierNoteEn) && (
                <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#191411] border border-[#E8D0A9]/60 dark:border-[#4A3B32] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9E3E26] dark:text-[#E8D0A9]">
                    <Sparkles className="w-4 h-4 text-[#C2872A]" />
                    <span>{isEn ? 'Note from Artisan Tanja Petrić:' : 'Beleška iz radionice Tanja Petrić:'}</span>
                  </div>
                  <p className="text-xs text-[#241D19]/90 dark:text-[#F3ECE6]/90 italic leading-relaxed">
                    "{isEn ? activeOrder.atelierNoteEn : activeOrder.atelierNote}"
                  </p>
                </div>
              )}

              {/* Shipping & Courier details if available */}
              {activeOrder.trackingNumber && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <div>
                      <span className="font-bold text-emerald-900 dark:text-emerald-200">
                        {activeOrder.courier || 'PostExpress'}
                      </span>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                        {isEn ? 'Tracking No:' : 'Broj pošiljke:'} {activeOrder.trackingNumber}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeOrder.trackingNumber!)}
                    className="px-3 py-1 rounded-lg bg-emerald-700 text-white text-[11px] font-medium hover:bg-emerald-800 transition-colors"
                  >
                    {isEn ? 'Copy Code' : 'Kopiraj kod'}
                  </button>
                </div>
              )}

              {/* Craft techniques used */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="text-[11px] font-semibold text-[#7A6B5D] dark:text-[#A89787] flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#C2872A]" />
                  {isEn ? 'Techniques used:' : 'Primenjene tehnike:'}
                </span>
                {activeOrder.craftTechniques.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md bg-[#F3ECE0] dark:bg-[#322821] text-[11px] font-medium text-[#241D19] dark:text-[#F3ECE6]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : hasSearched ? (
            <div className="bg-white dark:bg-[#241D19] rounded-2xl border border-red-200 dark:border-red-900/40 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-serif font-bold text-[#241D19] dark:text-[#F3ECE6]">
                {isEn ? 'Order ID Not Found' : 'Porudžbina nije pronađena'}
              </h4>
              <p className="text-xs text-[#7A6B5D] dark:text-[#A89787] max-w-md mx-auto">
                {isEn
                  ? 'We could not find an active bespoke order matching your search. Please check your order ID or contact Tanja Petrić directly.'
                  : 'Nismo pronašli aktivnu porudžbinu pod unetim brojem. Proverite kod ili nas kontaktirajte direktno putem telefona ili Viber/WhatsApp poruke.'}
              </p>
            </div>
          ) : null}

          {/* Need help or custom inquiry banner */}
          <div className="p-4 rounded-xl bg-[#F3ECE0] dark:bg-[#251E19] border border-[#E8E0D5] dark:border-[#3A2F27] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C2872A] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#241D19] dark:text-[#F3ECE6]">
                  {isEn ? 'Questions about your order?' : 'Imate pitanje u vezi vaše porudžbine?'}
                </span>
                <p className="text-[#7A6B5D] dark:text-[#A89787]">
                  {isEn ? 'Direct artisan consultation via phone or WhatsApp.' : 'Direktna konsultacija sa radionicom Tanja Petrić.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/381603318319?text=${encodeURIComponent(
                  isEn
                    ? `Hello Tanja, I would like to check the status of my order ID: ${activeOrder?.orderId || searchQuery || ''}`
                    : `Dobar dan Tanja, želeo/la bih da proverim status porudžbine: ${activeOrder?.orderId || searchQuery || ''}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${companyDetails.phone}`}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{companyDetails.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
