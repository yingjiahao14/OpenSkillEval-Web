import { Globe, MessageSquare, Camera, Share2, Video } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="footer" className="bg-warm-900 text-warm-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4">Programs</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Disaster Relief
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Blood Donation
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Emergency Preparedness
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  International Aid
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Community Health
                </a>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#get-involved" className="hover:text-white transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Start a Fundraiser
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Corporate Partnerships
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Financials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press Room
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Find Local Chapter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="text-white font-semibold text-sm">
              Global Aid Alliance
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-warm-800 hover:bg-warm-700 flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-warm-800 hover:bg-warm-700 flex items-center justify-center transition-colors"
              aria-label="X (Twitter)"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-warm-800 hover:bg-warm-700 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-warm-800 hover:bg-warm-700 flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-warm-800 hover:bg-warm-700 flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-warm-500">
          © 2024 Global Aid Alliance. All rights reserved. A 501(c)(3) nonprofit
          organization. Tax ID: 53-0196742
        </div>
      </div>
    </footer>
  )
}
