'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectDetails: string;
}

export default function HireMe() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectDetails: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Sending your enquiry...');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast.dismiss(loadingToast);
      toast.success('Thanks for reaching out! I\'ll get back to you soon.', {
        duration: 5000,
        icon: '👋',
      });

      setIsOpen(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectDetails: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to send enquiry. Please try again.', {
        duration: 5000,
      });
    }
  };

  return (
    <section className="mb-16">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#fff',
            secondary: '#4285f4',
          },
          style: {
            background: '#4285f4',
          },
        },
        error: {
          iconTheme: {
            primary: '#fff',
            secondary: '#ff4444',
          },
          style: {
            background: '#ff4444',
          },
        },
        loading: {
          style: {
            background: '#666',
          },
        },
      }} />
      
      <h2 className="text-2xl font-bold mb-6">Want to Work Together?</h2>
      
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(true)}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
      >
        Get in Touch
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1a1a1a] p-8 rounded-xl max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Tell me about your project</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm mb-2">Company (optional)</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-sm mb-2">Project Details</label>
                <textarea
                  id="projectDetails"
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-700 focus:border-blue-500 focus:outline-none"
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
