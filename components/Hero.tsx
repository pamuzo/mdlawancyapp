"use client";
import { motion } from "framer-motion";
import Image from "next/image";

function Hero() {
  return (
    <section>
      <div className="max-w-7xl mx-auto  flex flex-col-reverse md:flex-row items-center gap-2">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Custom Clothing, Gift Items, and Personalized Apparel
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            We bring your ideas to life with high-quality printing solutions
            tailored to meet your unique needs.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <a
              href="#"
              className="bg-[#00425a] text-white px-6 py-3 rounded-md font-medium hover:bg-[#003144] transition-colors duration-300"
            >
              Learn More
            </a>
            <a
              href="#"
              className="border border-[#00425a] text-[#00425a] px-6 py-3 rounded-md font-medium hover:bg-[#f0f4f8] transition-colors duration-300"
            >
              Services
            </a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/heropix1.png"
            alt="Hero"
            width={500}
            height={500}
            className=" object-contain drop-shadow-lg rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
