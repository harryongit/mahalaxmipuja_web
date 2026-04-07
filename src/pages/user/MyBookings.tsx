import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, BookOpen, Calendar, IndianRupee } from "lucide-react";

interface BookingRow {
  id: string;
  booking_type: string;
  item_name: string;
  devotee_name: string;
  gotra: string | null;
  date: string;
  amount: number;
  quantity: number;
  delivery_address: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const typeLabels: Record<string, string> = {
  puja: "🕉️ Puja",
  chadhava: "📿 Chadhava",
  prasad: "🍃 Prasad",
  darshan: "🛕 Darshan",
};

const MyBookingsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
      return;
    }
    if (user) fetchBookings();
  }, [user, authLoading]);

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    setBookings((data as BookingRow[]) || []);
    setLoading(false);
  };

  // Subscribe to realtime updates
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("my-bookings")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings", filter: `user_id=eq.${user.id}` }, () => {
        fetchBookings();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">
            My <span className="text-gradient-sacred">Bookings</span>
          </h1>
          <p className="text-muted-foreground">Track all your puja, chadhava, prasad and darshan bookings.</p>
        </motion.div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 rounded-xl bg-card shadow-card">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No bookings yet</p>
            <p className="text-sm text-muted-foreground">Book a puja, offer chadhava, or order prasad to see your bookings here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-xl bg-card p-5 shadow-card"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{typeLabels[b.booking_type] || b.booking_type}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[b.status] || "bg-muted text-muted-foreground"}`}>
                        {b.status}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{b.item_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Devotee: {b.devotee_name}{b.gotra ? ` • Gotra: ${b.gotra}` : ""}{b.quantity > 1 ? ` • ${b.quantity} people` : ""}
                    </p>
                    {b.delivery_address && (
                      <p className="text-xs text-muted-foreground mt-1">📍 {b.delivery_address}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-primary">
                      <IndianRupee className="w-4 h-4" />
                      {b.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
