import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-temple.jpg";
import pujariImage from "@/assets/pujari.jpg";
import { stats, features, reviews, pujas } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PujaCard from "@/components/PujaCard";
import { Shield, CheckCircle, Star, Users, Heart } from "lucide-react";
import heroVideo from "../../assets/hero_video.mp4";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const whyChooseUs = [
  { icon: Shield, title: "Verified Authentic Service", desc: "All pujas performed by verified hereditary Shreepujak at Mahalaxmi Mandir, Kolhapur." },
  { icon: CheckCircle, title: "100% Transparent", desc: "Clear pricing, real-time video updates, and instant booking confirmation." },
  { icon: Star, title: "Trusted by 50K+ Devotees", desc: "Over 50,000 devotees worldwide trust us for their spiritual services." },
  { icon: Users, title: "Ultra-Fast Booking", desc: "Book your puja in under 30 seconds. Returning users — just 1-2 clicks." },
  { icon: Heart, title: "Personal Attention", desc: "Each puja is performed individually with your name, gotra, and full vedic rituals." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video src={heroVideo} autoPlay muted loop  className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Divine Blessings,{" "}
              <span className="text-gradient-sacred">Delivered Home</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Book personalized pujas by hereditary Shreepujak at Shri Mahalaxmi Mandir, Kolhapur (Ambabai) — from anywhere in the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pujas" className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-8 py-3.5 font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-105">
                Explore Pujas
              </Link>
              <Link to="/pujas" className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 px-8 py-3.5 font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/10">
                Live Darshan
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-gradient-sacred py-3 overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-12 items-center">
              <span className="text-primary-foreground font-semibold">🛡️ Verified Authentic Service</span>
              <span className="text-primary-foreground/60">•</span>
              <span className="text-primary-foreground font-semibold">🙏 Trusted by 50K+ Devotees</span>
              <span className="text-primary-foreground/60">•</span>
              <span className="text-primary-foreground font-semibold">🕉️ Mahalaxmi Mandir Kolhapur</span>
              <span className="text-primary-foreground/60">•</span>
              <span className="text-primary-foreground font-semibold">📿 Hereditary Shreepujak</span>
              <span className="text-primary-foreground/60">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Pujas */}
      <section className="container py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient-sacred">Pujas</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
            Book sacred pujas performed by hereditary Shreepujak at Shri Mahalaxmi Mandir, Kolhapur.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pujas.slice(0, 3).map((puja, i) => (
            <motion.div key={puja.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <PujaCard puja={puja} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/pujas" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            View All Pujas →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient-sacred">Us</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
              Authentic, transparent, and trusted by thousands of devotees worldwide.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl bg-card p-6 shadow-card hover:shadow-warm transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Pujari */}
      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl overflow-hidden shadow-warm">
              <img src={pujariImage} alt="Hereditary Shreepujak at Mahalaxmi Mandir" className="w-full h-80 lg:h-96 object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-gradient-sacred">Shreepujak</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our hereditary Shreepujak belongs to the ancient lineage of priests who have been performing sacred rituals at Shri Mahalaxmi Mandir, Kolhapur for generations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With deep knowledge of Vedic traditions, proper mantras, and authentic rituals, every puja is performed with utmost devotion and adherence to Shastras.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you book online or visit in person, the same hereditary Shreepujak performs your puja with full Vedic vidhi-vidhan, ensuring that every devotee receives the complete divine blessings of Goddess Mahalaxmi.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Hereditary Lineage</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Vedic Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Full Rituals</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient-sacred">Services</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl bg-card p-6 shadow-card hover:shadow-warm transition-shadow"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-divine py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{s.value}</div>
                <div className="text-sm text-primary-foreground/70">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          What Devotees <span className="text-gradient-sacred">Say</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div key={r.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="rounded-xl bg-card p-6 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-sacred flex items-center justify-center text-sm font-bold text-primary-foreground">{r.avatar}</div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.location}</div>
                </div>
              </div>
              <div className="text-accent mb-3">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
