import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { pujas, chadhavaItems, prasadItems, otherServices, darshanSlots, templeEvents, festivalStartDate, festivalEndDate, templeInfo } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  CalendarIcon, Loader2, Minus, Plus, CheckCircle2, ArrowLeft,
  Package, MapPin, Monitor, Building2, Gift, Phone, User,
  CreditCard, Star, Shield, Zap, ChevronRight, PartyPopper
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | "done";

declare global {
  interface Window { Razorpay: any; }
}

const stepConfig = [
  { num: 1, label: "Date & Mode", icon: CalendarIcon },
  { num: 2, label: "Details", icon: User },
  { num: 3, label: "Blessings", icon: Gift },
  { num: 4, label: "Payment", icon: CreditCard },
];

const slideVariants: Variants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const BookingPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

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

  const [step, setStep] = useState<Step>(1);
  const [date, setDate] = useState<Date>(festivalStartDate);
  const [serviceType, setServiceType] = useState<"online" | "offline">("online");
  const [devoteeName, setDevoteeName] = useState(searchParams.get("name") || "");
  const [gotra, setGotra] = useState("");
  const [address, setAddress] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState(searchParams.get("phone") || "");
  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState(item && 'price' in item ? item.price : 0);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [selectedChadhava, setSelectedChadhava] = useState<Record<string, number>>({});
  const [wantsAashirwad, setWantsAashirwad] = useState<boolean | null>(null);
  const [aashirwadAddress, setAashirwadAddress] = useState("");
  const [aashirwadPhone, setAashirwadPhone] = useState("");
  const [aashirwadGotra, setAashirwadGotra] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const isCustomAmount = item && 'isCustomAmount' in item ? item.isCustomAmount : false;
  const minAmount = item && 'minAmount' in item ? item.minAmount : undefined;
  const itemPrice = item && 'price' in item ? item.price : 0;
  const itemName = item && 'title' in item ? item.title : "";
  const itemImage = item && 'image' in item ? (item as any).image : "";
  const itemDesc = item && 'description' in item ? (item as any).description : "";

  useEffect(() => { if (item && 'price' in item) setCustomAmount(item.price); }, [item]);

  useEffect(() => {
    if (user) {
      if (!devoteeName) {
        const name = user.user_metadata?.full_name || "";
        if (name) setDevoteeName(name);
      }
      supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
        if (data) {
          if (!address && data.address) setAddress([data.address, data.city, data.state, data.pincode].filter(Boolean).join(", "));
          if (!whatsappPhone && data.phone) setWhatsappPhone(data.phone);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-20 h-20 rounded-full bg-gradient-sacred flex items-center justify-center mb-6 mx-auto">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold mb-3">Service Not Found</h1>
          <Link to="/pujas" className="inline-flex items-center gap-2 rounded-xl bg-gradient-sacred px-8 py-3 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const unitPrice = isCustomAmount ? customAmount : itemPrice;
  const chadhavaTotal = Object.entries(selectedChadhava).reduce((sum, [cid, qty]) => {
    const ci = chadhavaItems.find(c => c.id === cid);
    return sum + (ci?.price || 0) * qty;
  }, 0);
  const activeChadhava = Object.entries(selectedChadhava).filter(([, qty]) => qty > 0);
  const totalAmount = (unitPrice * quantity) + chadhavaTotal;
  const bookingType = type === "naivedya" ? "prasad" : type === "other" ? "prasad" : type === "event" ? "puja" : (type as "puja" | "chadhava" | "darshan");

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) { toast.error("Payment gateway loading. Please try again."); return; }
    const options = {
      key: "rzp_test_1234567890",
      amount: totalAmount * 100,
      currency: "INR",
      name: templeInfo.name,
      description: `${itemName} - ${format(date, "PPP")}`,
      handler: async (response: any) => { await saveBooking(response.razorpay_payment_id); },
      prefill: { name: devoteeName, email: user?.email || "", contact: whatsappPhone },
      theme: { color: "#E85D04" },
      method: { upi: true, card: true, netbanking: true, wallet: true },
      modal: { ondismiss: () => toast.info("Payment cancelled") },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const saveBooking = async (paymentId?: string) => {
    if (!user) return;
    setSubmitting(true);
    const chadhavaNames = Object.entries(selectedChadhava).filter(([, qty]) => qty > 0).map(([cid, qty]) => { const ci = chadhavaItems.find(c => c.id === cid); return ci ? `${ci.title} ×${qty}` : null; }).filter(Boolean);
    const { data, error } = await supabase.from("bookings").insert({
      user_id: user.id,
      booking_type: bookingType,
      item_name: itemName,
      devotee_name: devoteeName.trim(),
      gotra: (wantsAashirwad ? aashirwadGotra : gotra).trim() || null,
      date: format(date, "yyyy-MM-dd"),
      amount: totalAmount,
      quantity,
      delivery_address: (wantsAashirwad ? aashirwadAddress : address).trim() || null,
      notes: [
        serviceType === "offline" ? "Offline (Temple Visit)" : "Online",
        paymentId ? `Payment: ${paymentId}` : "Payment pending",
        whatsappPhone ? `WhatsApp: ${whatsappPhone}` : "",
        wantsAashirwad ? "Aashirwad Box: Yes" : "",
        chadhavaNames.length > 0 ? `Add-ons: ${chadhavaNames.join(", ")}` : "",
      ].filter(Boolean).join(" | "),
    }).select("id").single();
    setSubmitting(false);
    if (error) { toast.error("Booking failed. Please try again."); }
    else { setBookingId(data?.id || null); setStep("done"); toast.success("Booking confirmed! 🙏"); }
  };

  const handleContinueToSummary = () => {
    if (!devoteeName.trim()) { toast.error("Please enter devotee name"); return; }
    setShowSummary(true);
  };

  const handleConfirmAndPay = () => { setShowSummary(false); handleRazorpayPayment(); };
  const currentStepNum = step === "done" ? 4 : step as number;

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-sacred flex items-center justify-center mb-6 mx-auto">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-3">Sign In to Continue</h1>
          <p className="text-muted-foreground mb-6 text-sm">Please sign in to book <span className="font-semibold text-foreground">{itemName}</span>.</p>
          <Button onClick={() => setAuthOpen(true)} className="bg-gradient-sacred text-primary-foreground font-bold px-10 py-3 rounded-xl hover:scale-105 transition-transform">
            Sign In
          </Button>
          <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>

        {step === "done" ? (
          /* ─── SUCCESS SCREEN ─── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            {/* Confetti-style top banner */}
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-10 text-center text-white mb-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                {["🙏", "✨", "🌸", "🪔", "🌺"].map((e, i) => (
                  <span key={i} className="absolute text-2xl" style={{ top: `${10 + i * 18}%`, left: `${5 + i * 20}%` }}>{e}</span>
                ))}
              </div>
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <PartyPopper className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-heading text-3xl font-bold mb-1">Booking Confirmed!</h2>
                <p className="text-white/80 text-sm">May the divine blessings be with you 🙏</p>
                {bookingId && (
                  <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-xs text-white/70 mb-0.5">Booking ID</p>
                    <p className="font-mono font-bold text-lg tracking-wider">{bookingId.slice(0, 8).toUpperCase()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking details */}
            <div className="rounded-2xl border border-border bg-card shadow-card p-6 mb-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Booking Details
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Service", value: itemName },
                  { label: "Date", value: format(date, "PPP") },
                  { label: "Mode", value: serviceType === "online" ? "🖥️ Online" : "🛕 Temple Visit" },
                  { label: "Devotee", value: devoteeName },
                  ...(gotra ? [{ label: "Gotra", value: gotra }] : []),
                  { label: "People", value: `${quantity} person(s)` },
                  ...(activeChadhava.length > 0 ? [{ label: "Add-ons", value: activeChadhava.map(([cid, qty]) => { const ci = chadhavaItems.find(c => c.id === cid); return ci ? `${ci.title} ×${qty}` : null; }).filter(Boolean).join(", ") }] : []),
                  ...(wantsAashirwad ? [{ label: "Aashirwad Box", value: "✅ Yes" }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-right max-w-[200px]">{value}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-bold">Total Paid</span>
                  <span className="font-heading text-2xl font-bold text-gradient-sacred">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/my-bookings")}
                className="rounded-xl py-5 border-border hover:border-primary/50 transition-colors"
              >
                My Bookings
              </Button>
              <Button
                onClick={() => navigate("/pujas")}
                className="bg-gradient-sacred text-primary-foreground font-bold rounded-xl py-5 hover:scale-[1.02] transition-transform"
              >
                Book More
              </Button>
            </div>
          </motion.div>
        ) : (
          /* ─── MAIN BOOKING LAYOUT ─── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* LEFT: Step wizard */}
            <div>
              {/* Step progress */}
              <div className="flex items-center mb-8">
                {stepConfig.map((s, i) => {
                  const done = currentStepNum > s.num;
                  const active = currentStepNum === s.num;
                  const Icon = s.icon;
                  return (
                    <div key={s.num} className="flex items-center flex-1">
                      <div className="flex flex-col items-center gap-1">
                        <div className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ring-2 ring-offset-2 ring-offset-background",
                          done ? "bg-primary ring-primary" : active ? "bg-gradient-sacred ring-primary" : "bg-muted ring-transparent"
                        )}>
                          {done ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : (
                            <Icon className={cn("w-4 h-4", active ? "text-white" : "text-muted-foreground")} />
                          )}
                        </div>
                        <span className={cn("text-[10px] font-semibold hidden sm:block whitespace-nowrap", active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground")}>
                          {s.label}
                        </span>
                      </div>
                      {i < stepConfig.length - 1 && (
                        <div className={cn("flex-1 h-0.5 mx-1 mb-4 transition-all duration-500", done ? "bg-primary" : "bg-border")} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step content card */}
              <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
                {/* Card header */}
                <div className="bg-gradient-sacred px-6 py-4">
                  <p className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-widest">
                    Step {currentStepNum} of 4
                  </p>
                  <h2 className="font-heading text-xl font-bold text-primary-foreground">
                    {currentStepNum === 1 && "Choose Date & Mode"}
                    {currentStepNum === 2 && "Devotee Details & Add-ons"}
                    {currentStepNum === 3 && "Aashirwad Box"}
                    {currentStepNum === 4 && "Review & Pay"}
                  </h2>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28 }}
                    className="p-6"
                  >
                    {/* ── STEP 1 ── */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <Label className="text-sm font-semibold mb-2 block">Select Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal h-12 rounded-xl border-border hover:border-primary/50 transition-colors">
                                <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
                                <span className="font-medium">{format(date, "PPP")}</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} disabled={(d) => d < new Date() || d < festivalStartDate || d > festivalEndDate} initialFocus className="p-3 pointer-events-auto" />
                            </PopoverContent>
                          </Popover>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Star className="w-3 h-3 text-accent" /> Festival period: 22 Sep – 7 Oct 2026
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-semibold mb-2 block">Service Mode</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { mode: "online" as const, icon: Monitor, emoji: "🖥️", title: "Online", sub: "Puja performed, prasad shipped" },
                              { mode: "offline" as const, icon: Building2, emoji: "🛕", title: "Temple Visit", sub: "Be present at the temple" },
                            ].map(({ mode, emoji, title, sub }) => (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => setServiceType(mode)}
                                className={cn(
                                  "relative rounded-2xl border-2 p-4 text-left transition-all duration-200",
                                  serviceType === mode
                                    ? "border-primary bg-primary/5 shadow-warm"
                                    : "border-border hover:border-primary/40"
                                )}
                              >
                                {serviceType === mode && (
                                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gradient-sacred flex items-center justify-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                  </div>
                                )}
                                <span className="text-2xl block mb-2">{emoji}</span>
                                <p className="font-semibold text-sm">{title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => setStep(2)}
                          className="w-full bg-gradient-sacred text-primary-foreground font-bold h-12 rounded-xl hover:scale-[1.01] transition-transform flex items-center gap-2"
                        >
                          Continue <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* ── STEP 2 ── */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="devotee_name" className="text-sm font-semibold mb-1.5 block flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-primary" /> Devotee Name *
                            </Label>
                            <Input id="devotee_name" value={devoteeName} onChange={(e) => setDevoteeName(e.target.value)} placeholder="Full name" className="h-11 rounded-xl" />
                          </div>
                          <div>
                            <Label htmlFor="gotra" className="text-sm font-semibold mb-1.5 block">Gotra <span className="text-muted-foreground font-normal">(optional)</span></Label>
                            <Input id="gotra" value={gotra} onChange={(e) => setGotra(e.target.value)} placeholder="e.g. Kashyap" className="h-11 rounded-xl" />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-semibold mb-2 block">Number of People</Label>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              disabled={quantity <= 1}
                              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:border-primary/50 disabled:opacity-40 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <div className="flex-1 text-center">
                              <span className="font-heading text-3xl font-bold text-gradient-sacred">{quantity}</span>
                              <p className="text-xs text-muted-foreground">person(s)</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setQuantity(Math.min(50, quantity + 1))}
                              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {isCustomAmount && (
                          <div>
                            <Label htmlFor="custom_amount" className="text-sm font-semibold mb-1.5 block">Donation Amount (₹) *</Label>
                            <Input id="custom_amount" type="number" min={minAmount || 10} value={customAmount}
                              onChange={(e) => setCustomAmount(Math.max(minAmount || 10, Number(e.target.value)))} className="h-11 rounded-xl" />
                            <p className="text-xs text-muted-foreground mt-1">Minimum: ₹{minAmount}</p>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 rounded-xl">← Back</Button>
                          <Button onClick={() => setStep(3)} className="flex-1 h-11 bg-gradient-sacred text-primary-foreground font-bold rounded-xl hover:scale-[1.01] transition-transform">
                            Continue <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3 ── */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 p-4">
                          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-2">
                            <Gift className="w-4 h-4" /> Aashirwad Box
                          </p>
                          <p className="text-xs text-amber-700/80 dark:text-amber-400/80">Receive sacred prasad, kumkum, vibhuti & blessings delivered to your doorstep.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { val: true, emoji: "📦", title: "Yes, Send Me!", sub: "Free delivery" },
                            { val: false, emoji: "🙏", title: "No, Thank You", sub: "Blessings online" },
                          ].map(({ val, emoji, title, sub }) => (
                            <button
                              key={String(val)}
                              onClick={() => setWantsAashirwad(val)}
                              className={cn(
                                "relative rounded-2xl border-2 p-5 text-center transition-all duration-200",
                                wantsAashirwad === val ? "border-primary bg-primary/5 shadow-warm" : "border-border hover:border-primary/40"
                              )}
                            >
                              {wantsAashirwad === val && (
                                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gradient-sacred flex items-center justify-center">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                </div>
                              )}
                              <span className="text-3xl block mb-2">{emoji}</span>
                              <p className="font-semibold text-sm">{title}</p>
                              <p className="text-xs text-muted-foreground">{sub}</p>
                            </button>
                          ))}
                        </div>

                        {wantsAashirwad && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 rounded-2xl border border-border bg-muted/30 p-4"
                          >
                            <div>
                              <Label htmlFor="aa_address" className="text-sm font-semibold mb-1.5 block flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-primary" /> Delivery Address *
                              </Label>
                              <Input id="aa_address" value={aashirwadAddress} onChange={e => setAashirwadAddress(e.target.value)} placeholder="House No, Street, City, Pincode" className="h-11 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="aa_phone" className="text-sm font-semibold mb-1.5 block flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-primary" /> WhatsApp *
                                </Label>
                                <Input id="aa_phone" type="tel" value={aashirwadPhone} onChange={e => setAashirwadPhone(e.target.value)} placeholder="10-digit number" className="h-11 rounded-xl" maxLength={10} />
                              </div>
                              <div>
                                <Label htmlFor="aa_gotra" className="text-sm font-semibold mb-1.5 block">Gotra <span className="text-muted-foreground font-normal">(opt.)</span></Label>
                                <Input id="aa_gotra" value={aashirwadGotra} onChange={e => setAashirwadGotra(e.target.value)} placeholder="Your gotra" className="h-11 rounded-xl" />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div className="flex gap-3">
                          <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-11 rounded-xl">← Back</Button>
                          <Button
                            onClick={() => {
                              if (wantsAashirwad === null) { toast.error("Please make a selection"); return; }
                              if (wantsAashirwad && !aashirwadAddress.trim()) { toast.error("Please enter delivery address"); return; }
                              if (wantsAashirwad && !aashirwadPhone.trim()) { toast.error("Please enter WhatsApp number"); return; }
                              handleContinueToSummary();
                            }}
                            className="flex-1 h-11 bg-gradient-sacred text-primary-foreground font-bold rounded-xl hover:scale-[1.01] transition-transform"
                          >
                            Review & Pay <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
                {[{ icon: Shield, label: "Secure Payment" }, { icon: Zap, label: "Instant Confirm" }, { icon: CheckCircle2, label: "100% Authentic" }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary" /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Sticky order summary */}
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="rounded-3xl border border-border bg-card shadow-warm overflow-hidden"
              >
                {/* Service image header */}
                {itemImage && (
                  <div className="relative h-40 overflow-hidden">
                    <img src={itemImage} alt={itemName} className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-white font-heading font-bold text-lg leading-tight">{itemName}</p>
                      <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {templeInfo.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Summary body */}
                <div className="p-5 space-y-4">
                  {/* Price breakdown */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order Summary</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{itemName} × {quantity}</span>
                      <span className="font-semibold">₹{(unitPrice * quantity).toLocaleString()}</span>
                    </div>
                    {chadhavaTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Chadhava Add-ons</span>
                        <span className="font-semibold">+₹{chadhavaTotal.toLocaleString()}</span>
                      </div>
                    )}
                    {wantsAashirwad && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Aashirwad Box</span>
                        <span className="font-semibold text-emerald-600">Free</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between items-center">
                      <span className="font-bold">Total</span>
                      <div className="text-right">
                        <p className="font-heading text-2xl font-bold text-gradient-sacred">₹{totalAmount.toLocaleString()}</p>
                        {isCustomAmount && <p className="text-xs text-muted-foreground">Min ₹{minAmount}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Selected date & mode chips */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm bg-muted/40 rounded-xl px-3 py-2">
                      <CalendarIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="font-medium">{format(date, "dd MMM yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-muted/40 rounded-xl px-3 py-2">
                      {serviceType === "online" ? <Monitor className="w-3.5 h-3.5 text-primary shrink-0" /> : <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                      <span className="font-medium">{serviceType === "online" ? "Online Service" : "Temple Visit"}</span>
                    </div>
                    {devoteeName && (
                      <div className="flex items-center gap-2 text-sm bg-muted/40 rounded-xl px-3 py-2">
                        <User className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-medium truncate">{devoteeName}</span>
                      </div>
                    )}
                  </div>

                  {/* Selected chadhava */}
                  {activeChadhava.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5 font-semibold uppercase tracking-wider">Add-ons</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeChadhava.map(([cid, qty]) => {
                          const ci = chadhavaItems.find(c => c.id === cid);
                          return ci ? (
                            <span key={cid} className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full">
                              {ci.title} ×{qty}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Secured by Razorpay · UPI · Cards · Net Banking
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* ─── CHADHAVA ADD-ONS — Horizontal Scroll ─── */}
        {step === 2 && (
          <div className="mt-12 overflow-hidden -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-0 lg:px-0">
            <div className="flex items-end justify-between mb-6 px-4 lg:px-0">
              <div>
                <h3 className="font-heading font-bold text-2xl flex items-center gap-2.5">
                  <Package className="w-6 h-6 text-primary" />
                  <span className="text-gradient-sacred">Add Chadhava / Arpan</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-lg">
                  Enhance your spiritual experience by offering sacred items to the deity. Swipe to explore all offerings.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                <ChevronRight className="w-3.5 h-3.5 animate-pulse" /> Scroll to explore
              </div>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-4 lg:px-0">
              {chadhavaItems.map((ci, i) => {
                const qty = selectedChadhava[ci.id] || 0;
                const isSelected = qty > 0;
                return (
                  <motion.div
                    key={ci.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className={cn(
                      "min-w-[280px] w-[280px] group rounded-2xl overflow-hidden bg-card border-2 transition-all duration-300 snap-start",
                      isSelected
                        ? "border-primary shadow-warm scale-[1.02] bg-primary/5"
                        : "border-border shadow-card hover:border-primary/40 hover:shadow-warm"
                    )}
                  >
                    {/* Image with overlay */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={ci.image}
                        alt={ci.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {ci.tag && (
                        <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          {ci.tag}
                        </span>
                      )}

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Selected
                        </motion.div>
                      )}

                      <div className="absolute bottom-3 left-3">
                        <span className="font-heading text-xl font-bold text-white shadow-text">₹{ci.price}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h4 className="font-heading text-lg font-bold mb-1.5 group-hover:text-primary transition-colors">{ci.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-5 h-8 leading-relaxed">{ci.description}</p>

                      <div className="flex items-center justify-between mt-auto">
                        {isSelected ? (
                          <div className="flex items-center bg-muted/80 rounded-xl p-1 border border-border w-full justify-between">
                            <button
                              type="button"
                              onClick={() => {
                                const next = qty - 1;
                                if (next <= 0) {
                                  const updated = { ...selectedChadhava };
                                  delete updated[ci.id];
                                  setSelectedChadhava(updated);
                                } else {
                                  setSelectedChadhava({ ...selectedChadhava, [ci.id]: next });
                                }
                              }}
                              className="w-9 h-9 rounded-lg bg-background flex items-center justify-center hover:text-primary transition-colors shadow-sm"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-heading font-bold text-xl text-primary px-4">{qty}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedChadhava({ ...selectedChadhava, [ci.id]: qty + 1 })}
                              className="w-9 h-9 rounded-lg bg-background flex items-center justify-center hover:text-primary transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedChadhava({ ...selectedChadhava, [ci.id]: 1 })}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-sacred px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-warm"
                          >
                            <Plus className="w-4 h-4" /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {/* Spacer for scroll end visibility */}
              <div className="min-w-[20px] sm:min-w-[40px] shrink-0" />
            </div>
          </div>
        )}
      </div>

      {/* ─── SUMMARY MODAL ─── */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Confirm & Pay</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="bg-gradient-sacred px-4 py-3 flex justify-between items-center">
                <span className="text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider">Total Amount</span>
                <span className="font-heading text-2xl font-bold text-primary-foreground">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="p-4 space-y-2.5 text-sm">
                {[
                  { label: "Service", value: itemName },
                  { label: "Date", value: format(date, "PPP") },
                  { label: "Mode", value: serviceType === "online" ? "Online" : "Temple Visit" },
                  { label: "Devotee", value: devoteeName },
                  ...((gotra || aashirwadGotra) ? [{ label: "Gotra", value: wantsAashirwad ? aashirwadGotra : gotra }] : []),
                  { label: "People", value: `${quantity} person(s)` },
                  ...(activeChadhava.length > 0 ? [{ label: "Add-ons", value: activeChadhava.map(([cid, qty]) => { const ci = chadhavaItems.find(c => c.id === cid); return ci ? `${ci.title} ×${qty}` : null; }).filter(Boolean).join(", ") }] : []),
                  ...(wantsAashirwad ? [
                    { label: "Aashirwad Box", value: "✅ Yes" },
                    { label: "Delivery", value: aashirwadAddress },
                    { label: "WhatsApp", value: aashirwadPhone },
                  ] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-3">
                    <span className="text-muted-foreground shrink-0">{label}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleConfirmAndPay}
              disabled={submitting}
              className="w-full bg-gradient-sacred text-primary-foreground font-bold h-12 rounded-xl hover:scale-[1.01] transition-transform"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CreditCard className="w-4 h-4 mr-2" />}
              Pay ₹{totalAmount.toLocaleString()}
            </Button>
            <p className="text-xs text-center text-muted-foreground">Powered by Razorpay · UPI, Cards, Net Banking accepted</p>
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <Footer />
    </div>
  );
};

export default BookingPage;
