import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pujas, chadhavaItems, prasadItems, otherServices, darshanSlots, templeEvents } from "@/lib/data";
import type { DarshanSlot } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, MapPin, Calendar } from "lucide-react";

const PujasPage = () => {
  const navigate = useNavigate();
  const [darshanFilter, setDarshanFilter] = useState<"all" | "online" | "offline">("all");

  const filteredDarshan = darshanFilter === "all" ? darshanSlots : darshanSlots.filter((s) => s.type === darshanFilter);

  const viewDetails = (type: string, id: string) => {
    navigate(`/puja/${type}/${id}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Puja <span className="text-gradient-sacred">Booking</span>
          </h1>
          <p className="text-muted-foreground">Book all temple services at Shri Mahalaxmi Mandir, Kolhapur — by hereditary Shreepujak.</p>
        </motion.div>

        <Tabs defaultValue="pujas" className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-xl mb-8">
            <TabsTrigger value="pujas" className="flex-1 min-w-[100px]">🕉️ Pooja</TabsTrigger>
            <TabsTrigger value="chadhava" className="flex-1 min-w-[100px]">📿 Chadhava</TabsTrigger>
            <TabsTrigger value="naivedya" className="flex-1 min-w-[100px]">🍃 Naivedya</TabsTrigger>
            <TabsTrigger value="other" className="flex-1 min-w-[100px]">🙏 Other</TabsTrigger>
            <TabsTrigger value="darshan" className="flex-1 min-w-[100px]">🛕 Darshan</TabsTrigger>
            <TabsTrigger value="events" className="flex-1 min-w-[100px]">📅 Events</TabsTrigger>
          </TabsList>

          {/* Pujas Tab */}
          <TabsContent value="pujas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pujas.map((puja, i) => (
                <motion.div key={puja.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all cursor-pointer"
                  onClick={() => viewDetails("puja", puja.id)}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={puja.image} alt={puja.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    {puja.tag && <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{puja.tag}</span>}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">{puja.category}</span>
                    <h3 className="font-heading text-lg font-semibold mt-1 mb-2 line-clamp-1">{puja.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{puja.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                      <Calendar className="w-3 h-3" /> {puja.date}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">₹{puja.price.toLocaleString()}</span>
                      <span className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Chadhava Tab */}
          <TabsContent value="chadhava">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chadhavaItems.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all cursor-pointer"
                  onClick={() => viewDetails("chadhava", item.id)}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    {item.tag && <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{item.tag}</span>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">₹{item.price.toLocaleString()}</span>
                      <span className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Naivedya Tab */}
          <TabsContent value="naivedya">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prasadItems.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all cursor-pointer"
                  onClick={() => viewDetails("naivedya", item.id)}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">₹{item.price.toLocaleString()}</span>
                      <span className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Other Services Tab */}
          <TabsContent value="other">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all cursor-pointer"
                  onClick={() => viewDetails("other", item.id)}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">
                        {item.isCustomAmount ? `Min ₹${item.minAmount}` : `₹${item.price.toLocaleString()}`}
                      </span>
                      <span className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Darshan Tab */}
          <TabsContent value="darshan">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Online:</strong> Watch live from anywhere. <strong>Offline:</strong> Visit the temple with priority entry.
              </p>
              <div className="flex gap-2 mb-6">
                {(["all", "online", "offline"] as const).map((t) => (
                  <button key={t} onClick={() => setDarshanFilter(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                      darshanFilter === t ? "bg-gradient-sacred text-primary-foreground shadow-warm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}>
                    {t === "all" ? "All Darshan" : t === "online" ? "🖥️ Online" : "🛕 Offline (Visit Temple)"}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDarshan.map((slot, i) => (
                <motion.div key={slot.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all cursor-pointer"
                  onClick={() => viewDetails("darshan", slot.id)}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={slot.image} alt={slot.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        slot.type === "online" ? "bg-emerald-500 text-primary-foreground" : "bg-primary text-primary-foreground"
                      }`}>
                        {slot.type === "online" ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {slot.type === "online" ? "Live Online" : "In-Person Visit"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{slot.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{slot.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">🕐 {slot.time}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">{slot.price === 0 ? "Free" : `₹${slot.price}`}</span>
                      <span className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templeEvents.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all cursor-pointer"
                  onClick={() => viewDetails("event", event.id)}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    {event.tag && <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{event.tag}</span>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span className="font-medium text-foreground">{event.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">₹{event.price.toLocaleString()}</span>
                      <span className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default PujasPage;
