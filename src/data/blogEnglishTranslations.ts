import { BlogPost, BlogPostSection, BlogFAQ } from '../types';
import { extendedBlogTranslations } from './blogEnglishTranslationsExtended';
import { folkAndCostumesTranslations } from './blogTranslationsFolkAndCostumes';
import { craftsAndBagsTranslations } from './blogTranslationsCraftsAndBags';

export interface BlogTranslation {
  title: string;
  subtitle: string;
  excerpt: string;
  authorRole: string;
  publishDate: string;
  readingTime: string;
  categoryLabel: string;
  targetKeywords?: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
    quote?: { text: string; caption: string };
    keyTakeaway?: string;
    bulletPoints?: string[];
    imageCaption?: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  conclusion: string;
}

const baseBlogTranslations: Record<string, BlogTranslation> = {
  // 1. Vez Kroz Vekove
  'vez-kroz-vekove-savremeni-stil': {
    title: 'Embroidery Through the Ages and Today: Everything About Hand Embroidery, Materials, History & Contemporary Style',
    subtitle: 'A comprehensive guide to the magic of every needle stitch, the difference between machine and hand embroidery, preparing the canvas, and preserving family heirlooms.',
    excerpt: 'In an era of industrial overproduction, hand embroidery is undergoing a global renaissance. We answer all key questions on fabrics, hoops, stitches, and integrating traditional embroidery into modern city style.',
    authorRole: 'Founder & Master Artisan, Savremeni Koreni (Jošanica)',
    publishDate: 'February 12, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Hand Embroidery (Encyclopedia)',
    targetKeywords: [
      'serbian embroidery',
      'hand embroidery',
      'what is hand embroidery',
      'traditional embroidery',
      'serbian canvas embroidery',
      'embroidered shirts',
      'machine vs hand embroidery',
      'how to wash hand embroidery',
      'embroidery hoop and mouline floss'
    ],
    sections: [
      {
        heading: 'What is Hand Embroidery and Why Can No Machine Truly Replace It?',
        paragraphs: [
          'Hand embroidery is the ancient art of decorating fabric by passing threads using a needle, creating ornamental, floral, or geometric motifs. While machine embroidery involves thousands of uniform, mathematically calculated, and rigid stitches programmed into a computer, hand embroidery possesses soul, organic texture, and micro-variations in thread tension that give it irreplaceable sculptural relief.',
          'In our workshop Savremeni Koreni in Jošanica, at the foot of the Homolje mountains, we experience embroidery as an unbroken conversation with our ancestral grandmothers. Every piece of genuine Serbian homespun canvas that we embellish by hand requires between 15 and 45 hours of patient, meditative dedication. It is this deliberate commitment to time that makes an embroidered garment or artisan handbag not disposable fast fashion, but an artistic original and a future family heirloom.',
          'In recent years, we have witnessed a tremendous surge in interest among young people and our diaspora communities for authentic embroidery. The reason is clear: people are exhausted by synthetics and generic commercial brands. They crave clothing that carries a story, breathes the warmth of living tradition, and celebrates the individuality of whoever wears it.'
        ],
        quote: {
          text: 'Every small knot on the reverse of the canvas and every gentle nuance of a hand stitch is undeniable proof that a living human heart beat behind that creation, not a cold factory motor.',
          caption: 'Tanja Petrić on the philosophy of Savremeni Koreni'
        }
      },
      {
        heading: 'Materials for Master Embroidery: Serbian Canvas, Mouliné Floss, and the Hoop',
        paragraphs: [
          'If you want hand embroidery to last for generations without fading or thread breakage, the choice of materials is decisive. Through years of practice, we have proven that the finest results are achieved using natural, densely woven cotton and linen fibers.',
          'Serbian homespun canvas (srpsko platno) represents the gold standard of our regional heritage. It offers ideal breathability, sits comfortably against the skin, and features a visible thread structure that allows for precise counting. Unlike factory polyester that distorts under the needle, genuine Serbian canvas becomes softer and more beautiful with every wash.',
          'For thread, we use premium cotton mouliné consisting of six easily divisible strands. This allows the embroiderer to calibrate stitch weight with precision: one to two strands for fine floral petals, and three or four strands for raised borders and tactile geometric outlines. On ceremonial pieces, we add srma — metallic gold and silver wire that imparts an aristocratic, courtly luster.',
          'The embroidery hoop (đerđef — a circular wooden frame with a tension screw) is an indispensable tool for every master. It keeps the canvas stretched evenly like a drum, preventing fabric puckering when threads are pulled tight and ensuring immaculate geometric symmetry.'
        ],
        bulletPoints: [
          'Serbian cotton canvas: 100% natural fiber structure, exceptionally gentle on skin and durable through laundering.',
          'Cotton mouliné floss: Colorfast dyes resistant to light and gentle washing, with a silky mercerized finish.',
          'Embroidery needles: Blunt tapestry needles for counted threadwork, sharp needles for surface satin stitch on dense cloth.',
          'Solid beechwood hoop: Even circular tension that prevents fabric distortion and keeps motifs perfectly aligned.'
        ]
      },
      {
        heading: 'How to Integrate Traditional Embroidery into Modern Urban Style',
        paragraphs: [
          'One of the most common misconceptions is that an embroidered shirt or handbag belongs only on a folklore ensemble stage or in a museum showcase. On the contrary! The very core of Savremeni Koreni is the contemporary reinvention of archival motifs.',
          'A white embroidered shirt crafted from Serbian homespun canvas, with a discreet red or black motif on the cuffs and mandarin collar, functions flawlessly in a corporate business setting. Worn beneath a tailored black or navy blazer, it captures attention with understated elegance, signaling refined taste and pride in one’s roots.',
          'During spring and summer, an embroidered shirt paired with classic quality denim and leather sandals creates an unmistakable boho-chic look. Meanwhile, our artisan ethnic handbags with wooden handles and floral needlework instantly elevate a monochromatic little black dress or neutral linen outfit, infusing the entire ensemble with authentic warmth.'
        ],
        keyTakeaway: 'The secret lies in contrast: pair one bold, hand-embroidered piece with minimalist modern wardrobe staples, allowing the heritage needlework to take center stage.'
      },
      {
        heading: 'Proper Care and Washing of Embroidered Pieces: Preserving Stitches for Decades',
        paragraphs: [
          'Many customers hesitate to wash hand-embroidered clothing out of fear that colors will run or stitches will unravel. By following several foundational rules, your piece will remain immaculate for years to come.',
          'The first and foremost rule is avoiding aggressive machine spinning cycles and harsh chlorine-based bleaches. Hand embroidery is best washed gently by hand in lukewarm water (up to 30–40°C) with mild liquid soap or gentle detergent for delicate fabrics.',
          'Never aggressively twist or wring an embroidered garment. After rinsing, roll it inside a clean white terrycloth towel to absorb excess moisture, then lay it flat horizontally to dry in the shade, away from direct sunlight and heat sources.',
          'Ironing must always be done on the reverse side of the fabric, using a damp cotton pressing cloth while the fabric is still slightly moist. Place a soft towel beneath the embroidered section — this prevents the raised relief stitches from being flattened by the hot iron, preserving their rich three-dimensional texture.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the main difference between hand and machine embroidery?',
        answer: 'Hand embroidery is crafted stitch by stitch with needle and thread, allowing the artisan to control the tension, placement, and sculptural depth of every stitch. The reverse side remains soft and clean, and the finished motif possesses an organic soul. Machine embroidery is an automated process with a stiff backing stabilizer and flat synthetic uniformity.'
      },
      {
        question: 'How long does it take to hand-embroider a tailored shirt?',
        answer: 'Depending on pattern complexity and surface density, hand embroidering a traditional Serbian woven canvas shirt at the Savremeni Koreni studio takes between 25 and 45 hours of dedicated artisan handwork.'
      },
      {
        question: 'Can hand-embroidered clothing be machine washed?',
        answer: 'We strictly recommend gentle hand washing in lukewarm water with mild, chlorine-free detergent. If machine washing is necessary, select the delicate silk/wool cycle at 30°C without spin-drying, placing the garment in a protective mesh laundry bag.'
      },
      {
        question: 'Can I request a custom family motif or archival monogram?',
        answer: 'Yes! The Savremeni Koreni workshop creates bespoke pieces on demand. You can select an archival regional motif from your ancestral heritage, personal initials, a custom floral garland, or tailoring tailored to your measurements.'
      }
    ],
    conclusion: 'Hand embroidery is not a relic of the past, but the most dignified bridge between who we were and who we are today. When you choose authentic embroidery, you are not merely buying a garment — you are sustaining our living cultural identity and honoring the dedication of women’s hands preserving Serbian traditions.'
  },

  // 2. Vunene Carape i Nazuvice
  'vunene-carape-i-nazuvice-lekovitost': {
    title: 'Wool Socks & Folk Slippers: Natural Healing, Lanolin, and Timeless Warmth',
    subtitle: 'Why authentic five-needle hand-knitted fleece wool socks provide unrivaled therapeutic benefits for joint health, circulation, and sustainable winter comfort.',
    excerpt: 'Discover why pure unbleached fleece wool from the Homolje highlands acts as a natural micro-massager, natural thermoregulator, and centuries-old remedy for cold feet and joint fatigue.',
    authorRole: 'Traditional Knitwear Artisan, Savremeni Koreni',
    publishDate: 'February 20, 2026',
    readingTime: '5 min read',
    categoryLabel: 'Wool & Health',
    targetKeywords: ['pure wool socks', 'hand knitted socks', 'lanolin benefits', 'folk wool slippers', 'homolje wool'],
    sections: [
      {
        heading: 'The Magic of Raw Fleece Wool from Highland Pastures',
        paragraphs: [
          'Our socks are knitted exclusively from the spring fleece of sheep grazing on the wildflower-rich limestone meadows of the Homolje mountains. Unlike industrially stripped commercial yarns, authentic raw wool retains its natural lanolin wax.',
          'Lanolin is a natural biological emollient produced by sheep that soothes dry skin, delivers gentle antibacterial protection, and eases rheumatic stiffness in joints and ankles.'
        ],
        quote: {
          text: 'Old folk wisdom says: Keep your feet warm and your head cool. Pure wool is the gentlest healer nature ever gifted us.',
          caption: 'Tanja Petrić on the holistic virtues of wool'
        }
      },
      {
        heading: 'Seamless 5-Needle Circular Knitting Technique',
        paragraphs: [
          'We craft every pair using the archaic five-needle circular method. Because there are no interior machine seams, the sock forms a completely smooth, friction-free second skin around your foot.',
          'Reinforced heels and toes ensure years of resilient wear, while the natural elasticity of unbleached yarn adapts perfectly to the unique contours of your arch and calf.'
        ],
        bulletPoints: [
          '100% natural unbleached fleece wool — completely microplastic-free.',
          'Seamless circular 5-needle construction prevents pressure sores and blisters.',
          'Natural temperature regulation: warms in freezing cold while remaining breathable.',
          'Hand-embroidered with vibrant traditional floral bouquets of peonies and field blooms.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why does authentic pure wool feel slightly prickly to sensitive skin and how can it be softened?',
        answer: 'The gentle prickle originates from thicker guard hairs of natural fleece, which naturally stimulates micro-capillary circulation. If you have sensitive skin, soaking freshly washed socks in lukewarm water with a few drops of natural hair conditioner softens the fibers to a silky touch without degrading warmth.'
      },
      {
        question: 'How are hand-knitted wool socks properly washed to avoid shrinking?',
        answer: 'Exclusively in lukewarm or cold water (never above 30°C) with a gentle wool liquid detergent. Never machine wash in hot water or run high-speed spin cycles, as intense agitation and heat cause wool fibers to felt and drastically shrink.'
      },
      {
        question: 'How long does it take to knit a pair of socks on 5 needles?',
        answer: 'For an experienced artisan, knitting a pair of seamless socks with a contoured heel, reinforced toe box, and hand-embroidered floral bouquet requires between 12 and 18 dedicated working hours.'
      }
    ],
    conclusion: 'When you step into hand-knitted fleece socks, you invite the grounding energy of mountain meadows into your daily home ritual.'
  },

  // 3. Etno Torbice
  'etno-torbice-heklanje-i-vez': {
    title: 'Artisan Ethno Handbags: Where Crochet, Embroidery, and Natural Wood Meet',
    subtitle: 'How handmade handbags with solid walnut handles and relief embroidery offer a conscious, durable alternative to mass-produced synthetic designer bags.',
    excerpt: 'From hand-crocheted cotton cord bodies to carved solid wood handles and archival cross-stitch panels, explore what makes an artisan handbag a lifetime companion.',
    authorRole: 'Master Artisan & Textile Designer, Jošanica',
    publishDate: 'February 25, 2026',
    readingTime: '7 min read',
    categoryLabel: 'Bags & Accessories',
    targetKeywords: ['handcrafted bags', 'crochet handbag', 'wooden handle bag', 'ethno purse', 'slow fashion bag'],
    sections: [
      {
        heading: 'Rejecting Fast-Fashion Plastic for Organic Longevity',
        paragraphs: [
          'Modern department store bags are overwhelmingly manufactured from polyurethane (faux leather) and bonded paperboard that crack and peel after a season. An authentic handcrafted bag is built on entirely different values: solid hardwood, pure braided cotton cord, and reinforced linen canvas.',
          'Every bag created in our Jošanica studio is constructed by hand over multiple days. The result is structural integrity that easily supports daily essentials while gaining character with age.'
        ]
      },
      {
        heading: 'The Marriage of Wood, Cord, and Needlework',
        paragraphs: [
          'Our signature designs integrate custom-carved beechwood or walnut handles and laser-perforated wooden bases with dense crochet ribs. This rigid foundation allows the bag to stand upright independently on tables without tipping or scuffing.',
          'The front panel showcases intricate relief embroidery — geometric diamonds from Pirot kilims or floral vines from eastern Serbian folk costumes.'
        ],
        quote: {
          text: 'An authentic bag doesn’t carry a synthetic designer logo. It carries the heartbeat of the hands that shaped it.',
          caption: 'Tanja Petrić on slow design'
        }
      }
    ],
    faqs: [
      {
        question: 'What is the carrying capacity of an artisan crochet bag?',
        answer: 'Thanks to high-tensile braided cotton cord and reinforced stress-point stitching, our bags comfortably carry 5 to 7 kg, easily accommodating a tablet, water bottle, wallet, and cosmetics.'
      },
      {
        question: 'How do I clean and maintain the bag?',
        answer: 'Spot clean the cotton canvas and cord using a damp cloth with mild soapy foam. Treat the wooden handles once or twice a year with a dab of natural beeswax balm to nourish the timber grain.'
      }
    ],
    conclusion: 'An artisan bag is more than an accessory — it is a conscious declaration of individuality, craftsmanship, and ecological respect.'
  },

  // 4. Srpska Subara
  'srpska-subara-tradicija-i-stil': {
    title: 'The Serbian Fur Hat (Šubara): Regal Winter Heritage and Alpine Craft',
    subtitle: 'The cultural history, craft construction, and styling of Serbia’s most iconic winter headwear — from white Vlach fleece cones to embroidered black crowns.',
    excerpt: 'Discover the artistry behind the traditional Serbian šubara: hand-carved fur patterning, crochet mesh bases, insulated satin linings, and modern styling for chilly mountain escapes.',
    authorRole: 'Master Furrier & Heritage Specialist, Jošanica',
    publishDate: 'March 1, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Fur Hats & Heritage',
    targetKeywords: ['serbian subara', 'traditional fur hat', 'vlach white subara', 'winter sheepskin hat'],
    sections: [
      {
        heading: 'A Crown of the Mountains: Identity and Symbolism',
        paragraphs: [
          'The šubara is Serbia’s most majestic traditional headwear. For centuries, shepherds, knights, and villagers wore it as an impenetrable shield against ferocious Balkan blizzards and mountain winds.',
          'In eastern Serbia and the Homolje highlands, the conical white Vlach šubara was a badge of young men’s pride and festive honor, worn tilted with dignity during folk dances and patron saint celebrations (slave).'
        ]
      },
      {
        heading: 'The Dual Craft: Crochet Base and Tufted Fleece',
        paragraphs: [
          'Unlike rigid industrial caps, authentic Homolje white šubaras are created through an astonishing combination of circular crochet netting and hand-knotting individual tufts of raw fleece wool.',
          'This ingenious technique allows air to circulate naturally around the scalp while the outer crown of dense wool locks in warmth without overheating.'
        ],
        bulletPoints: [
          'Anatomical mesh calotte crocheted from strong natural yarn for a flexible, custom fit.',
          'Hundreds of hand-knotted raw fleece locks creating a lush, uniform snow-white mantle.',
          'Option of hand-embroidered geometric folk bands in crimson, navy, and gold thread.',
          'Exceptional thermal performance tested across harsh sub-zero Balkan winters.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What should I do if a natural fur or fleece šubara gets soaked in rain or heavy snow?',
        answer: 'Do not panic! Gently shake off excess water droplets and allow the hat to dry naturally at room temperature, far from radiators or heat sources. Once completely dry, lightly brush the wool in the natural direction of the fibers with a soft bristle brush.'
      },
      {
        question: 'Why is natural sheepskin fleece superior to synthetic faux fur?',
        answer: 'Natural sheep fleece has natural micropores that allow your scalp to breathe, preventing overheating and moisture buildup. Authentic wool also lasts for decades without shedding or trapping odors, unlike synthetic polyester hats.'
      },
      {
        question: 'How should the šubara be stored during summer months?',
        answer: 'Store in a breathable cotton dust bag in a dry, ventilated closet with natural dried lavender or cedar wood blocks to repel moths. Avoid airtight plastic bags so the natural fibers retain their humidity balance and elasticity.'
      }
    ],
    conclusion: 'A genuine handcrafted šubara is an heirloom of majestic dignity that brings timeless character and alpine warmth to any winter wardrobe.'
  },

  // 5. Opanci za Folklor
  'opanci-za-folklor-srpski-izrada-koza': {
    title: 'Folk Dance Opanci & Serbian Leather Moccasins: Styles, Raw Leather Lacing, and Care',
    subtitle: 'A complete ethnographical guide to traditional Balkan leather footwear: understanding the difference between prešnjaci, beak-toed šilkani, and Vlach flat moccasins.',
    excerpt: 'Opanci are not museum relics; they are high-performance artisan footwear carrying dancers through dynamic jumps on world stages. Learn how to identify authentic cattle leather and maintain supple oputa lacing.',
    authorRole: 'Master Artisan & Costume Maker, Jošanica',
    publishDate: 'March 2, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Folk Costumes & Footwear',
    targetKeywords: ['serbian opanci', 'folk dance shoes', 'leather moccasins balkans', 'oputa lacing'],
    sections: [
      {
        heading: 'History and Soul of the Serbian Opanak',
        paragraphs: [
          'The opanak is one of the most recognizable emblems of Serbian national identity. For centuries it served as the daily footwear of farmers, mountain shepherds, soldiers, and schoolchildren across the Balkan peninsula.',
          'In modern folklore ensembles, a proper opanak must fit like a second skin — flexible enough for intricate toe-taps and rapid kolos, yet resilient against abrasive wooden stage floors.'
        ],
        quote: {
          text: 'You don’t buy an opanak by your sneaker size; you measure the foot clad in a thick wool sock. When wool and leather fuse, the dancer gets wings.',
          caption: 'Tanja Petrić on fitting folklore ensembles'
        }
      },
      {
        heading: 'Regional Varieties: Šilkani, Prešnjaci, and Vlach Designs',
        paragraphs: [
          '1. Šumadija Beaked Opanci (Šilkani): Distinguished by an upturned curved beak on the toe and intricate multi-strand interlaced oputa leather lacing. The ultimate symbol of central Serbian festive dress.',
          '2. Prešnjaci: The ancient raw-leather model wrapped directly around the foot and lashed with rawhide thongs.',
          '3. Vlach Opanci: Flatter soles with dense, flexible lacing optimized for lightning-fast foot crossings in Homolje kolos.'
        ]
      },
      {
        heading: 'Caring for Leather Footwear',
        paragraphs: [
          'Always nourish the leather thongs (oputa) with natural lard, beef tallow, or castor oil twice a year to prevent brittle cracking. Allow soaked opanci to dry naturally at room temperature away from radiators.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do you choose the exact size for folk dance opanci?',
        answer: 'Always try opanci on while wearing a thick woolen or cotton folklore stage sock. Your toes should gently reach the front woven boundary without curling. Because genuine leather naturally stretches slightly and molds to the anatomy of your foot during initial rehearsals, opanci should fit snugly when purchased.'
      },
      {
        question: 'What should you do if the leather oputa lacing snaps?',
        answer: 'A broken oputa thong can easily be repaired by an experienced leather artisan or shoemaker by weaving in a new natural leather lace. Never use synthetic cords, as synthetic fibers can cut into the surrounding leather under stage pressure.'
      },
      {
        question: 'How long do authentic leather opanci last?',
        answer: 'With regular oiling and proper air-drying, genuine cattlehide opanci easily endure 3 to 7 years of high-intensity folk dancing in performance ensembles, and several decades when worn for occasional ceremonies.'
      }
    ],
    conclusion: 'Masterfully crafted leather opanci connect your steps directly to the rhythm of ancient earth and the joyful energy of Serbian folklore.'
  },

  // 6. Srpski Zlatovez i Srma
  'srpski-zlatovez-srma-tehnika-tradicija': {
    title: 'Serbian Royal Goldwork (Zlatovez): The Technique of Metallic Thread on Velvet',
    subtitle: 'An in-depth exploration of archaic gold and silver srma embroidery: cardboard relief underlays, bridal vests (jeleks), and courtly textile treasures.',
    excerpt: 'Goldwork embroidery represents the crowning glory of Serbian textile art. Discover how precious metallic cords are couched over sculptural padding to create shimmering heirlooms.',
    authorRole: 'Master Goldwork Artisan, Jošanica',
    publishDate: 'March 5, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Royal Goldwork & Velvet',
    targetKeywords: ['serbian goldwork', 'zlatovez', 'srma embroidery', 'traditional velvet vest'],
    sections: [
      {
        heading: 'Byzantine Brilliance and Courtly Splendor',
        paragraphs: [
          'Goldwork (zlatovez) blossomed in medieval Serbian royal courts, influenced by Byzantine master embroiderers. Monastic workshops and aristocratic chambers used real spun gold and silver filaments to embellish silk tunics, ceremonial banners, and sacred icons.',
          'In later centuries, this courtly art merged with folk festive garments, creating the breathtaking golden velvet jeleks (vests) worn by brides and godmothers throughout Serbia.'
        ]
      },
      {
        heading: 'The Sculptural Couching Technique',
        paragraphs: [
          'Because thick metallic srma thread is too stiff and fragile to pass through fabric repeatedly without fraying, master embroiderers utilize the "couching" method.',
          'Archival cardboard or cotton cord underlays are cut into floral shapes, and the golden srma is laid over the padding and tacked down with invisible fine silk stitches, producing a magnificent 3D relief.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does real goldwork tarnish over time?',
        answer: 'High-grade metallic srma with a protective microscopic gold coating resists tarnishing when stored away from moisture and direct sunlight.'
      },
      {
        question: 'Can modern evening jackets be customized with goldwork?',
        answer: 'Yes! We frequently craft bespoke goldwork lapels, cuffs, and bolero vests for modern galas, weddings, and red carpet events.'
      }
    ],
    conclusion: 'Serbian goldwork is wearable light — a majestic craft reflecting our deepest artistic aspirations and historical nobility.'
  },

  // 7. Muski Etno Aksesoari
  'muski-etno-aksesoari-srpska-tradicija': {
    title: 'Men’s Heritage Folk Accessories: Braided Jeleks, Woven Sashes (Tkanice), and Fur Hats',
    subtitle: 'Complete guide to masculine traditional attire: how to assemble, size, and wear heritage woolen vests, multi-colored woven sashes, and authentic accessories.',
    excerpt: 'Explore the stately elements of Serbian men’s folk dress: the heavy wool sukno jelek with braided gajtans, the 3-meter woven tkanica belt, and pocket accessories.',
    authorRole: 'Heritage Costume Tailor, Savremeni Koreni',
    publishDate: 'March 7, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Men’s Folk Accessories',
    targetKeywords: ['serbian men folk costume', 'tkanica belt', 'traditional wool vest', 'folk dance accessories'],
    sections: [
      {
        heading: 'The Stately Dignity of the Serbian Man’s Dress',
        paragraphs: [
          'Men’s folk costumes in Serbia exude restraint, strength, and impeccable proportion. The cornerstone of the outfit is the jelek — a tailored vest crafted from dark fulled wool (čoja or sukno) adorned with spiraling black or navy braided cords (gajtani).',
          'Around the waist, the legendary tkanica sash is wrapped firmly multiple times, supporting the lower back and creating a striking burst of geometric color.'
        ]
      },
      {
        heading: 'The Woven Tkanica: 3 Meters of Living Geometry',
        paragraphs: [
          'The tkanica is woven on narrow horizontal looms from fine wool and cotton. Reaching 3 to 4 meters in length, it is wrapped snugly clockwise around the abdomen, with the fringed ends neatly tucked under.',
          'Beyond its visual splendor, the tkanica served an ergonomic purpose for riders and heavy laborers by stabilizing the lumbar spine.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I choose the correct size for a men’s traditional vest?',
        answer: 'Measure chest circumference over a shirt, as well as torso length from base of neck to belt line. Our vests are tailored with generous armholes to facilitate energetic folk dance movements.'
      },
      {
        question: 'How is a woolen jelek cleaned?',
        answer: 'Professional dry cleaning or gentle steaming is recommended to maintain the crisp alignment of the braided gajtan cords.'
      }
    ],
    conclusion: 'Men’s folk attire is an enduring statement of pride, dignity, and masculine elegance rooted in deep ancestral soil.'
  },

  // 8. Runska Vuna
  'runska-vuna-prirodna-predenje-lekovitost': {
    title: 'Raw Fleece Wool & Hand Spinning: Healing Lanolin and Mountain Traditions',
    subtitle: 'From spring shearing in Homolje villages to spindle spinning and therapeutic joint relief: why pure unstripped sheep wool outshines synthetic fibers.',
    excerpt: 'Discover the ancient journey of mountain fleece wool — washed in alpine streams without harsh chemicals, carded on iron combs, and spun by hand for supreme warmth.',
    authorRole: 'Textile Artisan & Wool Specialist, Jošanica',
    publishDate: 'March 4, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Fleece Wool & Craft',
    targetKeywords: ['fleece wool', 'hand spinning spindle', 'lanolin benefits', 'homolje sheep wool'],
    sections: [
      {
        heading: 'What is Raw Fleece Wool?',
        paragraphs: [
          'Fleece wool is harvested during spring shearing from healthy sheep grazing on the alpine slopes of the Homolje mountains. Washed gently in cold mountain water without industrial acid stripping, it preserves its precious natural lanolin.',
          'Spun on traditional spindles (vreteno) and spinning wheels (preslica), hand-spun yarn possesses an organic air-pocket structure that provides thermal insulation unmatched by synthetic acrylics.'
        ]
      },
      {
        heading: 'Proven Therapeutic Benefits: Joint Relief and Circulation',
        paragraphs: [
          '1. Natural Lanolin: Calms skin irritation, delivers antimicrobial protection, and eases rheumatic stiffness.',
          '2. Micro-capillary stimulation: Fine elastic wool scales create a continuous subtle massage on feet and legs, stimulating blood flow.',
          '3. Moisture absorption: Wool absorbs up to 33% of its weight in moisture while remaining completely dry to the touch.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do you tell real wool from synthetic acrylic without a lab?',
        answer: 'Snip a 2 cm piece and light it with a match: genuine wool burns slowly, smells like singed hair, and crushes into dark, fragile ash. Acrylic melts rapidly into a hard plastic bead with chemical fumes.'
      },
      {
        question: 'How should raw wool items be washed?',
        answer: 'Always wash in lukewarm water (under 30°C) with mild wool detergent. Never wring; gently squeeze water into a towel and dry flat.'
      }
    ],
    conclusion: 'Pure fleece wool is a living gift of nature that nurtures the health of the entire home.'
  },

  // 9. Heklanje za Pocetnike
  'heklanje-za-pocetnike-seme-i-osnovni-bodovi': {
    title: 'Crochet for Beginners & Chart Reading: Basic Stitches, Chains, and First Projects',
    subtitle: 'From your first slip knot to finished lace: mastering hook grip, yarn tension, reading international chart symbols, and crafting coasters and jewelry.',
    excerpt: 'Crochet is one of the most soothing, mindful crafts in the world. Learn everything about choosing the right hook size, holding yarn effortlessly, and unlocking endless creativity.',
    authorRole: 'Master Artisan & Teacher, Jošanica',
    publishDate: 'March 8, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Crochet & Techniques',
    targetKeywords: ['crochet for beginners', 'crochet stitches', 'crochet charts', 'learn to crochet'],
    sections: [
      {
        heading: 'Why Crochet is the Ultimate Mindful Hobby',
        paragraphs: [
          'Unlike knitting with multiple needles, crochet has a huge beginner advantage: only one single loop is active on your hook at any moment! If you make a mistake, you simply pull the yarn back without fear of dropping rows.',
          'Neuroscience confirms that the rhythmic bilateral hand movements of crochet stimulate dopamine and serotonin release while significantly lowering cortisol levels.'
        ]
      },
      {
        heading: 'Foundational Stitches You Must Master',
        paragraphs: [
          '1. Slip Knot & Foundation Chain (ch): The launchpad of every project.',
          '2. Single Crochet (sc / niski stubić): Dense, sturdy stitch ideal for structured bags and amigurumi.',
          '3. Double Crochet (dc / visoki stubić): Taller, flexible stitch perfect for lace, shawls, and cardigans.',
          '4. Slip Stitch (sl st): Used for invisible seam joins and delicate surface edging.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How long does it take for a total beginner to learn crochet?',
        answer: 'Most beginners master basic chains and single crochets within 2-3 hours of guided practice, completing their first coaster or bookmark within two days.'
      },
      {
        question: 'How do I prevent my crochet edges from curling or slanting?',
        answer: 'Curling usually occurs if you forget the turning chain at the start of a row or accidentally skip/add stitches at the edges. Count your stitches regularly until you build muscle memory.'
      }
    ],
    conclusion: 'A simple crochet hook and a ball of yarn are all you need to weave daily peace and beauty with your own hands.'
  },

  // 10. Srpski Suveniri i Etno Pokloni
  'srpski-suveniri-etno-pokloni-autenticnost': {
    title: 'Authentic Serbian Souvenirs & Ethno Gifts: Memorable Handcrafted Treasures',
    subtitle: 'Guide to choosing unforgettable gifts with soul: white Vlach fur hats, embroidered wool socks, luxury ethno bags, and corporate keepsakes from Homolje.',
    excerpt: 'Forget cheap plastic trinkets. When you want to present the true heart of Serbia to foreign guests, wedding parties, or business partners, choose authentic artisan handcrafts.',
    authorRole: 'Cultural Heritage Consultant, Jošanica',
    publishDate: 'March 11, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Gifts & Souvenirs',
    targetKeywords: ['serbian souvenirs', 'authentic ethno gifts serbia', 'handcrafted serbian gifts', 'corporate gifts serbia'],
    sections: [
      {
        heading: 'Why Authentic Handcrafts Outshine Commercial Souvenirs',
        paragraphs: [
          'When foreign travelers, diaspora families, or business executives visit Serbia, they yearn for authentic cultural artifacts that tell a genuine human story.',
          'A pair of hand-knitted wool socks with floral relief embroidery or an embroidered linen table runner connects the recipient directly to centuries of pastoral craftsmanship.'
        ]
      },
      {
        heading: 'Top Handcrafted Gift Ideas for Every Occasion',
        paragraphs: [
          '• For Foreign Dignitaries & Business Partners: A bespoke embroidered Serbian cotton shirt or luxury framed goldwork panel.',
          '• For Family & Friends Abroad: Hand-knitted pure fleece socks and embroidered indoor slippers.',
          '• For Weddings & Slavas: Hand-embroidered linen table runners framed with crochet lace.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do gifts come with certificates of authenticity for overseas travelers?',
        answer: 'Yes, all items from Savremeni Koreni include a bilingual artisan certificate explaining the historical motifs, materials, and workshop origin in Jošanica.'
      },
      {
        question: 'Can you handle custom corporate gifting orders with bespoke packaging?',
        answer: 'Yes! We craft custom gift boxes tailored for corporate events, diplomatic visits, and luxury weddings with branded gift tags and custom embroidered details.'
      }
    ],
    conclusion: 'A handcrafted Serbian gift is a treasure of timeless warmth, artistic integrity, and heartfelt memory.'
  },

  // 11. Zenske Torbice i Unikatne Torbe
  'zenske-torbice-unikatne-torbe-vodic': {
    title: 'Women’s Handbags & Bespoke Purses: Why Handcrafted Artistry Outshines Synthetic Brands',
    subtitle: 'The comprehensive guide to women’s bags, online shopping, comparing artisan bags to Guess and Pinko, and the enduring value of embroidered bags with wooden handles.',
    excerpt: 'In search of the perfect handbag, conscious shoppers increasingly ask: is it worth paying high prices for synthetic commercial brands or investing in a bespoke handmade bag with soul?',
    authorRole: 'Designer & Master Artisan, Savremeni Koreni',
    publishDate: 'February 18, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Handbags & Accessories',
    targetKeywords: ['womens handbags', 'bespoke bags', 'handcrafted purse', 'artisan bags serbia', 'wooden handle bag'],
    sections: [
      {
        heading: 'The Handbag as an Expression of Identity',
        paragraphs: [
          'A handbag is never just a utility container for phone and makeup; it is the definitive stylistic signature of every outfit and a silent manifesto of personal values.',
          'While commercial fashion houses flood streets with mass-produced polyurethane bags with stamped logos, slow-fashion connoisseurs are turning toward one-of-a-kind artisan creations made from natural timber, cotton cord, and hand embroidery.'
        ]
      },
      {
        heading: 'The Flaws of Mass Production vs. Handcrafted Permanence',
        paragraphs: [
          'Most industrial designer bags are crafted from synthetic PU faux leather that cracks at folded seams after a season or two. In contrast, our handcrafted bags are constructed with solid walnut handles, laser-cut hardwood bases, and tightly crocheted structural ribs that endure for years.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the difference between an artisan handmade handbag and commercial brands like Guess or Pinko?',
        answer: 'Commercial brands are mass-produced by the millions using synthetic petrochemicals (polyurethane, faux leather), where the retail price predominantly finances global marketing campaigns and logos. A bespoke artisan bag from Savremeni Koreni is crafted over hours from 100% natural cotton cord, solid walnut wood, and hand-embroidered Serbian canvas, ensuring a truly unique piece that no one else in the world owns.'
      },
      {
        question: 'How do you care for an artisan cotton cord handbag with wooden handles?',
        answer: 'Spot clean the bag with a dry or lightly dampened microfiber cloth and mild soap. The textile body can be gently cleaned without submerging the wooden components in water. Applying a drop of natural linseed oil or beeswax polish to the solid wood handles once a year preserves their warm grain and luster.'
      },
      {
        question: 'What is the carrying capacity and structural strength of an artisan bag with wooden handles?',
        answer: 'Thanks to dense knotting and high-tensile braided cotton cord, our handbags comfortably carry 5 to 6 kg (wallet, planner, smartphone, glasses case, cosmetic pouch), with the hardwood handles distributing weight evenly without deformation.'
      },
      {
        question: 'Can I order a custom bespoke handbag with personalized embroidery or in a different color?',
        answer: 'Absolutely yes! In the Savremeni Koreni studio, we create bespoke handbags to order, allowing you to choose your yarn shade (natural beige, charcoal black, terracotta, olive green), exact dimensions, and personalized embroidery motifs (family monogram, favorite botanical blossom, or ethno ornament).'
      }
    ],
    conclusion: 'Choose a handbag that carries the scent of mountain timber, the warmth of pure cotton, and the enduring beauty of authentic needlework.'
  },

  // 12. Muske Torbice i Poslovne Torbe
  'muske-torbice-poslovna-torba-vodic': {
    title: 'Men’s Bags & Leather Briefcases: A Guide to Style, Leather, Canvas, and Functionality',
    subtitle: 'Selecting the perfect men’s crossbody bag, laptop briefcase, and travel duffel: the structural advantages of full-grain leather and artisan craftsmanship over sports nylon.',
    excerpt: 'Men’s bags are no longer a style taboo, but an urban essential. Discover how full-grain leather and waxed canvas provide unmatched elegance and longevity for modern professionals.',
    authorRole: 'Leather & Textile Artisan, Savremeni Koreni',
    publishDate: 'February 20, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Men’s Bags & Business',
    targetKeywords: ['mens bags', 'leather briefcase', 'mens crossbody bag', 'laptop bag artisan'],
    sections: [
      {
        heading: 'The Evolution of the Men’s Bag',
        paragraphs: [
          'Modern trousers and jacket pockets cannot gracefully hold today’s essentials: large smartphones, keys, wallets, earbuds, and sunglasses. Overstuffed pockets ruin tailoring and wear out pocket linings.',
          'An artisan crossbody bag or leather briefcase in cognac or tobacco brown elevates any business suit or weekend denim jacket with distinguished masculine elegance.'
        ]
      },
      {
        heading: 'Key Models: Crossbody, Briefcase, and Weekender',
        paragraphs: [
          '1. Compact Crossbody Bag: Perfect for urban commutes, keeping hands free while securing valuables.',
          '2. Executive Briefcase: Padded laptop compartment (14-16"), separate A4 document dividers, and solid brass hardware.',
          '3. Weekender Duffel: Generous full-grain leather travel bag for weekend business trips and gym sessions.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why is a genuine leather men’s bag a superior investment to synthetic alternatives?',
        answer: 'Synthetic polyurethane or nylon bags crack and peel after a year of daily wear and must be discarded. High-grade genuine leather endures for decades, develops an increasingly distinguished patina over time, resists rain and snow, and consistently exudes refined, mature style.'
      },
      {
        question: 'What should a modern professional briefcase comfortably hold?',
        answer: 'A standard executive briefcase should comfortably accommodate a laptop (13-15 inches) in a padded sleeve, charger, smartphone, wallet, A4 document folders without bent corners, keys, and pens.'
      },
      {
        question: 'How is a men’s leather briefcase properly maintained?',
        answer: 'Once or twice a year, treat the leather with a specialized beeswax balm or leather conditioner to nourish the hide and prevent drying out. If the bag gets wet in rain or snow, let it dry naturally at room temperature away from direct radiators.'
      }
    ],
    conclusion: 'Invest in pieces crafted with artisan passion and timeless materials that effortlessly defy the test of time.'
  },

  // 13. Vezenje na Tekstil
  'vezenje-na-tekstil-rucni-rad-umetnost': {
    title: 'Embroidery & Handcrafts: A Guide to Textile Needlework and Mindful Art',
    subtitle: 'Why textile embroidery is experiencing a global renaissance, how to master beginner stitches, and how personalized needlework breathes soul into modern clothing.',
    excerpt: 'Embroidery is not a forgotten past — it is a potent form of creative meditation and the most noble way to personalize contemporary clothing. Learn the core principles of textile embroidery.',
    authorRole: 'Master Embroiderer, Savremeni Koreni',
    publishDate: 'February 22, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Needlework & Mindful Craft',
    targetKeywords: ['textile embroidery', 'hand embroidery basics', 'embroidery on clothes', 'embroidery stitches'],
    sections: [
      {
        heading: 'Returning to Our Roots: Why Handcrafts Matter Today',
        paragraphs: [
          'In a world overwhelmed by digital notifications and screens, the human spirit craves tactile creation. The rhythmic passage of needle through taut linen lowers stress, reduces blood pressure, and cultivates deep mental focus.'
        ]
      },
      {
        heading: 'Step-by-Step Beginner Embroidery Guide',
        paragraphs: [
          'All you need to begin is a sturdy wooden hoop (15-20 cm), sharp embroidery scissors, crewel needles, stranded cotton mouliné thread, and pure cotton or linen fabric.',
          'Start with the running stitch and stem stitch for outlines and lettering, then advance to satin stitch to fill flower petals and geometric motifs with sculptural relief.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the difference between machine embroidery and hand embroidery on textiles?',
        answer: 'Machine embroidery is rapid, flat, and uniform, driven by software stitching thousands of computerized punctures into a stiff backing sheet. Hand embroidery carries organic textural relief, human warmth, individually adjusted thread tension, and feels incomparably softer on the skin without creating a stiff cardboard feel beneath the pattern.'
      },
      {
        question: 'Can hand embroidery be applied to pre-existing ready-to-wear clothing?',
        answer: 'Yes! Hand embroidery can be beautifully applied to tailored shirts, denim jackets, jeans pockets, handbags, and canvas tote bags. Simply position a smaller embroidery hoop and ensure you do not catch garment linings or the opposite side of the clothing.'
      },
      {
        question: 'What is the easiest stitch for beginners learning embroidery?',
        answer: 'The simplest beginner stitches are the running stitch and stem stitch, which are ideal for outlines, lettering, and stems. For filling areas, cross-stitch and satin stitch are the most popular and versatile.'
      }
    ],
    conclusion: 'Pick up needle and thread, unleash your creativity, and craft something that will be cherished for generations.'
  },

  // 14. Sve za Vezenje i Sivenje
  'sve-za-vezenje-sivenje-platno-konac-pribor': {
    title: 'Embroidery & Sewing Materials: Fabrics, Threads, Needles, and Essential Supplies',
    subtitle: 'A master guide to sewing and embroidery materials: choosing the right linen, Serbian woven cotton, Panama, stranded mouliné threads, and needle gauges.',
    excerpt: 'For your embroidery or tailored piece to last decades, material quality is paramount. Here is a comprehensive overview of fabric weights, thread types, and essential sewing notions.',
    authorRole: 'Textile Specialist, Savremeni Koreni',
    publishDate: 'February 24, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Sewing Supplies & Fabrics',
    targetKeywords: ['embroidery fabric', 'embroidery floss', 'sewing supplies', 'serbian woven canvas', 'embroidery needles'],
    sections: [
      {
        heading: 'The Foundation of Every Masterpiece',
        paragraphs: [
          'In sewing and embroidery, an unwritten rule holds true: even the most skilled hands cannot produce a masterpiece from inferior materials. Quality linen, domestic woven cotton, and double-mercerized colorfast threads are the bedrock of enduring textile art.'
        ]
      },
      {
        heading: 'Choosing the Right Fabric: Serbian Canvas, Panama, Aida, or Pure Linen?',
        paragraphs: [
          '1. Authentic Serbian Woven Canvas: 100% breathable pure cotton with a visible rustic weave — our top choice for shirts, blouses, and ethno bags.',
          '2. Aida Cloth: The world-standard grid fabric for counted cross-stitch (Aida 14 is perfect for beginners).',
          '3. Panama Fabric: Dense, even-weave cotton canvas ideal for table runners, cushions, and decorative panels.',
          '4. Pure Flax Linen: Prestigious, crisp natural fabric offering unmatched heirloom elegance.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What should a quality beginner embroidery kit include?',
        answer: 'A wooden hoop (16-18 cm), fabric canvas (Aida 14 or cotton woven canvas 30x30 cm), 5-8 core colors of stranded cotton mouliné thread, assorted blunt tapestry and sharp crewel needles, precision embroidery snips, and a water-soluble fabric marking pen.'
      },
      {
        question: 'How do you prevent embroidery threads from fading or bleeding onto fabric during washing?',
        answer: 'Always use certified double-mercerized, reactive-dyed cotton mouliné threads. Wash finished embroidered pieces by hand in lukewarm water with mild liquid detergent, and never use aggressive bleaching agents.'
      },
      {
        question: 'What is the difference between sewing thread and embroidery mouliné floss?',
        answer: 'Sewing thread is a single, tightly spun strand engineered for structural seam strength. Stranded embroidery mouliné floss consists of 6 divisible silky cotton threads that can be separated to customize stitch thickness, sheen, and relief depth.'
      }
    ],
    conclusion: 'When you invest in honest natural fabrics and premium threads, the creative journey becomes pure joy and your creations stand the test of time.'
  },

  // 15. Modern Makrame
  'modern-makrame-tehnike-hearts-dreamcatcher': {
    title: 'Modern Macramé & Hand Knotting: Techniques, Hearts Macramé, Dreamcatchers, and Macraweaving',
    subtitle: 'The ultimate guide to the modern macramé movement, heart-shaped knotting techniques, crafting dreamcatchers, and fusing weaving with knots.',
    excerpt: 'Macramé is a leading global trend in conscious interior design and bespoke fashion accessories. Learn how to master modern knotting and craft artistic wall tapestries with your own hands.',
    authorRole: 'Master Knotter & Fiber Artist, Savremeni Koreni',
    publishDate: 'February 26, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Macramé & Wall Art',
    targetKeywords: ['modern macrame', 'hearts macrame', 'macrame dreamcatcher', 'macraweaving', 'fiber art'],
    sections: [
      {
        heading: 'The Renaissance of Ancient Knotting Art',
        paragraphs: [
          'Macramé has undergone a breathtaking aesthetic transformation. Modern macramé embraces pure unbleached natural cotton, organic river driftwood, wooden beads, and clean geometric rhythm.',
          'In our Jošanica studio, macramé is meditation in motion. You need no needles, hooks, or looms — your only tools are your fingers, your imagination, and supple cotton cords.'
        ]
      },
      {
        heading: 'Mastering the Hearts Macramé Technique',
        paragraphs: [
          'The heart motif is among the most sought-after patterns in modern knotting, based on diagonal half-hitch and square knot combinations.',
          'The secret to a symmetrical heart lies in even working tension: maintain steady pull angles across both leader cords to prevent warping the heart’s arched silhouette.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How difficult is it for a complete beginner to learn modern macramé?',
        answer: 'Macramé is one of the most accessible textile crafts for beginners! The entire craft is founded on just four foundational knots: the Lark’s Head knot, the Square knot, the Spiral knot, and the Half Hitch. Once you practice these four knots for an afternoon, you can confidently craft a plant hanger or small wall hanging.'
      },
      {
        question: 'How do you clean macramé wall hangings and maintain fluffy fringes?',
        answer: 'Simply shake out dust outdoors or use a vacuum upholstery brush on low suction from a short distance. Fringes, feathers, and tassels can be gently combed with a fine wire comb to keep them perfectly smooth and untangled.'
      },
      {
        question: 'What materials are needed to craft a macramé dreamcatcher?',
        answer: 'You will need a wooden or metal ring (20-30 cm diameter), approximately 40 to 60 meters of 3mm or 4mm cotton macramé cord, wide-hole wooden beads, sharp craft scissors, and a fringe comb.'
      }
    ],
    conclusion: 'Every tied knot represents a small victory of geometry, balance, and mindful serenity in your living space.'
  },

  // 16. Pamucne Trake za Heklanje
  'pamucne-trake-za-heklanje-t-shirt-yarn-torbe': {
    title: 'Cotton T-Shirt Yarn Crochet: How to Craft Rigid Bags, Baskets, and Choose Hook Gauges',
    subtitle: 'Complete manual for working with chunky cotton ribbon yarn: non-twisting crochet methods, integrating wooden and leather bases, and selecting 7mm to 12mm hooks.',
    excerpt: 'Cotton T-shirt yarn has revolutionized structured bags, modern storage baskets, and decorative rugs. Discover artisan secrets for upright, rigid walls that never sag.',
    authorRole: 'Crochet & Textile Designer, Jošanica',
    publishDate: 'February 28, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Crochet & T-Shirt Yarn',
    targetKeywords: ['t-shirt yarn crochet', 'cotton ribbon yarn', 'crochet basket', 'rigid crochet bag'],
    sections: [
      {
        heading: 'Why T-Shirt Yarn Has Taken the Craft World by Storm',
        paragraphs: [
          'T-shirt yarn combines the ultra-soft touch of fine cotton jersey with architectural structural rigidity. Because of its generous thickness, projects progress rapidly before your eyes — a stylish handbag or storage basket can be completed in just one or two relaxing afternoons!'
        ]
      },
      {
        heading: 'The Waistcoat Knit-Stitch & Wooden Base Integration',
        paragraphs: [
          'To create rigid, upright basket and handbag walls, master artisans use the Waistcoat (knit) stitch: inserting the hook directly into the center "V" of the single crochet post.',
          'Mounting the first row directly through the precision holes of a laser-cut beechwood base provides unyielding stability and enables mounting metal base studs.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many skeins of cotton ribbon yarn are needed for a medium handbag?',
        answer: 'For a handbag measuring approximately 22x18 cm (with wooden base and handles), one to one-and-a-half skeins of cotton T-shirt yarn (about 120-150 meters or 400-500 grams) is typically sufficient.'
      },
      {
        question: 'Why does my crocheted T-shirt yarn basket sag or warp out of shape?',
        answer: 'Sagging usually occurs if you use too large a crochet hook (creating loose, floppy stitches), if tension is inconsistent, or if stitches were inadvertently added or dropped in circular rounds. For rigid upright walls, use the waistcoat knit-stitch and a size 7mm or 8mm hook.'
      },
      {
        question: 'Does cotton T-shirt yarn fade or bleed during washing?',
        answer: 'High-grade cotton yarn made from reactive-dyed jersey cotton does not bleed. Washing at 30°C with mild liquid detergent and air-drying flat is recommended.'
      }
    ],
    conclusion: 'Cotton T-shirt yarn offers the perfect union of rapid crafting satisfaction and enduring structural excellence.'
  },

  // 17. Vlaska Subara Bela
  'vlaska-subara-bela-subara-vodic': {
    title: 'The White Vlach Fur Hat (Bela Šubara): Crafting, Crochet Mesh Bases, Fleece Wool, and Homolje Lore',
    subtitle: 'An ethnographic and craft guide to the iconic white conical Vlach fur hat: crocheting the anatomical mesh cap, hand-tufting raw fleece locks, and caring for mountain wool.',
    excerpt: 'The white conical Vlach šubara is the crowning symbol of masculine folk attire in eastern Serbia. Explore the authentic technique of crocheting and hand-knotting raw fleece onto a breathable mesh frame.',
    authorRole: 'Master Artisan & Vlach Heritage Specialist, Jošanica',
    publishDate: 'March 1, 2026',
    readingTime: '10 min read',
    categoryLabel: 'Traditional Fur Hats & Homolje',
    targetKeywords: ['vlach white subara', 'white fur hat serbia', 'homolje folk costume', 'handcrafted wool hat'],
    sections: [
      {
        heading: 'A Mountain Crown of Pride: The Conical White Šubara',
        paragraphs: [
          'In the limestone valleys and beech forests of Homolje (Jošanica, Žagubica), one garment immediately captures the eye with its monumental stature and radiant whiteness — the traditional white Vlach šubara.',
          'While central Serbia wore predominantly black cylindrical fur caps, the conical white cap of Homolje symbolized solar vitality, purity, and the pastoral nobility of highland shepherds.'
        ]
      },
      {
        heading: 'The Unique Craft: Hand-Crocheted Mesh & Tufted Fleece',
        paragraphs: [
          'A genuine white Vlach šubara is not made from stiff pelt leather. Instead, the artisan crochets an anatomical mesh cone from sturdy cotton-wool yarn, then uses a hook to loop and knot hundreds of hand-selected fleece tufts into the mesh grid.',
          'This provides incomparable breathability and natural elasticity, fitting the head securely without uncomfortable pressure.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Is the white conical Vlach šubara heavy to wear?',
        answer: 'On the contrary, it is exceptionally lightweight! Thanks to the hand-crocheted breathable mesh skullcap instead of heavy tanned leather, the entire šubara weighs only 200 to 300 grams, allowing folk dancers effortless freedom during fast, acrobatic stage spins.'
      },
      {
        question: 'How do I determine my correct size when ordering a white šubara?',
        answer: 'Measure your head circumference in centimeters with a soft tape measure wrapped around your forehead, just above the ears and brow. Standard sizes range from 54 cm to 61 cm. Because of the crocheted mesh base, the hat offers gentle organic elasticity to fit your head contours comfortably.'
      },
      {
        question: 'How long does it take to craft a white Vlach šubara in the Savremeni Koreni workshop?',
        answer: 'The complete artisan process — from washing and carding highland fleece to crocheting the conical mesh cap and hand-knotting hundreds of individual raw wool tufts — requires 3 to 5 full days of dedicated craftsmanship.'
      },
      {
        question: 'Can the white Vlach fur hat be worn for everyday modern winter styling?',
        answer: 'Absolutely! Contemporary stylists frequently pair the traditional white conical šubara with tailored wool overcoats, shearling jackets, or alpine skiwear, creating a bold ethno-modern statement that commands admiration.'
      }
    ],
    conclusion: 'The white Vlach šubara carries the breath of the Homolje mountains and the enduring pride of our ancestors.'
  },

  // 18. Vezene Vunene Carape za Folklor
  'vezene-vunene-carape-za-folklor-vodic': {
    title: 'Embroidered Wool Socks for Folk Dance: 5-Needle Knitting, Floral Embroidery, and Stage Durability',
    subtitle: 'Guide to authentic stage footwear: seamless five-needle knitting, reinforced heels and toes, vibrant botanical embroidery on black wool, and stage care.',
    excerpt: 'Embroidered wool socks are the primary protective layer between dancers and leather opanci. Discover how seamless circular knitting and vibrant relief floral embroidery bring stage choreographies to life.',
    authorRole: 'Master Knitwear Artisan, Savremeni Koreni',
    publishDate: 'March 2, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Folk Costumes & Socks',
    targetKeywords: ['folk dance wool socks', 'serbian embroidered socks', '5 needle knitting', 'stage folklore costume'],
    sections: [
      {
        heading: 'Stage Performance Meets Traditional Comfort',
        paragraphs: [
          'In Serbian and Vlach folklore, the dancer’s feet are under immense physical stress. Authentic five-needle circular wool socks provide essential shock absorption, prevent friction blisters inside leather opanci, and maintain optimal foot thermoregulation.'
        ]
      },
      {
        heading: 'Seamless 5-Needle Craft & Botanical Relief Embroidery',
        paragraphs: [
          'Knitted without any interior seams, our socks feature reinforced double-yarn heels and toes. The upper calf displays a lush floral wreath of roses, hyacinths, and meadow blossoms rendered in luminous, colorfast embroidery threads.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many pairs of embroidered socks does an active folk dancer need during the performance season?',
        answer: 'We recommend at least two pairs so one pair can rest, air out, or be washed between consecutive festival nights, significantly extending yarn lifespan.'
      },
      {
        question: 'Are embroidered socks custom-made to measure?',
        answer: 'Yes, in the Savremeni Koreni workshop we knit socks according to European shoe sizes (from children’s 32-35 up to adult 46), with customizable calf circumference so the socks stay securely in place without cutting into circulation.'
      },
      {
        question: 'Why is natural wool superior to synthetic fibers for folklore performances?',
        answer: 'Wool is a natural thermoregulator: it absorbs up to 30% of its weight in moisture without feeling wet to the touch, keeping the dancer’s foot completely dry. Unlike synthetic nylon which causes feet to slide inside leather opanci and fosters odors, pure sheep fleece ensures friction-free stage grip and hygiene.'
      }
    ],
    conclusion: 'Hand-embroidered wool socks from Jošanica carry the spirited rhythm of the kolo and the living soul of Homolje.'
  },

  // 19. Narodna Nosnja Homoljski Kraj
  'narodna-nosnja-homoljski-kraj-vodic': {
    title: 'Folk Costumes of Homolje: Serbian and Vlach Traditions, Garments, and Woven Ornaments',
    subtitle: 'An ethnographic guide to the treasures of Homolje (Žagubica, Jošanica, Krepoljin): white fur hats, embroidered shirts, woven sashes, velvet vests, aprons, and leather opanci.',
    excerpt: 'Eastern Serbia’s Homolje region preserves one of the most mesmerizing fusions of Serbian and Vlach folk dress. Discover the archaic motifs, ceremonial garments, and living heritage nurtured at Savremeni Koreni.',
    authorRole: 'Costume Historian & Reconstructionist, Jošanica',
    publishDate: 'March 3, 2026',
    readingTime: '11 min read',
    categoryLabel: 'Folk Costumes & Homolje',
    targetKeywords: ['homolje folk costume', 'serbian vlach traditional dress', 'zagubica costume', 'serbian ethnic clothing'],
    sections: [
      {
        heading: 'The Cultural Crossroads of Homolje',
        paragraphs: [
          'Nestled between the Beljanica and Homolje mountains, the villages of Jošanica, Žagubica, and Krepoljin preserved archaic textile traditions untouched by industrialization. Here, Serbian and Vlach customs intertwine into a vivid tapestry of floral embroidery, woven sashes, and hand-tufted white fur hats.'
        ]
      },
      {
        heading: 'Core Garments of the Homolje Ensemble',
        paragraphs: [
          '1. Hand-Woven Cotton Shirts: Cut with wide flowing sleeves and embroidered along the collar, chest, and wrists.',
          '2. Woolen Jelek & Zubun: Tailored long or short vests adorned with metallic braiding and velvet appliques.',
          '3. Tkanica & Pregača: Vibrant woven geometric sashes and front aprons reflecting ancient cosmological symbols.',
          '4. White Vlach Šubara & Embroidered Socks: Crown and foundation of masculine and feminine stage presence.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many pieces comprise a complete men’s Homolje folk costume?',
        answer: 'A complete men’s ensemble comprises 6 to 7 essential pieces: the white (or black) conical šubara, hand-embroidered cotton shirt, tailored wool or velvet vest (jelek), wide woven sash (tkanica), fulled wool trousers (čakšire), embroidered wool socks, and leather opanci with rawhide oputa lacing.'
      },
      {
        question: 'What is the difference between summer and winter Homolje folk dress?',
        answer: 'Summer dress is built on lightweight woven Serbian cotton (shirt and light linen trousers) paired with a lighter vest and opanci. Winter dress incorporates heavy fulled wool trousers, a long fulled coat (gunj or zubun), heavy embroidered wool socks, and a lush fleece white šubara.'
      },
      {
        question: 'How is an embroidered Serbian woven cotton shirt properly washed and pressed?',
        answer: 'Hand-embroidered Serbian canvas shirts are washed at up to 40°C with mild, chlorine-free detergent. Iron on the reverse side while the fabric is still slightly damp to achieve crisp smoothness and highlight the sculptural relief of the embroidered motifs.'
      },
      {
        question: 'Can individual costume garments be ordered or only complete sets?',
        answer: 'At the Savremeni Koreni studio, you can order individual garments (such as a single white šubara, a pair of embroidered socks, a shirt, or a jelek vest) as well as full costume sets for entire folklore ensembles.'
      }
    ],
    conclusion: 'Homolje folk dress is living poetry in thread and wool — a precious cultural jewel lovingly revitalized for the world.'
  },

  // 20. Pletenje Bez Igala
  'pletenje-bez-igala-rukama-prstima-chunky-vuna': {
    title: 'Arm & Finger Knitting: Crafting Giant Chunky Blankets and Scarves with Zero Needles',
    subtitle: 'The arm knitting guide: turning your forearms into needles, selecting giant fleece yarn, making a cloud-soft blanket in 2 hours, and caring for merino wool.',
    excerpt: 'Arm and finger knitting is a global sensation in modern home decor and cozy fashion. Learn how to transform thick fleece roving into the softest, most luxurious blanket using only your arms.',
    authorRole: 'Textile Designer & Knitter, Jošanica',
    publishDate: 'March 9, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Arm Knitting & Home Design',
    targetKeywords: ['arm knitting', 'finger knitting', 'chunky yarn blanket', 'giant wool knitting'],
    sections: [
      {
        heading: 'What is Arm Knitting and Why is It So Popular?',
        paragraphs: [
          'Arm knitting turns your forearms into oversized knitting needles! Using giant thumb-thick roving yarn, stitches measure several centimeters wide, making the process dynamic, sculptural, and astonishingly fast.',
          'While traditional needle-knitted blankets can take a month of daily work, an arm-knitted 120x150 cm throw blanket can be finished in under three joyful hours!'
        ]
      },
      {
        heading: 'Merino Wool Roving vs. Tubular Cotton Yarn',
        paragraphs: [
          '1. Unspun Wool Roving: Cloud-soft, luxurious, and warm, ideal for cozy reading nooks.',
          '2. Tubular Cotton Yarn: Machine-washable cotton tubes filled with plush fiber, perfect for busy households with children and pets.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What if I need to pause arm knitting in the middle of a blanket?',
        answer: 'Simply slide the open loops from your arm onto a broomstick, wooden dowel, or length of cord, and slide them back onto your arm when you resume!'
      },
      {
        question: 'How is a chunky wool blanket cleaned?',
        answer: 'Air out regularly on a breezy dry day. For deep cleaning, use professional dry cleaning.'
      }
    ],
    conclusion: 'Arm knitting bridges the raw tactile magic of mountain wool with modern minimalist home decor.'
  },

  // 21. Ceger Torbe Sivenje
  'ceger-torbe-sivenje-kroj-i-vezeni-motivi': {
    title: 'How to Sew an Eco Canvas Tote Bag with Embroidery: Patterns, Reinforced Handles, and 3D Base',
    subtitle: 'Practical guide to crafting durable, reusable cotton tote bags for shopping and city life: French seams, X-box handle reinforcement, and authentic ethno embroidery.',
    excerpt: 'Replace single-use plastic bags with a handcrafted canvas tote bag. Learn how to sew handles capable of carrying 10 kilograms and construct a structured 3D base.',
    authorRole: 'Master Tailor & Craftsperson, Jošanica',
    publishDate: 'March 10, 2026',
    readingTime: '8 min read',
    categoryLabel: 'Bags & Eco Sewing',
    targetKeywords: ['how to sew tote bag', 'embroidered canvas bag', 'tote bag pattern', 'eco friendly cotton bag'],
    sections: [
      {
        heading: 'The Eco-Friendly and Stylish Renaissance of Canvas Totes',
        paragraphs: [
          'A quality cotton or linen tote bag can replace over 1,500 disposable plastic bags over its lifetime. When adorned with traditional hand embroidery, a simple canvas tote becomes a chic, conscious fashion statement on city streets worldwide.'
        ]
      },
      {
        heading: 'X-Box Handle Reinforcement and 3D Boxed Base',
        paragraphs: [
          'Never attach handles with a single straight line of stitching! We use the double-stitched "X-box" square method, distributing load strain across 16 cm² to effortlessly support 10 to 12 kg.',
          'Boxing the bottom corners creates a 3D base that prevents items from tumbling and keeps the bag sitting neatly upright.'
        ]
      }
    ],
    faqs: [
      {
        question: 'When should embroidery be done — before or after assembling the bag?',
        answer: 'Always embroider the flat fabric panel in a hoop BEFORE stitching the bag together. This keeps the interior clean and allows lining fabrics to conceal thread tails.'
      },
      {
        question: 'How do you wash an embroidered canvas tote bag?',
        answer: 'Machine or hand wash at 30-40°C inside out with mild detergent, then press inside out with a steam iron.'
      }
    ],
    conclusion: 'A hand-stitched canvas tote bag is an enduring investment in planetary wellness and your personal style.'
  },

  // 22. Etno Pokloni Srbija
  'etno-pokloni-srbija-autenticni-suveniri-rucni-rad': {
    title: 'Authentic Ethno Gifts & Souvenirs from Serbia: What to Gift Foreigners, Weddings, and Partners',
    subtitle: 'A curated guide to memorable gifts with soul: white Vlach fur hats, embroidered socks, artisan handbags, and luxury heritage keepsakes from Homolje.',
    excerpt: 'Forget cheap plastic magnets. When you want to gift someone the true spirit of Serbia, choose artisan handcrafts rich in tradition, pure wool, and mountain warmth.',
    authorRole: 'Master Artisan & Cultural Ambassador, Jošanica',
    publishDate: 'March 11, 2026',
    readingTime: '9 min read',
    categoryLabel: 'Ethno Gifts & Souvenirs',
    targetKeywords: ['serbian ethno gifts', 'authentic serbian souvenirs', 'handcrafted gifts serbia', 'luxury folk gifts'],
    sections: [
      {
        heading: 'The Power of a Gift with a Human Story',
        paragraphs: [
          'Whether hosting international guests, attending a family slava, or honoring a wedding couple, handcrafted gifts crafted from Serbian cotton, pure wool, and solid timber make an unforgettable impression.',
          'Each creation from Savremeni Koreni represents dozens of hours of patient artisan care in the heart of eastern Serbia.'
        ]
      },
      {
        heading: 'Curated Recommendations by Occasion',
        paragraphs: [
          '• For Diplomatic and Corporate Guests: Framed goldwork heraldry or custom embroidered linen shirts.',
          '• For Diaspora Families: Traditional embroidered wool socks and Vlach winter fur hats.',
          '• For Weddings & Home Celebrations: Hand-embroidered linen table runners with handcrafted crochet lace.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can you ship handcrafted gifts internationally?',
        answer: 'Yes! We securely package and ship our creations worldwide with protective gift packaging and tracking.'
      },
      {
        question: 'Is it possible to add a personalized handwritten greeting card?',
        answer: 'Yes, we gladly include personalized calligraphy gift notes explaining the historical meaning of the chosen motifs.'
      }
    ],
    conclusion: 'Gift a piece of Serbia’s timeless spirit — a gift that warms the heart, decorates the home, and honors living heritage.'
  }
};

const allPostTranslations: Record<string, BlogTranslation> = {
  ...baseBlogTranslations,
  ...extendedBlogTranslations,
  ...folkAndCostumesTranslations,
  ...craftsAndBagsTranslations,
};

// Complete aliases and cross-references guaranteeing 100% ID and Slug translation matching
const aliasMappings: Record<string, BlogTranslation> = {
  // 1. Homoljski Med & Lekovito Bilje
  'homoljski-med-lekovito-bilje-tradicija-zanati-priroda-josanica': extendedBlogTranslations['homoljski-med-i-lekovito-bilje-tradicija'],

  // 2. Makrame Konac, Craftcord i Kanap
  'makrame-konac-craftcord-kanap-snur-twisted-vodic-kroz-debljine': extendedBlogTranslations['makrame-konac-craftcord-kanap-vodic'],

  // 3. Vezene Carape za Folklor
  'vezene-carape-za-folklor-vodic': folkAndCostumesTranslations['vezene-carape-za-folklor-vodic'],
  'vezene-carape-za-folklor-vunene-cvetni-vez-pet-igala': folkAndCostumesTranslations['vezene-carape-za-folklor-vodic'],

  // 4. Vrste Veza: Velika Enciklopedija
  'vrste-veza-srpska-tradicija-tehnike-i-bodovi': extendedBlogTranslations['vrste-veza-srpska-tradicija-bodovi'],

  // 5. Srpska Narodna Nosnja: Veliki Vodic
  'srpska-narodna-nosnja-kompletan-vodic-delovi-istorija': extendedBlogTranslations['srpska-narodna-nosnja-vodic-kroz-delove'],

  // 6. Heklanje od A do Š
  'heklanje-vodic-kroz-heklani-nakit-tehnike-i-cipku': extendedBlogTranslations['heklanje-vodic-kroz-heklani-nakit-cipku'],

  // 7. Rucno Cvorovanje (Makrame) Torbe i Drvo
  'rucno-cvorovanje-makrame-torbe-kanap-i-drvo': extendedBlogTranslations['rucno-cvorovanje-makrame-torbe-drvo'],

  // 8. Jelek za Folklor
  'jelek-za-folklor-narodni-srpski-jelek-zlatovez-kroj': extendedBlogTranslations['jelek-za-folklor-srpski-zlatovez-kroj'],

  // 9. Tkanice i Tkani Pojasevi
  'tkanice-tkani-pojasevi-narodna-nosnja-razboj': extendedBlogTranslations['tkanice-i-tkani-pojasevi-razboj-vezivanje'],

  // 10. Vunene Carape Pletene na 5 Igala
  'vunene-carape-pletene-na-pet-igala': folkAndCostumesTranslations['vunene-carape-pletene-na-pet-igala'],
  'vunene-carape-pletenje-na-pet-igala-lekovitost-vune': folkAndCostumesTranslations['vunene-carape-pletene-na-pet-igala'],

  // 11. Tajna Homoljskih Subara
  'tajna-homoljskih-subara-prirodno-krzno': folkAndCostumesTranslations['tajna-homoljskih-subara-prirodno-krzno'],
  'srpska-subara-prirodno-krzno-homolje-vodic': folkAndCostumesTranslations['tajna-homoljskih-subara-prirodno-krzno'],

  // 12. Zlatovez Tehnika Srma Plis Svila
  'zlatovez-tehnika-srma-plis-svila': craftsAndBagsTranslations['zlatovez-tehnika-srma-plis-svila'],
  'zlatovez-tehnika-vezenja-srma-plis-svila-istorija': craftsAndBagsTranslations['zlatovez-tehnika-srma-plis-svila'],

  // 13. Prirodna Runska Vuna za Pletenje
  'prirodna-runska-vuna-za-pletenje-svojstva': folkAndCostumesTranslations['prirodna-runska-vuna-za-pletenje-svojstva'],
  'prirodna-runska-vuna-za-pletenje-lekovitost-lanolin': folkAndCostumesTranslations['prirodna-runska-vuna-za-pletenje-svojstva'],

  // Slugs for all other existing articles to guarantee slug-based matching
  'vez-kroz-vekove-i-danas-rucni-vez': allPostTranslations['vez-kroz-vekove-savremeni-stil'],
  'opanci-za-folklor-srpski-opanci-izrada-i-vrste': folkAndCostumesTranslations['opanci-za-folklor-srpski-izrada-koza'],
  'heklanje-za-pocetnike-seme-osnovni-bodovi-tehnika': craftsAndBagsTranslations['heklanje-za-pocetnike-seme-i-osnovni-bodovi'],
  'pletenje-bez-igala-rukama-prstima-chunky-debela-vuna': craftsAndBagsTranslations['pletenje-bez-igala-rukama-prstima-chunky-vuna'],
  'ceger-torbe-sivenje-kroj-platno-vez-eko-moda': craftsAndBagsTranslations['ceger-torbe-sivenje-kroj-i-vezeni-motivi'],
  'etno-pokloni-srbija-autenticni-suveniri-rucni-rad-tradicija': craftsAndBagsTranslations['etno-pokloni-srbija-autenticni-suveniri-rucni-rad'],
  'zenske-torbice-i-unikatne-torbe-autentican-rucni-rad-vs-brendovi': craftsAndBagsTranslations['zenske-torbice-unikatne-torbe-vodic'],
  'muske-torbice-i-poslovne-torbe-vodic-kroz-stil-i-funkcionalnost': craftsAndBagsTranslations['muske-torbice-poslovna-torba-vodic'],
  'vezenje-na-tekstilu-i-rucni-rad-kompletan-vodic': craftsAndBagsTranslations['vezenje-na-tekstil-rucni-rad-umetnost'],
  'sve-za-vezenje-i-sivenje-platno-konac-igle-pribor-vodic': craftsAndBagsTranslations['sve-za-vezenje-sivenje-platno-konac-pribor'],
  'modern-makrame-i-rucno-cvorovanje-tehnike-hearts-dreamcatcher-macraweaving': craftsAndBagsTranslations['modern-makrame-tehnike-hearts-dreamcatcher'],
  'pamucne-trake-za-heklanje-t-shirt-predja-torbe-korpice-vodic': craftsAndBagsTranslations['pamucne-trake-za-heklanje-t-shirt-yarn-torbe'],
  'vlaska-subara-bela-subara-izrada-heklanje-homolje': folkAndCostumesTranslations['vlaska-subara-bela-subara-vodic'],
  'narodna-nosnja-homoljski-kraj-srpska-vlaska-tradicija-vodic': folkAndCostumesTranslations['narodna-nosnja-homoljski-kraj-vodic'],
};

export const blogEnglishTranslations: Record<string, BlogTranslation> = {
  ...allPostTranslations,
  ...aliasMappings,
};

/**
 * Returns a fully localized version of a BlogPost based on the current language flag.
 */
export function getLocalizedBlogPost(post: BlogPost, isEn: boolean): BlogPost {
  if (!isEn) return post;
  
  const translation = blogEnglishTranslations[post.id] || blogEnglishTranslations[post.slug];
  if (!translation) return post;

  return {
    ...post,
    title: translation.title || post.titleEn || post.title,
    subtitle: translation.subtitle || post.subtitleEn || post.subtitle,
    excerpt: translation.excerpt || post.excerptEn || post.excerpt,
    authorRole: translation.authorRole || post.authorRoleEn || post.authorRole,
    publishDate: translation.publishDate || post.publishDateEn || post.publishDate,
    readingTime: translation.readingTime || post.readingTimeEn || post.readingTime,
    categoryLabel: translation.categoryLabel || post.categoryLabelEn || post.categoryLabel,
    targetKeywords: translation.targetKeywords || post.targetKeywordsEn || post.targetKeywords,
    sections: post.sections.map((sec, idx) => {
      const secTrans = translation.sections?.[idx];
      return {
        ...sec,
        heading: secTrans?.heading || sec.headingEn || sec.heading,
        paragraphs: secTrans?.paragraphs || sec.paragraphsEn || sec.paragraphs,
        quote: secTrans?.quote ? {
          text: secTrans.quote.text,
          caption: secTrans.quote.caption
        } : sec.quote ? {
          text: sec.quote.textEn || sec.quote.text,
          caption: sec.quote.captionEn || sec.quote.caption
        } : undefined,
        keyTakeaway: secTrans?.keyTakeaway || sec.keyTakeawayEn || sec.keyTakeaway,
        bulletPoints: secTrans?.bulletPoints || sec.bulletPointsEn || sec.bulletPoints,
        imageCaption: secTrans?.imageCaption || sec.imageCaptionEn || sec.imageCaption,
      };
    }),
    faqs: post.faqs.map((faq, idx) => {
      const faqTrans = translation.faqs?.[idx];
      return {
        question: faqTrans?.question || faq.questionEn || faq.question,
        answer: faqTrans?.answer || faq.answerEn || faq.answer,
      };
    }),
    conclusion: translation.conclusion || post.conclusionEn || post.conclusion,
  };
}
