import { useState } from "react";
import { motion } from "framer-motion";
import { darshanSlots, templeInfo } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Monitor, MapPin } from "lucide-react";
import type { DarshanSlot } from "@/lib/data";

const DarshanPage = () => {
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all");
  const [selectedSlot, setSelectedSlot] = useState<DarshanSlot | null>(null);

  const filtered = filter === "all" ? darshanSlots : darshanSlots.filter((s) => s.type === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Temple <span className="text-gradient-sacred">Darshan</span>
          </h1>
          <p className="text-muted-foreground">
            Experience divine darshan at {templeInfo.name} — online from anywhere or visit in person.
          </p>
        </motion.div>

        <div className="flex gap-2 mb-8">
          {(["all", "online", "offline"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                filter === t ? "bg-gradient-sacred text-primary-foreground shadow-warm" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t === "all" ? "All Darshan" : t === "online" ? "🖥️ Online" : "🛕 Offline"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={slot.image} alt={slot.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    slot.type === "online" ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground"
                  }`}>
                    {slot.type === "online" ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    {slot.type === "online" ? "Live Online" : "In-Person"}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold mb-2">{slot.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{slot.description}</p>
                <p className="text-xs text-muted-foreground mb-4">🕐 {slot.time}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl font-bold text-primary">
                    {slot.price === 0 ? "Free" : `₹${slot.price}`}
                  </span>
                  <button
                    onClick={() => setSelectedSlot(slot)}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    {slot.type === "online" ? "Watch Live" : "Book Pass"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedSlot && selectedSlot.type === "offline" && (
        <BookingModal
          open={!!selectedSlot}
          onOpenChange={(open) => !open && setSelectedSlot(null)}
          bookingType="darshan"
          itemName={selectedSlot.title}
          amount={selectedSlot.price}
        />
      )}

      <Footer />
    </div>
  );
};

export default DarshanPage;
