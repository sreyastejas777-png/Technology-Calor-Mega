import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaFileInvoiceDollar } from 'react-icons/fa';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const initialForm = {
  name: '',
  company: '',
  phone: '',
  email: '',
  capacity: '',
  purpose: '',
  message: '',
};

export default function GetQuote() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <SectionHeading
        eyebrow="Let's Talk Business"
        title="Get a Quote"
        subtitle="Tell us about your operation and we'll recommend the right CALOR MEGA machine for your needs."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-white dark:bg-white/5 p-5 md:p-6 shadow-soft"
      >
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FaCheckCircle className="mb-4 text-5xl text-success" />
            <p className="text-lg font-bold text-primary dark:text-paper">Quote Request Received!</p>
            <p className="mt-2 max-w-sm text-sm text-primary/65 dark:text-paper/65">
              Our team will review your requirements and get back to you within one business day.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
              Submit Another Request
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
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
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
              <select
                required
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                className="rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Machine Capacity Needed</option>
                <option value="small">Small Scale (20 - 50 kg)</option>
                <option value="medium">Medium Scale (100 - 250 kg)</option>
                <option value="industrial">Industrial (500 - 1000 kg)</option>
                <option value="commercial">Commercial (1000+ kg)</option>
              </select>
              <input
                required
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                placeholder="Purpose / Produce Type"
                className="rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Additional Details"
              className="w-full rounded-xl border border-primary/10 dark:border-white/10 bg-primary/[0.03] dark:bg-white/5 px-4 py-3 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
            />
            <Button type="submit" variant="accent" icon={FaFileInvoiceDollar} className="w-full justify-center">
              Submit Quote Request
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
