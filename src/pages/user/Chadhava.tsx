import { useState } from "react";
import { motion } from "framer-motion";
import { chadhavaItems, templeInfo } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import type { ChadhavaItem } from "@/lib/data";

const ChadhavaPage = () => {
  const [selectedItem, setSelectedItem] = useState<ChadhavaItem | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Chadhava <span className="text-gradient-sacred">Seva</span>
          </h1>
          <p className="text-muted-foreground">
            Offer sacred chadhava to Lord Mahakal at {templeInfo.name}. Your offerings will be made with full Vedic rituals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chadhavaItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                )}
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
                    Offer Now
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
          bookingType="chadhava"
          itemName={selectedItem.title}
          amount={selectedItem.price}
        />
      )}

      <Footer />
    </div>
  );
};

export default ChadhavaPage;
