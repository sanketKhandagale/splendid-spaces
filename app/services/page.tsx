"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

export default function ServicesPage() {
  const services = [
    {
      title: "Modular Kitchens",
      description:
        "Elegant and space-efficient kitchen designs tailored to your cooking style and storage needs.",
      icon: "/icons/kitchen.png",
    },
    {
      title: "Living Room Interiors",
      description:
        "Transform your living room into a stylish and comfortable space perfect for gatherings and relaxation.",
      icon: "/icons/living-room.png",
    },
    {
      title: "Bedroom Designs",
      description:
        "Modern and cozy bedrooms designed to bring you comfort, peace, and luxury every night.",
      icon: "/icons/bedroom.png",
    },
    {
      title: "Office Spaces",
      description:
        "Smart and inspiring office interiors that boost productivity and creativity.",
      icon: "/icons/office.png",
    },
    {
      title: "Renovation & Remodeling",
      description:
        "Give your home or workspace a fresh new look with expert remodeling services.",
      icon: "/icons/renovation.png",
    },
    {
      title: "Custom Furniture",
      description:
        "Bespoke furniture designed and built to match your space, style, and comfort.",
      icon: "/icons/furniture.png",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header
        className="flex justify-between items-center px-10 py-4 bg-cover bg-center shadow-sm"
        style={{ backgroundImage: "url('/header-bg.png')" }}
      >
        <div className="flex items-end space-x-3">
          <Image
            src="/logo (1).png"
            alt="Splendid Spaces Logo"
            width={60}
            height={60}
            className="rounded-full relative top-2"
          />
          <h1
            className={`${cinzel.className} text-2xl font-bold text-white tracking-wide`}
          >
            Splendid <span className="text-yellow-400">Spaces</span>
          </h1>
        </div>

        <nav className="space-x-8">
          <a href="/" className="text-white hover:text-yellow-400 transition">
            Home
          </a>
          <a href="/services" className="text-yellow-400 font-semibold">
            Services
          </a>
          <a href="#" className="text-white hover:text-yellow-400 transition">
            Projects
          </a>
          <a href="#" className="text-white hover:text-yellow-400 transition">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Title */}
      <section className="text-center py-16 bg-gray-50">
        <h2
          className={`${cinzel.className} text-4xl font-bold text-blue-900 mb-3`}
        >
          Our <span className="text-yellow-500">Services</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We bring creativity, functionality, and elegance to every corner of
          your space.
        </p>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 pb-20">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100"
          >
            <Image
              src={service.icon}
              alt={service.title}
              width={70}
              height={70}
              className="mx-auto mb-4"
            />
            <h3
              className={`${cinzel.className} text-xl text-blue-900 font-semibold mb-2`}
            >
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-blue-900 text-white">
        <h3 className={`${cinzel.className} text-2xl mb-3`}>
          Let’s design your dream space together
        </h3>
        <a
          href="#"
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full text-white font-semibold inline-block transition"
        >
          Book a Consultation
        </a>
      </section>
    </main>
  );
}
