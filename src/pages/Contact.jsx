import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const initialForm = { name: '', email: '', phone: '', business: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
  };

  return (
    <section className="mx-auto max-w-[1400px] w-[90%] px-5 py-10 md:px-8">
      <SectionHeading
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Have a question about a machine or your specific produce? Our team is ready to help."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="space-y-5 rounded-3xl bg-white dark:bg-white/5 p-8 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:text-accent">
                <FaMapMarkerAlt />
              </span>
              <div>
                <p className="font-semibold text-primary dark:text-paper">Address</p>
                <p className="text-sm text-primary/65 dark:text-paper/65">Industrial Estate, Kochi, Kerala, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:text-accent">
                <FaPhoneAlt />
              </span>
              <div>
                <p className="font-semibold text-primary dark:text-paper">Phone</p>
                <a href="tel:+919999999999" className="text-sm text-primary/65 dark:text-paper/65 hover:text-accent">
                  +91 99999 99999
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:text-accent">
                <FaEnvelope />
              </span>
              <div>
                <p className="font-semibold text-primary dark:text-paper">Email</p>
                <a href="mailto:info@calormega.com" className="text-sm text-primary/65 dark:text-paper/65 hover:text-accent">
                  info@calormega.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:text-accent">
                <FaClock />
              </span>
              <div>
                <p className="font-semibold text-primary dark:text-paper">Working Hours</p>
                <p className="text-sm text-primary/65 dark:text-paper/65">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl shadow-soft">
            <iframe
              title="CALOR MEGA location"
              src="https://www.google.com/maps?q=Kochi,Kerala,India&output=embed"
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="rounded-3xl bg-white dark:bg-white/5 p-8 shadow-soft">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FaCheckCircle className="mb-4 text-5xl text-success" />
                <p className="text-lg font-bold text-primary dark:text-paper">Message Sent!</p>
                <p className="mt-2 text-sm text-primary/65 dark:text-paper/65">
                  Thank you for reaching out. Our team will contact you shortly.
                </p>
                <Button variant="outline" className="mt-6" onClick={handleReset}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Business Name"
                    className="rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your Message"
                  className="w-full rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="flex flex-wrap gap-4">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setForm(initialForm)}>
                    Reset
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}