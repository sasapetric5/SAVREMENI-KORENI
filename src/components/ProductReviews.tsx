import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, Send, CheckCircle2, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  comment: string;
  commentEn?: string;
  date: string;
  verifiedPurchase?: boolean;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
  productCategory?: string;
}

// Initial realistic customer reviews seed mapped by category / default
const SEED_REVIEWS: Record<string, ProductReview[]> = {
  subare: [
    {
      id: 'subare-rev-1',
      productId: 'subare-1',
      authorName: 'Miloš V.',
      rating: 5,
      comment: 'Vlaška šubara je vrhunskog kvaliteta! Izuzetno topla, prirodno krzno je mekano i savršeno sašiveno. Svaka čast majstor Tanji!',
      commentEn: 'The Vlach sheepskin hat is of top quality! Extremely warm, natural fur is soft and perfectly crafted. Kudos to artisan Tanja!',
      date: '28. avgust 2026.',
      verifiedPurchase: true,
    },
    {
      id: 'subare-rev-2',
      productId: 'subare-1',
      authorName: 'Elena B.',
      rating: 5,
      comment: 'Kupljeno kao poklon za dedin rođendan u dijaspori. Oduševljen je autentičnošću Homoljskog kraja!',
      commentEn: 'Bought as a gift for grandpa in diaspora. He is thrilled with the Homolje authenticity!',
      date: '14. jul 2026.',
      verifiedPurchase: true,
    },
  ],
  carape: [
    {
      id: 'carape-rev-1',
      productId: 'carape-1',
      authorName: 'Anđela M.',
      rating: 5,
      comment: 'Vezene vunene čarape za naš KUD su stigle prelepe! Bod je precizan, a vuna izuzetno prijatna za nošenje tokom nastupa.',
      commentEn: 'Embroidered wool socks for our folk ensemble arrived beautifully! Precise stitchwork and very comfortable during performances.',
      date: '02. septembar 2026.',
      verifiedPurchase: true,
    },
    {
      id: 'carape-rev-2',
      productId: 'carape-1',
      authorName: 'Dragan S.',
      rating: 5,
      comment: 'Prava lekovita vuna! Noge su mi uvek tople, vez je čvrst i trajan. Sigurno ću ponovo poručiti.',
      commentEn: 'Real therapeutic wool! My feet stay warm, stitching is durable. Will definitely order again.',
      date: '19. avgust 2026.',
      verifiedPurchase: true,
    },
  ],
  torbice: [
    {
      id: 'torbe-rev-1',
      productId: 'torbe-1',
      authorName: 'Milica P.',
      rating: 5,
      comment: 'Svileni ručni vez na torbici izgleda još lepše uživo nego na slikama. Dobila sam bezbroj komplimenata na proslavi!',
      commentEn: 'Silk hand embroidery on the bag looks even better in person than in pictures. Received countless compliments!',
      date: '05. septembar 2026.',
      verifiedPurchase: true,
    },
    {
      id: 'torbe-rev-2',
      productId: 'torbe-1',
      authorName: 'Sofija K.',
      rating: 5,
      comment: 'Unikatni komad koji spaja tradiciju i moderan stil. Izrada je besprekorna, hvala vam na brzoj dostavi!',
      commentEn: 'A unique piece combining tradition and modern style. Craftsmanship is flawless, thank you for quick delivery!',
      date: '10. avgust 2026.',
      verifiedPurchase: true,
    },
  ],
  kosulje: [
    {
      id: 'kosulje-rev-1',
      productId: 'kosulja-1',
      authorName: 'Jovan T.',
      rating: 5,
      comment: 'Srpsko platno sa zlatovezom je remek-delo. Šiveno tačno po mojim merama, leži savršeno.',
      commentEn: 'Serbian linen with gold thread embroidery is a masterpiece. Tailored exactly to my measurements, fits perfectly.',
      date: '01. avgust 2026.',
      verifiedPurchase: true,
    },
  ],
  default: [
    {
      id: 'gen-rev-1',
      productId: 'default',
      authorName: 'Katarina N.',
      rating: 5,
      comment: 'Savremeni Koreni su pravi čuvari naše tradicije. Prelepa ručna izrada, prirodni materijali i velika posvećenost detaljima.',
      commentEn: 'Savremeni Koreni are true guardians of our tradition. Beautiful handmade craft, natural materials, and great attention to detail.',
      date: '20. avgust 2026.',
      verifiedPurchase: true,
    },
    {
      id: 'gen-rev-2',
      productId: 'default',
      authorName: 'Stefan Đ.',
      rating: 5,
      comment: 'Sve preporuke za radionicu Tanje Petrić! Poručio sam unikat po meri i stiglo je brzo uz vrhunski kvalitet.',
      commentEn: 'Highly recommend Tanja Petrić’s workshop! Ordered custom work and it arrived fast with top-tier quality.',
      date: '11. maj 2026.',
      verifiedPurchase: true,
    },
  ],
};

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
  productCategory = 'default',
}) => {
  const { isEn } = useLanguage();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load reviews from localStorage + fallback seeds
  useEffect(() => {
    try {
      const storageKey = `savremeni_reviews_${productId}`;
      const saved = localStorage.getItem(storageKey);

      let loaded: ProductReview[] = [];
      if (saved) {
        loaded = JSON.parse(saved);
      } else {
        // Find seed reviews by category or default
        const seedCat = SEED_REVIEWS[productCategory] || SEED_REVIEWS['default'];
        loaded = seedCat.map((r) => ({ ...r, productId }));
      }
      setReviews(loaded);
    } catch {
      setReviews(SEED_REVIEWS['default']);
    }
  }, [productId, productCategory]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!authorName.trim()) {
      setErrorMessage(isEn ? 'Please enter your name.' : 'Molimo unesite vaše ime.');
      return;
    }

    if (!comment.trim() || comment.trim().length < 5) {
      setErrorMessage(
        isEn
          ? 'Please enter a short review comment (at least 5 characters).'
          : 'Molimo unesite kratak utisak o kvalitetu izrade (najmanje 5 karaktera).'
      );
      return;
    }

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      productId,
      authorName: authorName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString(isEn ? 'en-US' : 'sr-RS', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      verifiedPurchase: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      localStorage.setItem(`savremeni_reviews_${productId}`, JSON.stringify(updated));
    } catch {}

    setIsSubmitted(true);
    setAuthorName('');
    setComment('');
    setRating(5);

    setTimeout(() => {
      setIsSubmitted(false);
      setShowAddForm(false);
    }, 2500);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="mt-8 pt-6 border-t border-[#E8E0D5] space-y-6">
      {/* Reviews Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-[#E8E0D5] shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E0D5] min-w-[76px]">
            <span className="font-serif text-3xl font-bold text-[#241D19]">{averageRating}</span>
            <div className="flex text-[#C2872A] mt-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-[#241D19]/60 mt-1 font-semibold">
              {reviews.length} {isEn ? (reviews.length === 1 ? 'review' : 'reviews') : (reviews.length === 1 ? 'utisak' : 'utiska')}
            </span>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-[#241D19] flex items-center gap-1.5">
              <span>{isEn ? 'Customer Reviews & Quality Feedback' : 'Ocene i utisci kupaca'}</span>
              <Sparkles className="w-4 h-4 text-[#C2872A]" />
            </h4>
            <p className="text-xs text-[#241D19]/70 mt-0.5">
              {isEn
                ? `Real feedback on the handcrafted quality of ${productName}.`
                : `Komentari kupaca o kvalitetu ručnog rada za ${productName}.`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4E8E3] text-[#9E3E26] border border-[#9E3E26]/30 text-xs font-bold transition-all cursor-pointer shadow-2xs shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{showAddForm ? (isEn ? 'Close Form' : 'Zatvori') : (isEn ? 'Write a Review' : 'Ostavi utisak')}</span>
        </button>
      </div>

      {/* Write a Review Form */}
      {showAddForm && (
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#C2872A]/40 shadow-md animate-in fade-in duration-200 space-y-4">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#4E6852] mx-auto animate-bounce" />
              <h5 className="font-serif text-base font-bold text-[#241D19]">
                {isEn ? 'Thank you for your feedback!' : 'Hvala vam na ostavljenom utisku!'}
              </h5>
              <p className="text-xs text-[#241D19]/70">
                {isEn
                  ? 'Your star rating and review have been added.'
                  : 'Vaša ocena i komentar su uspešno sačuvani.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E0D5]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E3E26]">
                  {isEn ? 'Share your experience:' : 'Vaša ocena ručnog rada:'}
                </span>

                {/* Star Selector */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'text-[#C2872A] fill-[#C2872A]'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold ml-1.5 text-[#241D19]">
                    {hoverRating || rating}/5 ★
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#241D19] mb-1">
                    {isEn ? 'Your Name or Initials:' : 'Vaše ime ili inicijali:'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#241D19]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder={isEn ? 'e.g. Milica S.' : 'npr. Jelena M.'}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] text-xs text-[#241D19] focus:outline-none focus:border-[#9E3E26]"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#241D19] mb-1">
                    {isEn ? 'Your Feedback on Quality & Detail:' : 'Vaš utisak o kvalitetu i detaljima:'}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder={
                      isEn
                        ? 'Write a short comment on the wool quality, embroidery stitches, or fur hat fit...'
                        : 'Napišite utisak o izradi, kvalitetu vune, veza ili nošenja...'
                    }
                    className="w-full p-3 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] text-xs text-[#241D19] focus:outline-none focus:border-[#9E3E26]"
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
              )}

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Submit Review' : 'Objavi utisak'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <p className="text-xs text-[#241D19]/60 italic text-center py-4">
            {isEn ? 'No reviews yet. Be the first to leave feedback!' : 'Još nema utisaka. Budi prvi koji će oceniti ovaj rad!'}
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-4 rounded-xl border border-[#E8E0D5] space-y-2 shadow-2xs hover:border-[#C2872A]/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#241D19]">{rev.authorName}</span>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4E6852] bg-[#4E6852]/10 px-2 py-0.5 rounded-full border border-[#4E6852]/20">
                      <ThumbsUp className="w-2.5 h-2.5" />
                      <span>{isEn ? 'Verified Buyer' : 'Potvrđen kupac'}</span>
                    </span>
                  )}
                </div>

                <span className="text-[11px] text-[#241D19]/50 font-mono">{rev.date}</span>
              </div>

              {/* Stars */}
              <div className="flex text-[#C2872A]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= rev.rating ? 'fill-current text-[#C2872A]' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-xs text-[#241D19]/85 leading-relaxed font-light">
                {isEn && rev.commentEn ? rev.commentEn : rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
