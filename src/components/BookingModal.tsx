import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, Minus, Plus, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { festivalStartDate, festivalEndDate } from "@/lib/data";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingType: "puja" | "chadhava" | "prasad" | "darshan";
  itemName: string;
  amount: number;
  isCustomAmount?: boolean;
  minAmount?: number;
}

type Step = 1 | 2 | 3 | "done";

const BookingModal = ({ open, onOpenChange, bookingType, itemName, amount, isCustomAmount, minAmount }: BookingModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [date, setDate] = useState<Date>(festivalStartDate);
  const [serviceType, setServiceType] = useState<"online" | "offline">("online");
  const [devoteeName, setDevoteeName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [gotra, setGotra] = useState("Kashyapa");
  const [ashirwad, setAshirwad] = useState(false);
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState(amount);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.slice(0, 10);
  };

  const handlePhoneVerification = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    setIsVerifyingPhone(true);
    // Simulate OTP sending
    setTimeout(() => {
      toast.success(`OTP sent to ${phone}. Use 1234 to verify.`);
      setIsVerifyingPhone(false);
    }, 1000);
  };

  const handleOtpVerification = async () => {
    if (otp !== "1234") {
      toast.error("Invalid OTP. Please enter 1234");
      return;
    }

    // Create/login user with phone
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${phone}@temp.com`,
      password: "temp123456"
    });

    if (error) {
      // Create new user
      const { error: signUpError } = await supabase.auth.signUp({
        email: `${phone}@temp.com`,
        password: "temp123456",
        options: {
          data: { full_name: devoteeName.trim(), phone: phone }
        }
      });
      
      if (signUpError) {
        toast.error("Authentication failed. Please try again.");
        return;
      }
    }

    toast.success("Phone verified! Continuing with booking...");
    setStep(1); // Go to booking flow
  };
  useEffect(() => {
    if (user && open) {
      const name = user.user_metadata?.full_name || "";
      if (name) setDevoteeName(name);
    }
  }, [user, open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(1);
      setDate(festivalStartDate);
      setServiceType("online");
      setGotra("Kashyapa");
      setAshirwad(false);
      setAddress("");
      setPhone("");
      setOtp("");
      setIsVerifyingPhone(false);
      setQuantity(1);
      setCustomAmount(amount);
      setBookingId(null);
    }
  }, [open, amount]);

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Quick Booking</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="font-semibold text-sm">{itemName}</p>
              <p className="text-primary font-heading text-lg font-bold">₹{amount.toLocaleString()}</p>
            </div>

            {!isVerifyingPhone && otp === "" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quick-name" className="text-base font-medium">Your Name</Label>
                  <Input
                    id="quick-name"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2 h-12"
                  />
                </div>
                
                <div>
                  <Label htmlFor="quick-phone" className="text-base font-medium">Mobile Number</Label>
                  <div className="flex mt-2">
                    <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                      <span className="text-sm font-medium">+91</span>
                    </div>
                    <Input
                      id="quick-phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                      className="rounded-l-none border-l-0 h-12"
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handlePhoneVerification}
                  disabled={!devoteeName.trim() || phone.length !== 10}
                  className="w-full h-12 font-medium"
                >
                  Send OTP & Continue
                </Button>
              </div>
            )}

            {(isVerifyingPhone || otp !== "") && (
              <div className="space-y-4 text-center">
                {isVerifyingPhone ? (
                  <div className="py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-muted-foreground">Sending OTP...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quick-otp" className="text-base font-medium">Enter OTP</Label>
                      <Input
                        id="quick-otp"
                        type="text"
                        placeholder="1234"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="text-center text-2xl font-mono tracking-widest h-16 mt-2"
                        maxLength={4}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        OTP sent to {phone}. Use 1234 for testing.
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => { setOtp(""); setIsVerifyingPhone(false); }}
                        className="flex-1 h-12"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleOtpVerification}
                        disabled={otp.length !== 4}
                        className="flex-1 h-12 font-medium"
                      >
                        Verify & Book
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const unitPrice = isCustomAmount ? customAmount : amount;
  const totalAmount = unitPrice * quantity;

  const handleSubmit = async () => {
    if (!devoteeName.trim()) {
      toast.error("Please enter devotee name");
      return;
    }

    if (ashirwad && !address.trim()) {
      toast.error("Please enter delivery address for ashirwad");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.from("bookings").insert({
      user_id: user.id,
      booking_type: bookingType,
      item_name: itemName,
      devotee_name: devoteeName.trim(),
      gotra: gotra.trim() || "Kashyapa",
      ashirwad: ashirwad,
      address: ashirwad ? address.trim() : null,
      date: format(date, "yyyy-MM-dd"),
      amount: totalAmount,
      quantity,
      notes: serviceType === "offline" ? "Offline (Temple Visit)" : "Online",
    }).select("id").single();

    setSubmitting(false);
    if (error) {
      toast.error("Booking failed. Please try again.");
    } else {
      setBookingId(data?.id || null);
      setStep("done");
    }
  };

  const typeLabel = bookingType === "puja" ? "Puja" : bookingType === "chadhava" ? "Chadhava" : bookingType === "prasad" ? "Naivedya" : "Darshan";

  // Step indicator
  const stepLabels = ["Date & Type", "Details", "Payment"];
  const currentStepNum = step === "done" ? 3 : step;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Book {typeLabel}</DialogTitle>
          </DialogHeader>

          {/* Step indicator - Minimalist */}
          {step !== "done" && (
            <div className="flex justify-center mb-4">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i <= currentStepNum ? "bg-primary" : "bg-muted"
                  )} />
                ))}
              </div>
            </div>
          )}

          {/* Item info */}
          <div className="rounded-lg bg-muted/50 p-3 mb-2">
            <p className="font-semibold text-sm">{itemName}</p>
            {!isCustomAmount && (
              <p className="text-primary font-heading text-lg font-bold">₹{amount.toLocaleString()}</p>
            )}
            {isCustomAmount && (
              <p className="text-xs text-muted-foreground">Custom amount (min ₹{minAmount})</p>
            )}
          </div>

          {/* STEP 1: Date & Type */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Label className="text-base font-medium">When would you like this service?</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal mt-2 h-12")}>
                      <CalendarIcon className="mr-3 h-5 w-5" />
                      {format(date, "EEEE, MMMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      disabled={(d) => d < new Date() || d < festivalStartDate || d > festivalEndDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-muted-foreground mt-2">Festival period: Sep 22 – Oct 7, 2026</p>
              </div>

              <div>
                <Label className="text-base font-medium">How would you like to participate?</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setServiceType("online")}
                    className={cn(
                      "rounded-xl border-2 p-4 text-center transition-all duration-200 hover:scale-[1.02]",
                      serviceType === "online" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="text-2xl mb-2">🖥️</div>
                    <div className="font-medium">Online</div>
                    <div className="text-xs text-muted-foreground mt-1">Remote participation</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType("offline")}
                    className={cn(
                      "rounded-xl border-2 p-4 text-center transition-all duration-200 hover:scale-[1.02]",
                      serviceType === "offline" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="text-2xl mb-2">🛕</div>
                    <div className="font-medium">Temple Visit</div>
                    <div className="text-xs text-muted-foreground mt-1">In-person attendance</div>
                  </button>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full h-12 text-base font-medium">
                Continue
              </Button>
            </div>
          )}

          {/* STEP 2: Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Label htmlFor="devotee_name" className="text-base font-medium">Devotee Name</Label>
                <Input
                  id="devotee_name"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="Enter full name"
                  className="mt-2 h-12"
                />
              </div>
              
              <div>
                <Label htmlFor="gotra" className="text-base font-medium">Gotra</Label>
                <Input
                  id="gotra"
                  value={gotra}
                  onChange={(e) => setGotra(e.target.value)}
                  placeholder="Kashyapa (default)"
                  className="mt-2 h-12"
                />
              </div>

              {/* Ashirwad Checkbox */}
              <div className="flex items-start space-x-3 p-4 rounded-xl border bg-muted/30">
                <Checkbox
                  id="ashirwad"
                  checked={ashirwad}
                  onCheckedChange={(checked) => {
                    setAshirwad(checked as boolean);
                    if (!checked) setAddress("");
                  }}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="ashirwad" className="text-base font-medium cursor-pointer">
                    Request Ashirwad
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive blessed items at your address
                  </p>
                </div>
              </div>

              {/* Conditional Address Field */}
              {ashirwad && (
                <div className="animate-in fade-in-50 slide-in-from-top-2 duration-300">
                  <Label htmlFor="address" className="text-base font-medium">Delivery Address</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                    className="mt-2 resize-none"
                  />
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label className="text-base font-medium">Number of People</Label>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    disabled={quantity <= 1}
                    className="h-12 w-12 rounded-full"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="text-2xl font-bold w-16 text-center">{quantity}</div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.min(50, quantity + 1))}
                    className="h-12 w-12 rounded-full"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Custom amount */}
              {isCustomAmount && (
                <div>
                  <Label htmlFor="custom_amount" className="text-base font-medium">Donation Amount (₹)</Label>
                  <Input
                    id="custom_amount"
                    type="number"
                    min={minAmount || 10}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Math.max(minAmount || 10, Number(e.target.value)))}
                    className="mt-2 h-12"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Minimum: ₹{minAmount}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                  Back
                </Button>
                <Button onClick={() => {
                  if (!devoteeName.trim()) { toast.error("Please enter devotee name"); return; }
                  if (ashirwad && !address.trim()) { toast.error("Please enter delivery address for ashirwad"); return; }
                  setStep(3);
                }} className="flex-1 h-12 font-medium">
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Summary */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <p className="text-sm text-muted-foreground">Please review your booking details</p>
              </div>

              <div className="rounded-2xl border bg-gradient-to-br from-muted/30 to-muted/10 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-semibold">{itemName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{format(date, "MMM d, yyyy")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{serviceType === "online" ? "Online" : "Temple Visit"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Devotee</span>
                  <span className="font-medium">{devoteeName}</span>
                </div>
                {gotra && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Gotra</span>
                    <span className="font-medium">{gotra}</span>
                  </div>
                )}
                {ashirwad && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ashirwad</span>
                    <span className="font-medium text-green-600">✓ Requested</span>
                  </div>
                )}
                {quantity > 1 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">People</span>
                    <span className="font-medium">{quantity} × ₹{unitPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12">
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={submitting} className="flex-1 h-12 font-medium">
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Confirm ₹${totalAmount.toLocaleString()}`
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                🔒 Secure booking • Payment gateway coming soon
              </p>
            </div>
          )}

          {/* DONE: Confirmation */}
          {step === "done" && (
            <div className="text-center py-8 space-y-6 animate-in fade-in-50 zoom-in-95 duration-500">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground">Your service has been successfully booked 🙏</p>
              </div>

              {bookingId && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                  <span className="text-sm text-muted-foreground">Booking ID:</span>
                  <span className="font-mono font-bold text-primary">{bookingId.slice(0, 8).toUpperCase()}</span>
                </div>
              )}

              <div className="rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 p-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-semibold">{itemName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{format(date, "MMM d, yyyy")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Devotee</span>
                  <span className="font-medium">{devoteeName}</span>
                </div>
                {ashirwad && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ashirwad</span>
                    <span className="font-medium text-green-600">✓ Requested</span>
                  </div>
                )}
              </div>

              <Button onClick={() => onOpenChange(false)} className="w-full h-12 text-base font-medium">
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingModal;
