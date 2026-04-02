"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Cinzel } from "next/font/google";
import { useRouter } from "next/navigation";


const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

const services = [
  {
    title: "Residential Interiors",
    description:
      "Elegant and personalized home interiors that reflect your unique style and comfort.",
    icon: "/home bg.jpg",
  },
  {
    title: "Commercial Spaces",
    description:
      "Modern, functional, and inspiring workspaces designed for productivity and creativity.",
    icon: "/comm.jpeg",
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Transform your old spaces with innovative and sustainable redesigns.",
    icon: "/rr1.png",
  },
  {
    title: "Modular Kitchens",
    description:
      "Stylish, space-efficient kitchens crafted with precision and functionality in mind.",
    icon: "/modkit.jpeg",
  },
  {
    title: "Furniture Design",
    description:
      "Custom furniture that balances aesthetics and comfort, tailored to your taste.",
    icon: "/furniture.png",
  },
  {
    title: "Space Planning",
    description:
      "Smart layouts and designs that maximize your space’s utility and visual appeal.",
    icon: "/spaceplan.png",
  },
];

export default function Home() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");




  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const submitLead = async (payload: any) => {
  await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // show success popup
  setShowSuccess(true);

  // auto close after 3 seconds
  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
};


  return (
    <main className="relative text-gray-900 scroll-smooth">
      {/* ================= HEADER ================= */}
      <header
        className="flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md"
        style={{
          backgroundImage: "url('/header-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90px",
          padding: "20px 60px",
        }}
      >
{/* 🔸 Left: Logo + Title */}
<div className="flex items-center">
  
  {/* Fixed logo container */}
  <div style={{ width: "100px" }}>
    <Image
      src="/logo (11).png"
      alt="Splendid Spaces Logo"
      width={70}
      height={70}
      quality={100}
      priority
      className="rounded-full"
    />
  </div>

  {/* Text stays stable */}
  <h1
    className={`${cinzel.className} text-white font-bold`}
    style={{
      fontSize: "35px",
      letterSpacing: "0.05em",
    }}
  >
    Splendid <span className="text-yellow-400">Spaces</span>
  </h1>

</div>

        {/* 🔸 Right: Navigation */}
        <nav
          className="flex"
          style={{
            gap: "45px",
            fontSize: "18px",
            letterSpacing: "0.03em",
          }}
        >
          

          
          

        
          <motion.button
              onClick={() => router.push("/calculate-budget")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-white hover:text-blue-900 font-semibold py-3 px-8 rounded-full shadow-md transition mx-auto"
            >
              Calculate Budget
            </motion.button>
          <button
            onClick={() => scrollToSection("hero")}
            className="text-white hover:text-yellow-400 transition font-semibold"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-white hover:text-yellow-400 transition font-semibold"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("catalogue")}
            className="text-white hover:text-yellow-400 transition font-semibold"
          >
            Catalogue
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-white hover:text-yellow-400 transition font-semibold"
          >
            Get in Touch
          </button>
          
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="flex flex-col justify-center items-center text-center relative z-10"
        style={{
          backgroundImage: "url('/home bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          paddingTop: "120px",
          position: "relative",
        }}
      >
        {/* Overlay tint */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'roboto', sans-serif",
              fontSize: "37px",
              lineHeight: "56px",
              fontWeight: 800,
              color: "#0a2540",
              marginBottom: "6px",
              letterSpacing: "0.02em",
            }}
          >
            Transforming{" "}
            <span style={{ color: "#facc15" }}>Spaces,</span> Enhancing Lives
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              color: "#ffffff",
              fontSize: "20px",
              lineHeight: "30px",
              maxWidth: "700px",
              margin: "10px auto 40px",
            }}
          >
            We design modern, functional interiors that reflect your lifestyle —
            where aesthetics meet comfort.
          </motion.p>

          <motion.button
            onClick={() => setIsFormOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shadow-md transition"
            style={{
              backgroundColor: "#facc15",
              color: "#fff", 
              fontWeight: 600,
              borderRadius: "9999px",
              padding: "12px 28px",
              fontSize: "17px",
            }}
          >
            Book your free consultation now!
          </motion.button>
        </div>
      </section>

      {/* ================= POPUP FORM ================= */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md bg-white/20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full"
            >
              <h2
                className={`${cinzel.className} text-2xl font-bold text-blue-900 mb-6`}
              >
                Book Your Free Consultation
              </h2>
              <form
              className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  await submitLead({
                    source: "Book Consultation",
                    name,
                    email,
                    phone,
                    message: "Consultation request",
                  });

                  // reset fields
                  setName("");
                  setEmail("");
                  setPhone("");
                  setIsFormOpen(false);
                }}
                >

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition"
                >
                  Submit
                </button>
              </form>
              <button
                onClick={() => setIsFormOpen(false)}
                className="mt-5 text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= OUR SERVICES ================= */}
      <section
        id="services"
        className="bg-[#ffffff] py-24 px-10 text-center relative z-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${cinzel.className} text-4xl font-bold text-blue-900 mb-6`}
        >
          Our <span className="text-yellow-500">Services</span>
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We bring creativity, functionality, and elegance to every corner of
          your space.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
  key={index}
  whileHover={{
    y: -10,
    boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
  }}
  transition={{ type: "spring", stiffness: 200, damping: 10 }}
  className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
  style={{ height: "320px" }} // keep card size same
>
  {/* Background Image */}
  <Image
    src={service.icon}
    alt={service.title}
    fill
    className="object-cover group-hover:scale-105 transition duration-500"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

  {/* Content on top */}
  <div className="absolute bottom-20 left-5 right-5 text-left text-white">
    <h3 className={`${cinzel.className} text-2xl text-white  font-semibold mb-2`}
    >  

      {service.title}
    </h3>
    <p className="text-sm leading-relaxed">
      {service.description}
    </p>
  </div>
</motion.div>

          ))}
        </div>
      </section>

            {/* ================= WHAT WE OFFER ================= */}
      <section
        id="offer"
        className="bg-white py-12 px-8 text-center relative z-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${cinzel.className} text-4xl font-bold text-blue-900 mb-10`}
        >
          What <span className="text-yellow-500">We Offer</span>
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {/* Our Services */}
          <motion.div
            whileHover={{
              y: -10,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center mb-4">
             
              <h3
                className={`${cinzel.className} text-xl text-blue-900 font-semibold`}
              >
                Our Services
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li>Modular Kitchens</li>
              <li>Wardrobes & Storage</li>
              <li>Lighting & False Ceiling</li>
              <li>Flooring & Wall Finishes</li>
              <li>Civil and Electrical Work</li>
              <li>Complete Home Interior Solutions</li>
              <li>3d & 2d Design Services</li>
            </ul>
          </motion.div>

          {/* Technology & Materials */}
          <motion.div
            whileHover={{
              y: -10,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center mb-4">
             
              <h3
                className={`${cinzel.className} text-xl text-blue-900 font-semibold`}
              >
                Technology & Materials
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li>Moisture-resistant and termite-proof boards</li>
              <li>Soft-close hardware and precision fittings</li>
              <li>Eco-friendly paints and laminates</li>
              <li>Durable finishes for long-lasting beauty</li>
              <li>Smart space optimization techniques</li>
            </ul>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            whileHover={{
              y: -10,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between text-center"
          >
            <div>
              <h3
                className={`${cinzel.className} text-xl text-blue-900 font-semibold mb-4`}
              >
                Start Your Interior Journey
              </h3>
              <p className="text-gray-700 mb-8">
                Ready to bring your dream space to life? Our expert team is here
                to plan, design, and execute with precision.
              </p>
            </div>
            <motion.button
              onClick={() => setIsFormOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full shadow-md transition mx-auto"
            >
              Get Free Quote
            </motion.button>
          </motion.div>
        </div>
      </section>


      {/* ================= CATALOGUE ================= */}
      <section
        id="catalogue"
        className="bg-gray-50 py-24 px-10 text-center relative z-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${cinzel.className} text-4xl font-bold text-blue-900 mb-6`}
        >
          You Dream, <span className="text-yellow-500">We Deliver</span>
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-22">
          These aren't just designs; they're a glimpse into the lifestyle that's waiting for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[ 
            { src: "/Modernliving.jpeg", title: "Modern Living Room" },
            { src: "/kitchen.jpeg", title: "Luxury Kitchen" },
            { src: "/bedroom.jpeg", title: "Cozy Bedroom" },
            { src: "/commercial.jpeg", title: "Elegant Office" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              onClick={() => setLightboxImage(item.src)}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={500}
                height={350}
                className="object-cover w-full h-[300px] transform transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition">
                <h3
                  className={`${cinzel.className} text-white text-lg font-semibold absolute bottom-4 left-4`}
                >
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[999]"
          onClick={() => setLightboxImage(null)}
        >
          <Image
            src={lightboxImage}
            alt="Catalogue Preview"
            width={1000}
            height={700}
            className="rounded-xl shadow-2xl object-contain max-h-[90vh] w-auto"
          />
        </div>
      )}
            {/* ================= CONTACT US ================= */}
      <section
        id="contact"
        className="bg-white py-24 px-10 text-center relative z-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${cinzel.className} text-4xl font-bold text-blue-900 mb-6`}
        >
          Contact <span className="text-yellow-500">Us</span>
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Have questions or want to get started? We're here to help you bring your dream space to life.
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Details Card */}
          <motion.div
            whileHover={{
              y: -8,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-left"
          >
            <h3
              className={`${cinzel.className} text-2xl text-blue-900 font-semibold mb-4`}
            >
              Get in Touch
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              We're available to assist you with any inquiry regarding design,
              pricing, or planning your next project.
            </p>

            <div className="space-y-4">
              <p className="text-gray-800 text-lg">
                📞 <span className="font-semibold">+91 8605897892 / 8010575348</span>
              </p>
              <p className="text-gray-800 text-lg">
                📧 <span className="font-semibold">splendidspaces24@gmail.com</span>
              </p>
              <p className="text-gray-800 text-lg">
                📍 Pune, Maharashtra
              </p>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            whileHover={{
              y: -8,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <h3
              className={`${cinzel.className} text-2xl text-blue-900 font-semibold mb-6 text-center`}
            >
              Reach Out to Us
            </h3>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();

                await submitLead({
                  source: "Contact Us",
                  name,
                  email,
                  phone,
                  message,
                });

                // reset
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
              }}
            >
             <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
            />
             <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
            />

              <textarea
                rows={4}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
              />


              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Contact Now
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    <AnimatePresence>
  {showSuccess && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.10 }}
        className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-sm w-full"
      >
        {/* Tick */}
        <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className={`${cinzel.className} text-xl text-blue-900 font-semibold mb-2`}>
          Form Submitted!
        </h3>

        <p className="text-gray-600 mb-6">
          We’ll reach out to you soon.
        </p>

        <button
          onClick={() => setShowSuccess(false)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  

    </main>
  );
}
