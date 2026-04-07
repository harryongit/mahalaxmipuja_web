import { useState } from "react";
import { useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Settings, BookOpen, LogOut, Shield } from "lucide-react";

const ProfileDropdown = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  const menuItems = [
    { icon: User, label: "My Profile", action: () => navigate("/profile") },
    { icon: BookOpen, label: "My Bookings", action: () => navigate("/my-bookings") },
    { icon: Shield, label: "Admin Panel", action: () => navigate("/admin") },
    { icon: Settings, label: "Settings", action: () => {} },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-gradient-sacred p-0.5 transition-transform hover:scale-105"
      >
        <div className="w-9 h-9 rounded-full bg-card flex items-center justify-center text-xs font-bold text-primary">
          {initials}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-64 rounded-xl bg-card border border-border shadow-warm overflow-hidden z-50 animate-fade-up">
          <div className="p-4 bg-muted/50 border-b border-border">
            <p className="font-semibold text-sm">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <div className="py-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-border py-2">
            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
