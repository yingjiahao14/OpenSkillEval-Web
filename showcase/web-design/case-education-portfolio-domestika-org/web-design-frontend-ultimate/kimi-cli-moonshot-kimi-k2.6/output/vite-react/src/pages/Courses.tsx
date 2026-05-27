import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { siteConfig } from "../config/site";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { Carousel } from "../components/Carousel";

const allCourses = [
  ...siteConfig.bestSellers,
  ...siteConfig.newCourses,
  {
    title: "Brand Identity Design Masterclass",
    instructor: "Sarah Mitchell",
    students: "45,230",
    rating: "98%",
    reviews: "2.1K",
    price: "$0.50",
    originalPrice: "$49.99",
    badge: "Top rated",
  },
  {
    title: "Digital Photography Fundamentals",
    instructor: "James Park",
    students: "89,100",
    rating: "99%",
    reviews: "5.6K",
    price: "$0.50",
    originalPrice: "$39.99",
    badge: "Popular courses",
  },
  {
    title: "Motion Graphics with After Effects",
    instructor: "Elena Rodriguez",
    students: "34,500",
    rating: "97%",
    reviews: "1.8K",
    price: "$0.50",
    originalPrice: "$44.99",
    badge: "Guided courses",
  },
  {
    title: "Illustration for Children's Books",
    instructor: "Yuki Tanaka",
    students: "22,800",
    rating: "100%",
    reviews: "980",
    price: "$0.50",
    originalPrice: "$34.99",
    badge: "New",
  },
  {
    title: "Social Media Content Strategy",
    instructor: "Alex Morgan",
    students: "56,400",
    rating: "98%",
    reviews: "3.2K",
    price: "$0.50",
    originalPrice: "$29.99",
    badge: "Best seller",
  },
  {
    title: "3D Modeling with Blender",
    instructor: "Marcus Chen",
    students: "18,900",
    rating: "99%",
    reviews: "750",
    price: "$0.50",
    originalPrice: "$54.99",
    badge: "Deep Dive",
  },
];

const categoryMap: Record<string, string[]> = {
  Illustration: ["Drawing for Beginners Level -1", "Creative Drawing Techniques for Beginners", "Illustration for Children's Books"],
  Design: ["Brand Identity Design Masterclass", "Introduction to Adobe Photoshop"],
  "Photography & Video": ["Professional Photography for Instagram", "Digital Photography Fundamentals", "Motion Graphics with After Effects"],
  "3D & Animation": ["Introduction to After Effects", "3D Modeling with Blender"],
  "Marketing & Business": ["Social Media Content Strategy"],
  Craft: ["Modern Watercolor Techniques"],
};

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("All courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All courses" ||
      (categoryMap[activeCategory] && categoryMap[activeCategory].includes(course.title));
    return matchesSearch && matchesCategory;
  });

  const featuredCourses = allCourses.slice(0, 4);

  return (
    <div className="min-h-screen bg-surface grain">
      <Header activePage="courses" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h2 className="font-display text-xl font-bold">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="p-2 rounded-md border border-border hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div
              className={`${
                mobileFiltersOpen ? "block" : "hidden"
              } lg:block space-y-6`}
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                />
              </div>

              {/* Course Types */}
              <div>
                <h3 className="text-sm font-semibold text-ink mb-3">
                  Course Type
                </h3>
                <div className="space-y-1">
                  {siteConfig.courseTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveCategory(type)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === type
                          ? "bg-brand/10 text-brand font-medium"
                          : "text-muted hover:text-ink hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-ink mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {siteConfig.categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-brand/10 text-brand font-medium"
                          : "text-muted hover:text-ink hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Areas */}
              <div>
                <h3 className="text-sm font-semibold text-ink mb-3">Areas</h3>
                <div className="space-y-1">
                  {siteConfig.areas.map((area) => (
                    <button
                      key={area}
                      onClick={() => setActiveCategory(area)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === area
                          ? "bg-brand/10 text-brand font-medium"
                          : "text-muted hover:text-ink hover:bg-gray-50"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Software */}
              <div>
                <h3 className="text-sm font-semibold text-ink mb-3">
                  Software
                </h3>
                <div className="space-y-1">
                  {siteConfig.software.map((sw) => (
                    <button
                      key={sw}
                      onClick={() => setActiveCategory(sw)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === sw
                          ? "bg-brand/10 text-brand font-medium"
                          : "text-muted hover:text-ink hover:bg-gray-50"
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                Explore Courses
              </h1>
              <p className="text-muted">
                {filteredCourses.length} courses available
              </p>
            </div>

            {/* Featured carousel */}
            {activeCategory === "All courses" && !searchQuery && (
              <div className="mb-10">
                <h2 className="font-semibold text-ink mb-4">Featured</h2>
                <Carousel itemsPerView={2} gap={16}>
                  {featuredCourses.map((course, i) => (
                    <CourseCard key={i} {...course} />
                  ))}
                </Carousel>
              </div>
            )}

            {/* Course grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course, i) => (
                <CourseCard key={i} {...course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted text-lg">
                  No courses found for "{activeCategory}"
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All courses");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-brand font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
