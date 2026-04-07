import { motion } from "framer-motion";
import { templeInfo, stats } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Heart, Shield, Star, Users, BookOpen, Sparkles, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const services = [
  { icon: "🕉️", title: "Online Puja Booking", desc: "Book personalized pujas performed by hereditary Shreepujak in your name with full Vedic rituals." },
  { icon: "📿", title: "Chadhava / Arpan", desc: "Offer Regular Otee, Saree Otee, and sacred items to Goddess Mahalaxmi." },
  { icon: "🍃", title: "Naivedya / Bhog", desc: "Offer Puranpoli Naivedya and Bhojan for Brahman, Kumarika, and Suwasini." },
  { icon: "📺", title: "Online Darshan", desc: "Watch live aarti and darshan of Ambabai from anywhere in the world." },
  { icon: "🛕", title: "Offline Darshan Pass", desc: "Book VIP darshan passes for priority temple entry at Kolhapur." },
  { icon: "🙏", title: "Annadan & Gou Seva", desc: "Contribute to Annadan and Gou Seva with any custom amount." },
];

const journey = [
  { step: "01", title: "Choose Your Seva", desc: "Browse pujas, chadhava, naivedya, or darshan options." },
  { step: "02", title: "Select Date & Type", desc: "Pick a date within the festival period and choose online or offline." },
  { step: "03", title: "Enter Details", desc: "Just your name and optional gotra — that's it!" },
  { step: "04", title: "Instant Confirmation", desc: "Pay and get instant booking confirmation with booking ID." },
];

const whyChooseUs = [
  { icon: Shield, title: "Hereditary Shreepujak", desc: "All rituals performed by hereditary Shreepujak of Mahalaxmi Mandir, Kolhapur." },
  { icon: Star, title: "Trusted by 50K+", desc: "Over 50,000 devotees have experienced divine blessings through our platform." },
  { icon: Heart, title: "With Love & Devotion", desc: "Every seva is performed with utmost devotion and care for your spiritual needs." },
  { icon: Users, title: "Ultra-Fast Booking", desc: "Book in under 30 seconds. Returning users can book in just 1–2 clicks." },
];

const coreValues = [
  { icon: BookOpen, title: "Dharma", desc: "We uphold the sacred traditions and rituals of Sanatan Dharma in every seva." },
  { icon: Heart, title: "Bhakti", desc: "Devotion is at the heart of everything we do — for the Goddess and for you." },
  { icon: Shield, title: "Transparency", desc: "Clear pricing, real-time updates, and instant confirmation of every booking." },
  { icon: Sparkles, title: "Accessibility", desc: "Making divine blessings accessible to every devotee, anywhere in the world." },
];

const AboutPage = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
      <img src={templeInfo.image} alt={templeInfo.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
      <div className="container relative z-10 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-2"
        >
          About <span className="text-gradient-sacred">MahalaxmiPuja</span>
        </motion.h1>
        <p className="text-primary-foreground/80 max-w-xl">
          Puja services by hereditary Shreepujak at {templeInfo.name}.
        </p>
      </div>
    </section>

    {/* About Content */}
    <section className="container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-4">
              About the <span className="text-gradient-sacred">Temple</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground leading-relaxed mb-6">
              {templeInfo.description}
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-6">
              {templeInfo.history}
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed">
              {templeInfo.significance}
            </motion.p>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="font-heading font-semibold mb-4">Temple Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{templeInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Timings</p>
                  <p className="text-muted-foreground">{templeInfo.timings}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground">{templeInfo.phone}</p>
                  <p className="text-muted-foreground">{templeInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="font-heading font-semibold mb-3">Deity</h3>
            <p className="text-primary font-semibold">{templeInfo.deity}</p>
            <p className="text-sm text-muted-foreground mt-1">One of the sacred Shakti Peethas</p>
          </div>
        </div>
      </div>
    </section>

    {/* Our Services */}
    <section className="bg-muted/50 py-16">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl font-bold mb-3">
            Our <span className="text-gradient-sacred">Services</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
            Everything you need for a complete spiritual experience from anywhere.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="rounded-xl bg-card p-6 shadow-card hover:shadow-warm transition-shadow">
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How We Serve You — Journey */}
    <section className="container py-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
        <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl font-bold mb-3">
          How We <span className="text-gradient-sacred">Serve You</span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
          Book in under 30 seconds — the fastest puja booking experience.
        </motion.p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {journey.map((j, i) => (
          <motion.div key={j.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
            className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-sacred flex items-center justify-center text-primary-foreground font-heading text-xl font-bold mx-auto mb-4">
              {j.step}
            </div>
            <h3 className="font-heading font-semibold mb-2">{j.title}</h3>
            <p className="text-sm text-muted-foreground">{j.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="bg-muted/50 py-16">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl font-bold mb-3">
            Why Choose <span className="text-gradient-sacred">Us</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((w, i) => (
            <motion.div key={w.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="rounded-xl bg-card p-6 shadow-card text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <w.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{w.title}</h3>
              <p className="text-sm text-muted-foreground">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="container py-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
        <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl font-bold mb-3">
          Our Core <span className="text-gradient-sacred">Values</span>
        </motion.h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreValues.map((v, i) => (
          <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
            className="rounded-xl border border-border p-6 text-center hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-gradient-sacred flex items-center justify-center mx-auto mb-4">
              <v.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
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

    {/* CTA */}
    <section className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-gradient-sacred p-10 md:p-16 text-center"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Begin Your Spiritual Journey Today
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Book a puja by hereditary Shreepujak, offer chadhava, or experience live darshan — all from the comfort of your home.
        </p>
        <Link
          to="/pujas"
          className="inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3.5 font-semibold text-foreground shadow-lg transition-transform hover:scale-105"
        >
          Book Now <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
