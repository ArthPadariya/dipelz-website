"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-[#f8f4ef]">

      {/* ================= HERO SECTION ================= */}
      <section className="py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-[#3e2c23]"
        >
          About Dipelz
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Where tradition meets innovation — delivering authentic Indian flavours
          crafted for modern lifestyles.
        </motion.p>
      </section>



      {/* ================= THE DIPELZ DIFFERENCE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[450px]"
        >
          <Image
            src="/banner1.jpeg"
            alt="Dipelz Products"
            fill
            className="object-cover rounded-2xl shadow-xl"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold text-[#3e2c23] mb-6">
            The Dipelz Difference
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            At Dipelz, we believe authentic taste should never be compromised.
            Our recipes are inspired by traditional Indian kitchens and prepared
            using high-quality ingredients combined with advanced preservation
            techniques to retain freshness and nutrition.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Every product reflects our passion for purity, flavour, and
            convenience — bringing you the comfort of home, wherever you are.
          </p>
        </motion.div>

      </section>



      {/* ================= OUR STORY ================= */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold text-[#3e2c23] mb-8"
        >
          Our Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-600 leading-relaxed text-lg"
        >
          Dipelz was founded with a simple vision — to bridge the gap between
          heritage cooking and today’s fast-paced lifestyle. We saw a need for
          wholesome meals that are easy to prepare yet rich in authenticity.
          Through careful sourcing and thoughtful craftsmanship, we created a
          range of ready-to-eat options that celebrate Indian flavours while
          supporting modern convenience.
        </motion.p>

      </section>



      {/* ================= OUR VISION & COMMITMENT ================= */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold text-center text-[#3e2c23] mb-16"
          >
            What Drives Us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12 text-center">

            {/* GOAL 1 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 text-[#3e2c23]">
                Authentic Taste
              </h3>
              <p className="text-gray-600">
                Rooted in traditional recipes, each meal captures the richness
                of Indian flavours with uncompromised authenticity.
              </p>
            </motion.div>

            {/* GOAL 2 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 text-[#3e2c23]">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                We use carefully selected ingredients with zero artificial
                preservatives to ensure purity and excellence.
              </p>
            </motion.div>

            {/* GOAL 3 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 text-[#3e2c23]">
                Modern Convenience
              </h3>
              <p className="text-gray-600">
                Designed for busy lifestyles — delicious, nutritious meals
                ready within minutes.
              </p>
            </motion.div>

          </div>
        </div>
      </section>



    </div>
  );
}