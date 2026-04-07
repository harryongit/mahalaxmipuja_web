import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gradient-dark text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🙏</span>
            <span className="font-heading text-2xl font-bold text-gradient-sacred">MahalaxmiPuja</span>
          </div>
          <p className="text-sm opacity-80 max-w-md leading-relaxed">
            Puja services by hereditary Shreepujak at Shri Mahalaxmi Mandir, Kolhapur (Ambabai). Book personalized pujas, offer chadhava, naivedya, and experience darshan.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/pujas", label: "Puja Booking" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/my-bookings", label: "My Bookings" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>Pooja Services</span>
            <span>Chadhava / Arpan</span>
            <span>Naivedya / Bhog</span>
            <span>Online Darshan</span>
            <span>Annadan & Gou Seva</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs opacity-50">
        © 2026 MahalaxmiPuja. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
