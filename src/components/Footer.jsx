import { Facebook } from "lucide-react";
import React from "react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import logo from '../assets/logo3.svg'

import ElegantNewsletter from "./ElegantNewsletter";

const Footer = () => {
  return (
    <div>
      <div className="w-full -mt-0">
        <svg
          viewBox="0 0 1440 60"
          className="w-full block"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,20 C220,90 420,0 720,30 C1020,60 1220,10 1440,40 L1440 120 L0 120 Z"
            fill="#fffbeb"
          />
        </svg>
      </div>
      <footer className="bg-amber-50 text-amber-900  border-amber-200">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
           
            <div className="lg:col-span-1 ">
              <a href="/" className="inline-block">
              <div className="">
                <img className=" w-36" src={logo} alt="" />
              </div>
              
              </a>
              <p className="mt-3 text-sm text-amber-700 max-w-xs">
                An independent bookstore celebrating literature — curated
                selections, mindful spaces, and author events.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <small className="text-xs text-amber-600">Follow</small>
                <BsInstagram label="Instagram" />
                <BsTwitterX label="Twitter" />
                <Facebook label="Facebook" />
              </div>

              
            </div>

            {/* Link columns */}
            <div className="lg:col-span-1 grid grid-cols-2 gap-6">
              <nav aria-label="Explore" className="space-y-2">
                <h4 className="text-sm font-medium">Explore</h4>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  New & Notable
                </a>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  Staff Recommendations
                </a>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  Rare Finds
                </a>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  Gift Guides
                </a>
              </nav>

              <nav aria-label="Support" className="space-y-2">
                <h4 className="text-sm font-medium">Support</h4>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  Events
                </a>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  Membership
                </a>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  Wholesale
                </a>
                <a
                  href="#"
                  className="block text-sm text-amber-700 hover:underline"
                >
                  Accessibility
                </a>
              </nav>
            </div>

            {/* Newsletter + small callouts */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-medium">The Reader's Letter</h4>
              <p className="mt-2 text-sm text-amber-700">
                Monthly literary notes, upcoming events, and an exclusive
                members-only short story.
              </p>

              <ElegantNewsletter />

              <div className="mt-6 grid grid-cols-2 gap-3">
                {/* <Callout title="Gift Cards" subtitle="E-gift & physical" />
                <Callout
                  title="Bookplate Service"
                  subtitle="Signed & personalized"
                /> */}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t  border-amber-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-amber-600">
              © {new Date().getFullYear()} The Book Haven — Independent
              Bookstore
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-amber-700 hover:underline">
                Privacy
              </a>
              <a href="#" className="text-amber-700 hover:underline">
                Terms
              </a>
              <a href="#" className="text-amber-700 hover:underline">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
