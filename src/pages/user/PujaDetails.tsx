import { useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { pujas, chadhavaItems, prasadItems, otherServices, darshanSlots, templeEvents, templeInfo, reviews } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Play, X,
  ChevronLeft, ChevronRight, Star, MapPin, Clock, Sparkles,
  Shield, Camera, Video, MessageCircle, HelpCircle, Zap
} from "lucide-react";
import { toast } from "sonner";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" } }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" } }),
};

const TABS = ["Overview", "Benefits", "Process", "Gallery", "Reviews", "FAQs"] as const;
type Tab = typeof TABS[number];

const PujaDetails = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [photoModal, setPhotoModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [videoModal, setVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const contentRef = useRef<HTMLDivElement>(null);

  const item = useMemo(() => {
    if (!type || !id) return null;
    switch (type) {
      case "puja": return pujas.find(p => p.id === id);
      case "chadhava": return chadhavaItems.find(c => c.id === id);
      case "naivedya": return prasadItems.find(p => p.id === id);
      case "other": return otherServices.find(o => o.id === id);
      case "darshan": return darshanSlots.find(d => d.id === id);
      case "event": return templeEvents.find(e => e.id === id);
      default: return null;
    }
  }, [type, id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-20 h-20 rounded-full bg-gradient-sacred flex items-center justify-center mb-6 mx-auto">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold mb-3">Service Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-sm">The service you're looking for might have been moved or doesn't exist.</p>
          <Link to="/pujas" className="inline-flex items-center gap-2 rounded-xl bg-gradient-sacred px-8 py-3 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const itemTitle = 'title' in item ? item.title : "";
  const itemDesc = 'description' in item ? item.description : "";
  const itemPrice = 'price' in item ? item.price : 0;
  const itemImage = 'image' in item ? item.image : "";
  const isCustom = 'isCustomAmount' in item ? item.isCustomAmount : false;
  const minAmt = 'minAmount' in item ? item.minAmount : undefined;
  const benefits = 'benefits' in item ? (item as any).benefits : null;
  const process = 'process' in item ? (item as any).process : null;
  const faqs = 'faqs' in item ? (item as any).faqs : null;
  const category = 'category' in item ? (item as any).category : type;
  const tag = 'tag' in item ? (item as any).tag : null;

  const handleBookNow = () => {
    if (!user) { setPhoneModal(true); return; }
    const userName = user.user_metadata?.full_name || "";
    setName(userName);
    setPhoneModal(true);
  };

  const handlePhoneNext = () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!user && (!phone.trim() || phone.length < 10)) { toast.error("Please enter a valid mobile number"); return; }
    setPhoneModal(false);
    const params = new URLSearchParams();
    params.set("name", name.trim());
    if (phone.trim()) params.set("phone", phone.trim());
    window.location.href = `/book/${type}/${id}?${params.toString()}`;
  };

  const relatedReviews = reviews.slice(0, 3);
  const avgRating = 4.8;

  const videos = [
    { id: 1, title: `${itemTitle} — Complete Process`, thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFuSZaggAsZm-g6nHXOiXxy2FM4FJGvh10A&s", duration: "15:30", videoUrl: "https://www.youtube.com/embed/2g811Eo7K8U" },
    { id: 2, title: "Temple Darshan & Aarti", thumbnail: "https://thetempleguru.com/wp-content/uploads/2023/12/Shree-Mahalakshmi-Temple-kolhapur-8.jpg", duration: "8:45", videoUrl: "https://www.youtube.com/embed/2g811Eo7K8U" },
    { id: 3, title: "Devotee Testimonials", thumbnail: "https://youtellme.ai/wp-content/uploads/2021/12/Shree-Ambabai-Mahalaxmi-Devi-Kolhapur_IMG_0359.jpg", duration: "5:20", videoUrl: "https://www.youtube.com/embed/2g811Eo7K8U" },
  ];

  const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop", alt: `${itemTitle} Setup`, caption: "Puja Setup" },
    { id: 2, src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=800&fit=crop", alt: "Temple Interior", caption: "Temple Interior" },
    { id: 3, src: "https://youtellme.ai/wp-content/uploads/2021/12/Shree-Ambabai-Mahalaxmi-Devi-Kolhapur_IMG_0359.jpg", alt: "Puja Items", caption: "Sacred Items" },
    { id: 4, src: "https://youtellme.ai/wp-content/uploads/2021/12/Shree-Ambabai-Mahalaxmi-Devi-Kolhapur_IMG_0359.jpg", alt: "Devotees", caption: "Devotees" },
    { id: 5, src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop", alt: "Aarti", caption: "Evening Aarti" },
    { id: 6, src: "https://youtellme.ai/wp-content/uploads/2021/12/Shree-Ambabai-Mahalaxmi-Devi-Kolhapur_IMG_0359.jpg", alt: "Prasad", caption: "Blessed Prasad" },
  ];

  const openPhotoModal = (index: number) => { setCurrentPhoto(index); setPhotoModal(true); };
  const openVideoModal = (videoUrl: string) => { setCurrentVideo(videoUrl); setVideoModal(true); };
  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);

  const visibleTabs = TABS.filter(t => {
    if (t === "Benefits" && (!benefits || benefits.length === 0)) return false;
    if (t === "Process" && (!process || process.length === 0)) return false;
    if (t === "FAQs" && (!faqs || faqs.length === 0)) return false;
    return true;
  });

  const trustBadges = [
    { icon: Shield, label: "100% Authentic" },
    { icon: CheckCircle, label: "Verified Priests" },
    { icon: Zap, label: "Instant Confirmation" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── IMMERSIVE HERO BANNER ─── */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src={itemImage}
          alt={itemTitle}
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.75)" }}
        />
        {/* Gradient overlay — always dark regardless of theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-10 max-w-7xl mx-auto w-full left-1/2 -translate-x-1/2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/pujas" className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white mb-4 transition-colors bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {tag && (
                <span className="bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {tag}
                </span>
              )}
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {category}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {itemTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {templeInfo.name}</span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-white">{avgRating}</span>
                <span className="text-white/60">({relatedReviews.length * 120}+ devotees)</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── MAIN LAYOUT: CONTENT + STICKY SIDEBAR ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* LEFT: Tabbed content */}
          <div ref={contentRef}>

            {/* Tab bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex gap-1 overflow-x-auto pb-1 mb-8 scrollbar-none"
            >
              {visibleTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab
                    ? "bg-gradient-sacred text-primary-foreground shadow-warm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >

                {/* ── OVERVIEW ── */}
                {activeTab === "Overview" && (
                  <div className="space-y-8">
                    {/* Description card */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                      <h2 className="font-heading text-xl font-bold mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" /> About this Service
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-base">{itemDesc}</p>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-4">
                      {trustBadges.map(({ icon: Icon, label }, i) => (
                        <motion.div
                          key={label}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-card"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-sacred flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-foreground">{label}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Snapshot of benefits */}
                    {benefits && benefits.length > 0 && (
                      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                        <h3 className="font-heading text-lg font-bold mb-4">Key Benefits</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {benefits.slice(0, 4).map((b: string, i: number) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{b}</span>
                            </div>
                          ))}
                        </div>
                        {benefits.length > 4 && (
                          <button onClick={() => setActiveTab("Benefits")} className="mt-4 text-primary text-sm font-semibold hover:underline">
                            View all {benefits.length} benefits →
                          </button>
                        )}
                      </div>
                    )}

                    {/* Quick process preview */}
                    {process && process.length > 0 && (
                      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                        <h3 className="font-heading text-lg font-bold mb-4">How It Works</h3>
                        <div className="space-y-3">
                          {process.slice(0, 3).map((p: string, i: number) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-gradient-sacred flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                                {i + 1}
                              </div>
                              <p className="text-sm text-muted-foreground">{p}</p>
                            </div>
                          ))}
                          {process.length > 3 && (
                            <button onClick={() => setActiveTab("Process")} className="text-primary text-sm font-semibold hover:underline ml-9">
                              See full process →
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── BENEFITS ── */}
                {activeTab === "Benefits" && benefits && (
                  <div className="space-y-3">
                    <h2 className="font-heading text-2xl font-bold mb-6">
                      Benefits of <span className="text-gradient-sacred">{itemTitle}</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {benefits.map((b: string, i: number) => (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-warm transition-shadow duration-300"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm leading-relaxed">{b}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── PROCESS ── */}
                {activeTab === "Process" && process && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold mb-6">
                      Puja <span className="text-gradient-sacred">Process</span>
                    </h2>
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />
                      <div className="space-y-5">
                        {process.map((p: string, i: number) => (
                          <motion.div
                            key={i}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            className="relative flex items-start gap-5 pl-2"
                          >
                            <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-sacred flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0 ring-4 ring-background">
                              {i + 1}
                            </div>
                            <div className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-card hover:border-primary/30 transition-colors">
                              <p className="text-sm leading-relaxed">{p}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GALLERY ── */}
                {activeTab === "Gallery" && (
                  <div className="space-y-10">
                    {/* Videos */}
                    <div>
                      <h2 className="font-heading text-2xl font-bold mb-5 flex items-center gap-2">
                        <Video className="w-6 h-6 text-primary" /> Puja Videos
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {videos.map((video, i) => (
                          <motion.div
                            key={video.id}
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            className="group rounded-2xl overflow-hidden border border-border bg-card shadow-card hover:shadow-warm transition-all duration-300 cursor-pointer"
                            onClick={() => openVideoModal(video.videoUrl)}
                          >
                            <div className="relative aspect-video">
                              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                  <Play className="w-6 h-6 text-primary ml-1" />
                                </div>
                              </div>
                              <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {video.duration}
                              </div>
                            </div>
                            <div className="p-3">
                              <p className="font-medium text-sm line-clamp-1">{video.title}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Photos */}
                    <div>
                      <h2 className="font-heading text-2xl font-bold mb-5 flex items-center gap-2">
                        <Camera className="w-6 h-6 text-primary" /> Photo Gallery
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {photos.map((photo, i) => (
                          <motion.div
                            key={photo.id}
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
                            onClick={() => openPhotoModal(i)}
                          >
                            <img
                              src={photo.src.replace('w=800&h=800', 'w=400&h=400')}
                              alt={photo.alt}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <p className="text-white text-sm font-semibold">{photo.caption}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── REVIEWS ── */}
                {activeTab === "Reviews" && (
                  <div>
                    {/* Rating summary */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-card mb-6 flex flex-col sm:flex-row items-center gap-6">
                      <div className="text-center">
                        <div className="font-heading text-6xl font-bold text-gradient-sacred">{avgRating}</div>
                        <div className="flex items-center gap-0.5 justify-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(avgRating) ? "fill-accent text-accent" : "text-muted"}`} />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{relatedReviews.length * 120}+ reviews</p>
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        {[5, 4, 3].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-3">{star}</span>
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-gradient-sacred rounded-full"
                                style={{ width: star === 5 ? "78%" : star === 4 ? "15%" : "7%" }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">{star === 5 ? "78%" : star === 4 ? "15%" : "7%"}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {relatedReviews.map((r, i) => (
                        <motion.div
                          key={r.id}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-warm transition-shadow duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-full bg-gradient-sacred flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                              {r.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-semibold text-sm">{r.name}</span>
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {r.location}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── FAQs ── */}
                {activeTab === "FAQs" && faqs && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked <span className="text-gradient-sacred ml-1">Questions</span>
                    </h2>
                    <div className="space-y-3">
                      {faqs.map((faq: { q: string; a: string }, i: number) => (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          className={`rounded-2xl border overflow-hidden transition-all duration-200 ${expandedFaq === i
                            ? "border-primary/40 bg-card shadow-warm"
                            : "border-border bg-card shadow-card hover:border-primary/20"
                            }`}
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                            className="w-full flex items-center justify-between p-5 text-left gap-4"
                          >
                            <span className="font-semibold text-sm">{faq.q}</span>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${expandedFaq === i ? "bg-gradient-sacred text-white" : "bg-muted text-muted-foreground"}`}>
                              {expandedFaq === i ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                          <AnimatePresence>
                            {expandedFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5">
                                  <div className="h-px bg-border mb-4" />
                                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Sticky booking sidebar */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border border-border bg-card shadow-warm overflow-hidden"
            >
              {/* Top gradient band */}
              <div className="bg-gradient-sacred p-5 text-primary-foreground">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Service Fee</p>
                {!isCustom ? (
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold">₹{itemPrice.toLocaleString()}</span>
                    <span className="text-sm opacity-70">/ booking</span>
                  </div>
                ) : (
                  <div>
                    <span className="font-heading text-2xl font-bold">Custom Amount</span>
                    <p className="text-sm opacity-70 mt-0.5">Minimum ₹{minAmt}</p>
                  </div>
                )}
                <div className="flex items-center gap-1 mt-3 text-xs opacity-80">
                  <Star className="w-3.5 h-3.5 fill-white" /> {avgRating} rating · {relatedReviews.length * 120}+ confirmed bookings
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Temple info */}
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{templeInfo.name}</p>
                    <p className="text-muted-foreground text-xs">Kolhapur, Maharashtra</p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* What's included */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's Included</p>
                  {["Expert Pandit", "All Puja Samagri", "Digital Prasad Certificate", "HD Photo Delivery"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border" />

                {/* CTA */}
                <Button
                  onClick={handleBookNow}
                  size="lg"
                  className="w-full bg-gradient-sacred text-primary-foreground font-bold text-base py-6 rounded-xl hover:scale-[1.02] hover:shadow-warm transition-all duration-200"
                >
                  Book Now
                </Button>

                {/* Gallery quick link */}
                <button
                  onClick={() => setActiveTab("Gallery")}
                  className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2 rounded-xl hover:bg-muted"
                >
                  <Camera className="w-4 h-4" /> View Photos & Videos
                </button>

                {/* Share & chat */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-xl py-2.5 hover:border-primary/30 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Ask a Question
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-xl py-2.5 hover:border-primary/30 transition-colors">
                    <Shield className="w-3.5 h-3.5" /> Safe Booking
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Temple card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-divine flex items-center justify-center text-xl shrink-0">
                🛕
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{templeInfo.name}</p>
                <p className="text-xs text-muted-foreground">Govt. certified temple · Est. 1220 CE</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── BOTTOM CTA BANNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-divine p-10 text-center"
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -right-8 w-64 h-64 bg-white/5 rounded-full" />
          <div className="relative">
            <div className="text-4xl mb-3">🙏</div>
            <h3 className="font-heading text-3xl font-bold text-white mb-2">Ready to seek divine blessings?</h3>
            <p className="text-white/70 mb-7 max-w-md mx-auto">Book your {itemTitle} and experience the grace of Shri Mahalaxmi Mandir, Kolhapur</p>
            <Button
              onClick={handleBookNow}
              size="lg"
              className="bg-white text-foreground font-bold px-10 py-3 rounded-xl hover:scale-105 hover:shadow-warm transition-all duration-200 text-base"
            >
              Book Now — {isCustom ? `from ₹${minAmt}` : `₹${itemPrice.toLocaleString()}`}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* ─── MODALS ─── */}

      {/* Phone / Name modal */}
      <Dialog open={phoneModal} onOpenChange={setPhoneModal}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Your Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <div>
              <Label htmlFor="book_name" className="text-sm font-semibold">Full Name *</Label>
              <Input id="book_name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="mt-1.5 rounded-xl" />
            </div>
            {!user && (
              <div>
                <Label htmlFor="book_phone" className="text-sm font-semibold">Mobile Number *</Label>
                <Input id="book_phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile number" className="mt-1.5 rounded-xl" maxLength={10} />
              </div>
            )}
            <Button onClick={handlePhoneNext} className="w-full bg-gradient-sacred text-primary-foreground font-bold rounded-xl py-5">
              Continue →
            </Button>
            {!user && (
              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => { setPhoneModal(false); setAuthOpen(true); }} className="text-primary font-semibold hover:underline">Sign In</button>
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />

      {/* Photo lightbox */}
      <Dialog open={photoModal} onOpenChange={setPhotoModal}>
        <DialogContent className="max-w-5xl w-full h-[85vh] p-0 bg-black border-none rounded-2xl overflow-hidden">
          <div className="relative w-full h-full">
            <button onClick={() => setPhotoModal(false)} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhoto}
                src={photos[currentPhoto]?.src}
                alt={photos[currentPhoto]?.alt}
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-xl px-5 py-2.5 text-white text-center">
              <p className="font-semibold text-sm">{photos[currentPhoto]?.caption}</p>
              <p className="text-xs text-white/60">{currentPhoto + 1} / {photos.length}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video modal */}
      <Dialog open={videoModal} onOpenChange={setVideoModal}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-none rounded-2xl overflow-hidden">
          <div className="relative w-full aspect-video">
            <button onClick={() => setVideoModal(false)} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors">
              <X className="w-4 h-4" />
            </button>
            {currentVideo && (
              <iframe src={currentVideo} title="Video Player" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PujaDetails;
