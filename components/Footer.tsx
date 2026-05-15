import Link from "next/link";

import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            <Link
              href="/"
              className="text-teal-400 hover:text-teal-500 transition"
            >
              MD<span className="text-white">Lawancy</span>
            </Link>
          </h2>
          <p className="text-sm leading-relaxed">
            MD Lawancy helps printers find top-quality brands, equipment, and
            supplies. Earn points from every purchase to use for future orders.
            Ready to get printing?
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Email Newsletter
          </h3>
          <p className="text-sm mb-4">
            Get discounts, printing tips, new product updates, and more.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md ring-1 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Site Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Home",
              "About Us",
              "Services",
              "Blog",
              "Shop",
              "Contact",
              "Privacy Policy",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Get in Touch
          </h3>
          <p className="text-sm mb-2">📞 +234 814 0394 714</p>
          <p className="text-sm mb-4">
            Opposite Don Mabel Ties, Off Jattu Road, Auchi
          </p>
          <div>
            <p className="text-sm font-medium mb-2 text-gray-400">Follow us:</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-400 transition">
                <FaFacebookSquare size={22} />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                <FaYoutube size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MD Lawancy Limited — All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
