import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission would go here
    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for reaching out. We'll get back to you soon.",
      icon: "success",
      confirmButtonColor: "#D97706", // Matching your amber button
    });
    e.target.reset();
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Get in Touch 📬
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Have questions about your library or want to suggest a new feature? 
            Our team is here to help you make your reading experience better.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="space-y-4">
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Email Us</h3>
                  <p className="text-sm text-base-content/60">support@mybooks.com</p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body flex-row items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Call Us</h3>
                  <p className="text-sm text-base-content/60">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body flex-row items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg text-accent">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Working Hours</h3>
                  <p className="text-sm text-base-content/60">Mon - Fri, 9am - 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <form onSubmit={handleSubmit} className="card-body gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="input input-bordered w-full" 
                      required 
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email Address</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="input input-bordered w-full" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Feature Request</option>
                    <option>Report a Bug</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea 
                    className="textarea textarea-bordered h-32" 
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button type="submit" className="btn bg-amber-600 hover:bg-amber-700 text-white border-none w-full md:w-auto">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: Map/Address placeholder */}
        <div className="mt-12 card bg-base-100 shadow-lg border border-base-300 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-error" /> Visit Our Office
              </h2>
              <p className="text-base-content/70">
                123 Library Lane, Booktown<br />
                Literary District, NY 10001<br />
                United States
              </p>
            </div>
            <div className="bg-base-300 h-48 md:h-auto flex items-center justify-center p-4">
               {/* Placeholder for an actual Map integration like Google Maps */}
               <div className="text-center opacity-40">
                 <MessageSquare size={48} className="mx-auto mb-2" />
                 <p className="italic text-sm">Map View Integrated Here</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;