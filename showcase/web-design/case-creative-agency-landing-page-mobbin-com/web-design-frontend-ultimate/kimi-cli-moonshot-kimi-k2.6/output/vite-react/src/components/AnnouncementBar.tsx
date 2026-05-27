import { siteConfig } from "../config/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#141414] text-white text-center py-2.5 px-4 text-sm font-medium">
      <span className="inline-flex items-center gap-2">
        {siteConfig.announcement}
        <a href="#" className="underline underline-offset-2 hover:text-gray-300 transition-colors">
          Learn more
        </a>
      </span>
    </div>
  );
}
