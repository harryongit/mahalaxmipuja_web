export interface Puja {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  isCustomAmount?: boolean;
  minAmount?: number;
  benefits?: string[];
  process?: string[];
  faqs?: { q: string; a: string }[];
}

export interface ChadhavaItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

export interface PrasadItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  isCustomAmount?: boolean;
  minAmount?: number;
}

export interface DarshanSlot {
  id: string;
  title: string;
  description: string;
  type: "online" | "offline";
  price: number;
  time: string;
  image: string;
}

export interface TempleEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  image: string;
  tag?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

// Single Temple Info — Mahalaxmi Mandir, Kolhapur (Ambabai)
export const templeInfo = {
  name: "Shri Mahalaxmi Mandir, Kolhapur",
  location: "Kolhapur, Maharashtra",
  deity: "Goddess Mahalaxmi (Ambabai)",
  description:
    "One of the most sacred Shakti Peethas in India, Shri Mahalaxmi Mandir in Kolhapur is dedicated to Goddess Mahalaxmi (Ambabai). The temple is renowned for its ancient heritage, spiritual significance, and the powerful deity who blesses devotees with prosperity and well-being.",
  image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=1200",
  timings: "5:00 AM – 9:30 PM",
  phone: "+91 98765 43210",
  email: "info@mahalaxmikolhapur.com",
  address: "Mahalaxmi Temple Road, Kolhapur, Maharashtra 416012, India",
  history: "The Mahalaxmi Temple of Kolhapur is one of the oldest and most significant temples in India. It is believed to have been originally built during the Chalukya period (7th century CE). The temple has been renovated and expanded over centuries by various dynasties including the Shilahara, Yadava, and Maratha rulers. It is one of the 51 Shakti Peethas and holds immense importance in Hindu tradition.",
  architecture: "The temple showcases a blend of Hemadpanthi and Chalukyan architectural styles. The main sanctum houses the idol of Goddess Mahalaxmi adorned with precious ornaments. The temple complex includes multiple shrines, a large courtyard, and beautifully carved pillars and ceilings.",
  festivals: "Navratri (Ghatasthapana to Dussehra) is the grandest festival celebrated here with immense devotion. Lalita Panchami, Ashtami, and Khande Navami are especially significant. Other major festivals include Kojagiri Pournima, Diwali, and the annual Kirnotsav (rays of sun falling directly on the deity).",
  significance: "The idol of Mahalaxmi is believed to be self-manifested (Swayambhu). The temple is one of the six Mahalaxmi temples and is considered the most important. The annual Kirnotsav, where the rays of the setting sun fall directly on the face of the idol, is a unique natural phenomenon observed in January and November.",
};

export const templeHistory = [
  { year: "7th Century CE (circa 634 CE)", title: "Temple Construction", desc: "Temple constructed during the Chalukya dynasty by King Karnadeva" },
  { year: "Architectural Heritage", title: "Classic Architecture", desc: "Classic Chalukya and Hemadpanthi architectural styles implemented" },
  { year: "Spiritual Recognition", title: "Shaktipeeth Status", desc: "Established as one of the three and a half Shaktipeeths in Maharashtra" },
  { year: "Present Day", title: "Living Heritage", desc: "Continues to attract millions of devotees annually" },
];

export const dailyTempleRoutine = [
  { time: "5:00 AM", activity: "Kakad Aarti", desc: "Morning awakening aarti of the Goddess" },
  { time: "6:00 AM", activity: "Abhishek", desc: "Sacred bath of the deity with milk, honey & water" },
  { time: "7:00 AM", activity: "Shringar", desc: "Adornment of the Goddess with ornaments & flowers" },
  { time: "8:00 AM", activity: "Darshan Opens", desc: "Temple opens for general darshan" },
  { time: "12:00 PM", activity: "Madhyanh Aarti", desc: "Afternoon aarti with Naivedya offering" },
  { time: "3:00 PM", activity: "Afternoon Darshan", desc: "Darshan resumes after afternoon rest" },
  { time: "7:00 PM", activity: "Dhoop Aarti", desc: "Evening aarti with incense & lamps" },
  { time: "9:00 PM", activity: "Shej Aarti", desc: "Night aarti — closing ceremony" },
  { time: "9:30 PM", activity: "Temple Closes", desc: "Temple closes for the day" },
];

export const templeGallery = [
  { src: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600", caption: "Mahalaxmi Temple Front View" },
  { src: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600", caption: "Sacred Aarti Ceremony" },
  { src: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600", caption: "Navratri Celebrations" },
  { src: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600", caption: "Temple Architecture" },
  { src: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=600", caption: "Havan Ceremony" },
  { src: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600", caption: "Festival Decorations" },
];

// Festival period: 22 September to 7 October
export const festivalDays = [
  "Ghatasthapana",
  "Lalita Panchami",
  "Ashtami",
  "Khande Navami",
  "Dasara / Dussehra",
];

export const festivalStartDate = new Date(2026, 8, 22); // 22 Sep 2026
export const festivalEndDate = new Date(2026, 9, 7);    // 7 Oct 2026

// CATEGORY: Pooja Services
export const pujas: Puja[] = [
  {
    id: "ps1",
    title: "Kumkumarchan",
    description: "Performed on silver paduka in devotee name",
    date: "22 Sep – 7 Oct",
    price: 551,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
    tag: "Popular",
    benefits: ["Blessings of Goddess Mahalaxmi", "Prosperity and wealth", "Removal of obstacles", "Peace of mind"],
    process: ["Sankalp (sacred vow) taken in devotee's name", "Silver paduka is worshipped with kumkum", "Mantras chanted by Shreepujak", "Aarti and Naivedya offered", "Prasad sent to devotee"],
    faqs: [
      { q: "Can I attend online?", a: "Yes, we provide a live video link for you to watch the puja." },
      { q: "How long does the puja take?", a: "Approximately 30-45 minutes." },
      { q: "Will I receive prasad?", a: "Yes, prasad is sent via courier (charges apply separately)." },
    ],
  },
  {
    id: "ps2",
    title: "Padya Puja",
    description: "Performed on silver paduka in devotee name",
    date: "22 Sep – 7 Oct",
    price: 551,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
    benefits: ["Divine blessings of Ambabai", "Spiritual purification", "Family well-being", "Good fortune"],
    process: ["Sankalp taken in devotee's name", "Padya (feet washing) ritual on silver paduka", "Vedic mantras recited", "Flowers and kumkum offered", "Aarti performed"],
    faqs: [
      { q: "What is Padya Puja?", a: "Padya Puja involves washing the sacred feet (paduka) of the deity as an act of devotion." },
      { q: "Can family members be included?", a: "Yes, you can include family members' names in the sankalp." },
    ],
  },
  {
    id: "ps3",
    title: "Panchamrut Abhishek",
    description: "One person can sit (sovale/dhoti), family can attend",
    date: "22 Sep – 7 Oct",
    price: 751,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600",
    benefits: ["Powerful spiritual cleansing", "Blessings for entire family", "Prosperity and health", "Fulfillment of wishes"],
    process: ["Devotee sits in front (sovale/dhoti required)", "Panchamrut (5 sacred liquids) abhishek", "Mantra chanting throughout", "Family can attend and participate", "Prasad distribution"],
    faqs: [
      { q: "What is Panchamrut?", a: "A mixture of milk, curd, ghee, honey, and sugar — five sacred liquids." },
      { q: "Do I need special clothing?", a: "Yes, the main devotee needs to wear sovale/dhoti." },
    ],
  },
  {
    id: "ps4",
    title: "Kulachar",
    description: "Panchamrut Abhishek + Naivedya + Savashna + Brahman + Kumarika Bhojan + 1 Saptashati Path",
    date: "22 Sep – 7 Oct",
    price: 5001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    tag: "Special",
    benefits: ["Complete family ritual package", "Ancestral blessings", "Removal of ancestral doshas", "Complete spiritual fulfillment"],
    process: ["Panchamrut Abhishek performed", "Naivedya offered to the Goddess", "Savashna ritual completed", "Brahman and Kumarika Bhojan arranged", "Full Saptashati Path recited"],
    faqs: [
      { q: "What is Kulachar?", a: "Kulachar is a complete family tradition ritual that includes multiple sacred ceremonies." },
      { q: "How long does it take?", a: "The complete Kulachar takes approximately 3-4 hours." },
    ],
  },
  {
    id: "ps5",
    title: "Sahastra Namavali Puja",
    description: "Mahapuja + Abhishek + Laxmi Sahastra Namavali + Kumkumarchan",
    date: "22 Sep – 7 Oct",
    price: 7001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=600",
    benefits: ["1000 names of Goddess chanted", "Maximum divine blessings", "Business & career success", "Overall life prosperity"],
    process: ["Grand Mahapuja setup", "Abhishek with sacred items", "Recitation of 1000 names of Laxmi", "Kumkumarchan performed", "Grand Aarti and Naivedya"],
    faqs: [
      { q: "What is Sahastra Namavali?", a: "Recitation of 1000 sacred names of Goddess Laxmi during the puja." },
    ],
  },
  {
    id: "ps6",
    title: "Shreesukta Havan",
    description: "Abhishek + Puja + Kumkumarchan + 16 Path Shreesukta Havan",
    date: "22 Sep – 7 Oct",
    price: 11001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600",
    tag: "Premium",
    benefits: ["Powerful Vedic fire ritual", "Wealth and abundance", "Removal of negative energies", "Spiritual elevation"],
    process: ["Abhishek and Puja performed", "Kumkumarchan completed", "Sacred fire (Havan kund) prepared", "16 recitations of Shreesukta in the fire", "Grand conclusion with Purnahuti"],
    faqs: [
      { q: "What is Shreesukta?", a: "Shreesukta is a powerful Vedic hymn dedicated to Goddess Lakshmi for wealth and prosperity." },
    ],
  },
  {
    id: "ps7",
    title: "Navachandi Havan & Path",
    description: "Durga Saptashati 10 Path + Abhishek + Kumkumarchan + 1 Path Havan",
    date: "22 Sep – 7 Oct",
    price: 25001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
    tag: "Grand",
    benefits: ["Most powerful puja offering", "Protection from all evils", "Fulfillment of major wishes", "Complete divine grace"],
    process: ["10 complete recitations of Durga Saptashati", "Abhishek with elaborate rituals", "Kumkumarchan ceremony", "1 complete Path Havan in sacred fire", "Grand Purnahuti and Aarti"],
    faqs: [
      { q: "How long does Navachandi take?", a: "This is a full-day ceremony that may span 6-8 hours." },
      { q: "Can I attend in person?", a: "Yes, offline booking allows you to attend at the temple." },
    ],
  },
];

// CATEGORY: Chadhava / Arpan
export const chadhavaItems: ChadhavaItem[] = [
  {
    id: "c1",
    title: "Regular Otee",
    description: "Nariyal, Halad, Kunkum, Khaan, Tandul, Phutane offered in devotee name",
    price: 351,
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=400",
    tag: "Popular",
  },
  {
    id: "c2",
    title: "Saree Otee",
    description: "Saree + Regular Otee offered in devotee name",
    price: 1201,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400",
    tag: "Special",
  },

  {
    id: "c3",
    title: "Maha Otee",
    description: "Premium Otee with coconut, dry fruits, saree, and pooja samagri",
    price: 2101,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    tag: "Premium",
  },
  {
    id: "c4",
    title: "Phool Arpan",
    description: "Fresh flower offering in devotee name",
    price: 151,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400",
    tag: "Daily",
  },
  {
    id: "c5",
    title: "Deep Arpan",
    description: "Oil diya (lamp) offering for blessings and positivity",
    price: 101,
    image: "https://images.unsplash.com/photo-1603993097397-89f4c4b9c9f4?w=400",
    tag: "Aarti",
  },
  {
    id: "c6",
    title: "Naivedya Thali",
    description: "Food offering including sweets, fruits, and prasad",
    price: 501,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400",
    tag: "Bhog",
  },
  {
    id: "c7",
    title: "Coconut Offering",
    description: "Sacred coconut offered in devotee name",
    price: 51,
    image: "https://images.unsplash.com/photo-1584270354949-1f3c8cfa3c2c?w=400",
    tag: "Basic",
  },
  {
    id: "c8",
    title: "Silver Coin Arpan",
    description: "Silver coin offering for prosperity and blessings",
    price: 751,
    image: "https://images.unsplash.com/photo-1610375461249-2c4d9b4c5e45?w=400",
    tag: "Premium",
  },
  {
    id: "c9",
    title: "Dry Fruits Arpan",
    description: "Assorted dry fruits offering for pooja",
    price: 601,
    image: "https://images.unsplash.com/photo-1615485737651-a84e0b4dcd9c?w=400",
    tag: "Healthy",
  },
  {
    id: "c10",
    title: "Full Pooja Samagri Kit",
    description: "Complete pooja kit including all essential items",
    price: 901,
    image: "https://images.unsplash.com/photo-1599409636295-0a6a3e6c8a2c?w=400",
    tag: "Complete",
  },
];

// CATEGORY: Naivedya / Bhog
export const prasadItems: PrasadItem[] = [
  {
    id: "p1",
    title: "Puranpoli Naivedya",
    description: "Naivedya offered in devotee name",
    price: 300,
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=400",
  },
  {
    id: "p2",
    title: "Brahman, Suwasini, Kumarika Bhojan",
    description: "Bhojan for Brahman, Kumarika, and Suwasini",
    price: 1201,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400",
  },
];

// CATEGORY: Other Services
export const otherServices: PrasadItem[] = [
  {
    id: "o1",
    title: "Annadan",
    description: "Friday prasad (sakhar phutane / sweet upma / sabudana khichadi)",
    price: 10,
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=400",
    isCustomAmount: true,
    minAmount: 10,
  },
  {
    id: "o2",
    title: "Gou Seva",
    description: "Gou seva offering",
    price: 10,
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400",
    isCustomAmount: true,
    minAmount: 10,
  },
  {
    id: "o3",
    title: "Courier Charges",
    description: "Prasad delivery courier",
    price: 100,
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=400",
  },
];

export const darshanSlots: DarshanSlot[] = [
  {
    id: "d1",
    title: "Online Darshan (Live)",
    description: "Watch live aarti and darshan from anywhere. No temple visit needed.",
    type: "online",
    price: 0,
    time: "5:00 AM – 9:30 PM",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
  },
  {
    id: "d2",
    title: "Offline Darshan (Temple Visit)",
    description: "Visit the temple with priority VIP darshan pass. Skip the queue.",
    type: "offline",
    price: 500,
    time: "5:00 AM – 9:30 PM",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
  },
];

export const templeEvents: TempleEvent[] = [
  { id: "e1", title: "Ghatasthapana", description: "Auspicious beginning of Navratri festival with Kalash Sthapana.", date: "22 September 2026", price: 1100, image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600", tag: "Navratri" },
  { id: "e2", title: "Lalita Panchami", description: "Special puja and celebration on the fifth day of Navratri.", date: "27 September 2026", price: 1100, image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600", tag: "Navratri" },
  { id: "e3", title: "Ashtami", description: "Grand Ashtami celebrations with havan, puja, and prasad.", date: "30 September 2026", price: 2100, image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600", tag: "Navratri" },
  { id: "e4", title: "Khande Navami", description: "Powerful Navami celebrations with special Shakti puja.", date: "1 October 2026", price: 2100, image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600", tag: "Navratri" },
  { id: "e5", title: "Dasara / Dussehra", description: "Grand Vijaya Dashami celebrations — triumph of good over evil.", date: "7 October 2026", price: 3100, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600", tag: "Grand Festival" },
];

export const reviews: Review[] = [
  { id: "1", name: "Rahul Mehta", location: "Mumbai", rating: 5, text: "The puja was conducted beautifully by the hereditary Shreepujak. I received the video and prasad at home. Truly divine experience!", avatar: "RM" },
  { id: "2", name: "Sunita Devi", location: "Pune", rating: 5, text: "Booking was so easy. The Shreepujak performed the rituals with full devotion. Highly recommended.", avatar: "SD" },
  { id: "3", name: "Karthik Iyer", location: "Chennai", rating: 4, text: "Great platform to connect with Mahalaxmi Mandir. The online darshan feature is amazing.", avatar: "KI" },
  { id: "4", name: "Meera Joshi", location: "Kolhapur", rating: 5, text: "I've been using this for 6 months now. Every puja has brought peace to our family. Blessed by Ambabai!", avatar: "MJ" },
];

export const features = [
  { icon: "🕉️", title: "Online Puja Booking", description: "Book personalized pujas at Mahalaxmi Mandir performed by hereditary Shreepujak." },
  { icon: "📿", title: "Chadhava / Arpan", description: "Offer Otee, Saree, and sacred items to Goddess Mahalaxmi in your name." },
  { icon: "🍃", title: "Naivedya / Bhog", description: "Offer Puranpoli Naivedya and Bhojan in the name of the devotee." },
  { icon: "📺", title: "Online Darshan", description: "Experience divine darshan of Ambabai through live streaming from anywhere." },
  { icon: "🛕", title: "Offline Darshan Pass", description: "Book VIP darshan passes for priority temple entry at Kolhapur." },
  { icon: "🙏", title: "Annadan & Gou Seva", description: "Contribute to Annadan and Gou Seva with any amount you wish." },
];

export const stats = [
  { value: "50K+", label: "Devotees Served" },
  { value: "1000+", label: "Pujas Completed" },
  { value: "4.9", label: "User Rating" },
  { value: "24/7", label: "Online Darshan" },
];
