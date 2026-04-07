import { useState } from "react";
import { motion } from "framer-motion";
import { pujas, chadhavaItems, darshanSlots } from "@/lib/data";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Gift,
  Eye as EyeIcon,
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
} from "lucide-react";

type Tab = "overview" | "pujas" | "chadhava" | "darshan" | "bookings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { id: "overview" as Tab, icon: LayoutDashboard, label: "Overview" },
    { id: "pujas" as Tab, icon: BookOpen, label: "Manage Pujas" },
    { id: "chadhava" as Tab, icon: Gift, label: "Manage Chadhava" },
    { id: "darshan" as Tab, icon: EyeIcon, label: "Manage Darshan" },
    { id: "bookings" as Tab, icon: CalendarCheck, label: "Bookings" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">🙏</span>
              <span className="font-heading font-bold text-gradient-sacred">Admin</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-sidebar-accent">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Link to="/" className="text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-heading text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Pujas", value: pujas.length, icon: "🕉️" },
                  { label: "Chadhava Items", value: chadhavaItems.length, icon: "📿" },
                  { label: "Darshan Slots", value: darshanSlots.length, icon: "🛕" },
                  { label: "Active Services", value: pujas.length + chadhavaItems.length + darshanSlots.length, icon: "✅" },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl bg-card p-5 shadow-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{card.label}</span>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <div className="font-heading text-2xl font-bold">{card.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Manage all services from the sidebar. Bookings data is available in the Bookings tab (connected to the database).
              </p>
            </motion.div>
          )}

          {activeTab === "pujas" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-heading text-2xl font-bold mb-6">Manage Pujas</h1>
              <div className="rounded-xl bg-card shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Puja</th>
                      <th className="text-left p-4 font-semibold">Category</th>
                      <th className="text-left p-4 font-semibold">Date</th>
                      <th className="text-left p-4 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pujas.map((p) => (
                      <tr key={p.id} className="border-t border-border">
                        <td className="p-4 font-semibold">{p.title}</td>
                        <td className="p-4 text-muted-foreground">{p.category}</td>
                        <td className="p-4">{p.date}</td>
                        <td className="p-4 font-semibold">₹{p.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "chadhava" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-heading text-2xl font-bold mb-6">Manage Chadhava</h1>
              <div className="rounded-xl bg-card shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Item</th>
                      <th className="text-left p-4 font-semibold">Description</th>
                      <th className="text-left p-4 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chadhavaItems.map((c) => (
                      <tr key={c.id} className="border-t border-border">
                        <td className="p-4 font-semibold">{c.title}</td>
                        <td className="p-4 text-muted-foreground line-clamp-1">{c.description}</td>
                        <td className="p-4 font-semibold">₹{c.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "darshan" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-heading text-2xl font-bold mb-6">Manage Darshan Slots</h1>
              <div className="rounded-xl bg-card shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Slot</th>
                      <th className="text-left p-4 font-semibold">Type</th>
                      <th className="text-left p-4 font-semibold">Time</th>
                      <th className="text-left p-4 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {darshanSlots.map((d) => (
                      <tr key={d.id} className="border-t border-border">
                        <td className="p-4 font-semibold">{d.title}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            d.type === "online" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                          }`}>{d.type}</span>
                        </td>
                        <td className="p-4 text-muted-foreground">{d.time}</td>
                        <td className="p-4 font-semibold">{d.price === 0 ? "Free" : `₹${d.price}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "bookings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-heading text-2xl font-bold mb-6">All Bookings</h1>
              <div className="text-muted-foreground text-sm">
                Bookings from devotees are stored in the database. View them in the Cloud backend.
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
