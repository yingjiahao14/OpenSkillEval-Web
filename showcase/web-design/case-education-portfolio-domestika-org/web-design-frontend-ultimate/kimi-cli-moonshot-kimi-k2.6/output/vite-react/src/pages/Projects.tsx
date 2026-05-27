import { useState } from "react";
import { Heart, Eye, ArrowUpDown } from "lucide-react";
import { siteConfig } from "../config/site";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type SortOption =
  | "Featured"
  | "Most liked"
  | "Most comments"
  | "Most viewed"
  | "Most recent";
type TimeFilter = "All time" | "This week" | "This month" | "This year";

const sortOptions: SortOption[] = [
  "Featured",
  "Most liked",
  "Most comments",
  "Most viewed",
  "Most recent",
];
const timeFilters: TimeFilter[] = [
  "All time",
  "This week",
  "This month",
  "This year",
];
const creativeFields = [
  "All",
  "2D Animation",
  "3D",
  "Illustration",
  "Photography",
  "Graphic Design",
  "Watercolor Painting",
  "Embroidery",
  "Craft",
  "Digital Illustration",
  "Architecture",
];

export default function Projects() {
  const [sortBy, setSortBy] = useState<SortOption>("Featured");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("All time");
  const [fieldFilter, setFieldFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let displayed = [...siteConfig.projects];

  if (fieldFilter !== "All") {
    displayed = displayed.filter(
      (p) =>
        p.field === fieldFilter ||
        (fieldFilter === "Craft" && p.field === "Craft") ||
        (fieldFilter === "Digital Illustration" &&
          p.field === "Digital Illustration")
    );
  }

  switch (sortBy) {
    case "Most liked":
      displayed.sort((a, b) => b.likes - a.likes);
      break;
    case "Most viewed":
      displayed.sort((a, b) => b.views - a.views);
      break;
    case "Most recent":
      displayed.reverse();
      break;
    default:
      break;
  }

  const formatViews = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K";
    return String(n);
  };

  return (
    <div className="min-h-screen bg-surface grain">
      <Header activePage="projects" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
            Community Projects
          </h1>
          <p className="text-muted">
            Discover inspiring work from creatives around the world
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortBy}
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-border rounded-lg shadow-lg z-20 py-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortBy(opt);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      sortBy === opt ? "text-brand font-medium" : "text-ink"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time filters */}
          {timeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === t
                  ? "bg-brand text-white"
                  : "bg-white border border-border hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Creative field chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {creativeFields.map((f) => (
            <button
              key={f}
              onClick={() => setFieldFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                fieldFilter === f
                  ? "bg-brand text-white"
                  : "bg-white border border-border text-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div className="masonry-grid">
          {displayed.map((project, i) => (
            <div
              key={i}
              className="masonry-item bg-white rounded-xl overflow-hidden border border-border card-lift group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {project.winner && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold badge-winner">
                    Winner
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-ink text-sm mb-1 group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted mb-3">{project.author}</p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {project.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {formatViews(project.views)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">
              No projects found for the selected filters.
            </p>
            <button
              onClick={() => {
                setFieldFilter("All");
                setSortBy("Featured");
              }}
              className="mt-4 text-brand font-medium hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
