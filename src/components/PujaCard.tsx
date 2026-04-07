import { useNavigate } from "react-router-dom";
import type { Puja } from "@/lib/data";
import { templeInfo } from "@/lib/data";
import { Calendar } from "lucide-react";

interface PujaCardProps {
  puja: Puja;
}

const PujaCard = ({ puja }: PujaCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all cursor-pointer"
      onClick={() => navigate(`/puja/puja/${puja.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={puja.image}
          alt={puja.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {puja.tag && (
          <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            {puja.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">{puja.category}</span>
        <h3 className="font-heading text-lg font-semibold mt-1 mb-2 line-clamp-1">{puja.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{puja.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          🛕 {templeInfo.name}
        </div>
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
    </div>
  );
};

export default PujaCard;
