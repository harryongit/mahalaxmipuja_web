import { useState } from "react";
import { motion } from "framer-motion";
import { prasadItems, templeInfo } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import type { PrasadItem } from "@/lib/data";

const PrasadPage = () => {
  const [selectedItem, setSelectedItem] = useState<PrasadItem | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Sacred <span className="text-gradient-sacred">Prasad</span>
          </h1>
          <p className="text-muted-foreground">
            Receive blessed prasad from {templeInfo.name} delivered to your doorstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prasadItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl font-bold text-primary">₹{item.price}</span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    Order Prasad
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <BookingModal
          open={!!selectedItem}
          onOpenChange={(open) => !open && setSelectedItem(null)}
          bookingType="prasad"
          itemName={selectedItem.title}
          amount={selectedItem.price}
        />
      )}

      <Footer />
    </div>
  );
};

export default PrasadPage;
