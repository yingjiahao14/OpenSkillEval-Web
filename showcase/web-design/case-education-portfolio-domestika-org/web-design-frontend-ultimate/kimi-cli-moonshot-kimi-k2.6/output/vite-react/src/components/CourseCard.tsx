import { Star, Users } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  students: string;
  rating: string;
  reviews: string;
  price: string;
  originalPrice?: string | null;
  badge?: string;
  image?: string;
}

export function CourseCard({
  title,
  instructor,
  students,
  rating,
  reviews,
  price,
  originalPrice,
  badge,
  image,
}: CourseCardProps) {
  const badgeClass =
    badge === "Best seller"
      ? "badge-bestseller"
      : badge === "New"
      ? "badge-new"
      : badge === "Winner"
      ? "badge-winner"
      : "badge-discount";

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden card-lift cursor-pointer group">
      <div className="relative aspect-[4/3] img-placeholder overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center">
              <Star className="w-8 h-8 text-gray-300" />
            </div>
          </div>
        )}
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${badgeClass}`}
          >
            {badge}
          </span>
        )}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold badge-discount">
          98% Disc.
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-ink text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted mb-3">by {instructor}</p>
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {students}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {rating} ({reviews})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-ink text-lg">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted line-through">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
