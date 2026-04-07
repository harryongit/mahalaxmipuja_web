import { motion } from "framer-motion";
import { templeInfo, templeHistory, dailyTempleRoutine, templeGallery } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const TempleDetails = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <img src={templeInfo.image} alt={templeInfo.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="container relative z-10 pb-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-2">
            About <span className="text-gradient-sacred">Temple</span>
          </motion.h1>
          <p className="text-primary-foreground/80 max-w-xl">Shri Mahalaxmi Mandir, Kolhapur — One of the sacred Shakti Peethas</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Temple Description */}
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
              <h2 className="font-heading text-2xl font-bold mb-3">{templeInfo.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{templeInfo.description}</p>
              <p className="text-muted-foreground leading-relaxed">{templeInfo.significance}</p>
            </motion.div>

            {/* Temple History Timeline */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-6">
                Temple <span className="text-gradient-sacred">History</span>
              </motion.h2>
              <div className="space-y-6">
                {templeHistory.map((h, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-gradient-sacred shrink-0" />
                      {i < templeHistory.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                    </div>
                    <div className="pb-6">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">{h.year}</span>
                      <h3 className="font-heading font-semibold mt-1">{h.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Architecture */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3 variants={fadeUp} custom={0} className="font-heading text-xl font-semibold mb-3">Architecture</motion.h3>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground leading-relaxed">{templeInfo.architecture}</motion.p>
            </motion.div>

            {/* Festivals */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3 variants={fadeUp} custom={0} className="font-heading text-xl font-semibold mb-3">Major Festivals</motion.h3>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground leading-relaxed">{templeInfo.festivals}</motion.p>
            </motion.div>

            {/* Image Gallery */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-6">
                Temple <span className="text-gradient-sacred">Gallery</span>
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templeGallery.map((img, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="rounded-xl overflow-hidden shadow-card group">
                    <div className="relative">
                      <img src={img.src} alt={img.caption} className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end">
                        <span className="text-primary-foreground text-xs font-medium p-3 opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Daily Temple Routine */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-6">
                Daily Temple <span className="text-gradient-sacred">Routine</span>
              </motion.h2>
              <div className="rounded-xl bg-card shadow-card overflow-hidden">
                {dailyTempleRoutine.map((r, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className={`flex items-start gap-4 p-4 ${i < dailyTempleRoutine.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="w-20 shrink-0">
                      <span className="text-sm font-semibold text-primary">{r.time}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{r.activity}</h4>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-card sticky top-24">
              <h3 className="font-heading font-semibold mb-4">Temple Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-primary" /></div>
                  <div><p className="font-medium">Address</p><p className="text-muted-foreground">{templeInfo.address}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-primary" /></div>
                  <div><p className="font-medium">Timings</p><p className="text-muted-foreground">{templeInfo.timings}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Phone className="w-4 h-4 text-primary" /></div>
                  <div><p className="font-medium">Phone</p><p className="text-muted-foreground">{templeInfo.phone}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Mail className="w-4 h-4 text-primary" /></div>
                  <div><p className="font-medium">Email</p><p className="text-muted-foreground">{templeInfo.email}</p></div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-medium mb-1">Deity</p>
                <p className="text-primary font-semibold">{templeInfo.deity}</p>
                <p className="text-xs text-muted-foreground mt-1">One of the sacred Shakti Peethas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TempleDetails;
