'use client';

import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import SocialLinks from '../components/SocialLinks';
import Education from '../components/Education';
import Footer from '../components/Footer';
import HireMe from '../components/HireMe';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Mobile Layout (visible below 1024px) */}
      <div className="lg:hidden">
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 max-w-screen-sm mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Header />
            <div className="mt-6">
              <SocialLinks/>
            </div>
            <div className="mt-6">
              <HireMe />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}><About /></motion.div>
          <motion.div variants={itemVariants}><Skills /></motion.div>
          <motion.div variants={itemVariants}><Experience /></motion.div>
          <motion.div variants={itemVariants}><Education /></motion.div>
          <motion.div variants={itemVariants}><Projects /></motion.div>
        </motion.main>
        <Footer />
      </div>

      {/* Desktop Layout (visible above 1024px) */}
      <div className="hidden lg:flex flex-row">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:fixed lg:w-2/5 h-screen p-8 lg:p-12 lg:pl-[10%] flex flex-col justify-between min-w-[300px] max-w-[800px]"
        >
          <div>
            <Header />
            <div className="mt-6">
              <SocialLinks />
            </div>
            <div className="mt-6">
              <HireMe />
            </div>
          </div>
        </motion.div>
        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:ml-[40%] w-full lg:w-3/5 min-h-screen min-w-[300px] max-w-[1200px] mx-auto"
        >
          <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 lg:p-12 lg:pr-[10%]"
          >
            <motion.div variants={itemVariants}><About /></motion.div>
            <motion.div variants={itemVariants}><Skills /></motion.div>
            <motion.div variants={itemVariants}><Experience /></motion.div>
            <motion.div variants={itemVariants}><Education /></motion.div>
            <motion.div variants={itemVariants}><Projects /></motion.div>
          </motion.main>
          <Footer />
        </motion.div>
      </div>
    </div>
  );
}