"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [focusedField, setFocusedField] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center !py-12 sm:!py-20 !px-4 sm:!px-6 bg-wine-red">
      <div className="w-full max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          // Gap between the whole text block and the form is handled in the paragraph below
        >
          {/* Heading */}
          <h2 
            className="!text-3xl sm:!text-4xl md:!text-5xl font-bold text-dutch-white !mb-5 sm:!mb-[30px]"
            style={{ marginBottom: '30px' }}
          > 
            Let's Connect <span className="text-dutch-white"></span>
          </h2>

          {/* Text Paragraph */}
          <p 
            className="!text-base sm:!text-xl text-dutch-white max-w-3xl mx-auto !mb-8 sm:!mb-[50px]"
            style={{ marginBottom: '50px' }}
          >
            Have a project in mind or want to discuss opportunities? 
            I'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div style={{ marginBottom: '20px' }} className="!mb-3 sm:!mb-5">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  style={{ paddingLeft: '20px', height: '50px' }}
                  className="w-full bg-[#5a1f26] text-dutch-white rounded-lg transition-all duration-300 focus:outline-none focus:bg-[#4a1a21] !pl-4 sm:!pl-5 !h-[42px] sm:!h-[50px]"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '20px' }} className="!mb-3 sm:!mb-5">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  style={{ paddingLeft: '20px', height: '50px' }}
                  className="w-full bg-[#5a1f26] text-dutch-white rounded-lg transition-all duration-300 focus:outline-none focus:bg-[#4a1a21] !pl-4 sm:!pl-5 !h-[42px] sm:!h-[50px]"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div style={{ marginBottom: '15px' }} className="!mb-3 sm:!mb-[15px]">
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  style={{ paddingLeft: '20px', height: '150px', paddingTop: '12px' }}
                  className="w-full bg-[#5a1f26] text-dutch-white rounded-lg transition-all duration-300 focus:outline-none resize-vertical focus:bg-[#4a1a21] !pl-4 sm:!pl-5 !pt-3 sm:!pt-[12px] !h-[120px] sm:!h-[150px]"
                  placeholder="Your message..."
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status.type === 'loading'}
              style={{ paddingLeft: '20px', height: '50px' }}
              className={`w-full rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 !pl-4 sm:!pl-5 !h-[42px] sm:!h-[50px] ${
                status.type === 'loading'
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[hsl(38,18%,62%)] text-wine-red hover:bg-[hsl(38,18%,70%)] hover:shadow-lg'
              }`}
              whileHover={status.type !== 'loading' ? { y: -2 } : {}}
              whileTap={status.type !== 'loading' ? { scale: 0.98 } : {}}
            >
              {status.type === 'loading' ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {status.message && (
                <motion.div
                  className={`mt-6 p-4 rounded-lg flex items-center space-x-3 !mt-4 sm:!mt-6 !p-3 sm:!p-4 !space-x-2 sm:!space-x-3 !text-sm sm:!text-base ${
                    status.type === 'success'
                      ? 'bg-green-900/20 border border-green-600/30 text-green-400'
                      : status.type === 'error'
                      ? 'bg-red-900/20 border border-red-600/30 text-red-400'
                      : 'bg-blue-900/20 border border-blue-600/30 text-blue-400'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {status.type === 'success' ? (
                    <CheckCircle size={20} />
                  ) : status.type === 'error' ? (
                    <AlertCircle size={20} />
                  ) : (
                    <Loader className="animate-spin" size={20} />
                  )}
                  <span className="font-medium">{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}