import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';
import { workingProcess } from '../data/workingProcess';

export default function WorkingProcess() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <SectionHeading
        eyebrow="Step by Step"
        title="Working Process"
        subtitle="From fresh harvest to shelf-stable produce — here is the CALOR MEGA drying journey."
      />

      <div className="flex flex-col items-center gap-2 lg:hidden">
        {workingProcess.map((step, i) => (
          <div key={step.title} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="w-64 rounded-2xl bg-white dark:bg-white/5 p-6 text-center shadow-soft"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-xl text-white">
                <step.icon />
              </div>
              <p className="font-bold text-primary dark:text-paper">{step.title}</p>
              <p className="mt-1 text-xs text-primary/60 dark:text-paper/60">{step.description}</p>
            </motion.div>
            {i < workingProcess.length - 1 && <FaArrowDown className="my-2 text-accent" />}
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto pb-6 lg:block">
        <div className="flex min-w-max items-center gap-3 px-4">
          {workingProcess.map((step, i) => (
            <div key={step.title} className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="flex w-48 flex-col items-center rounded-2xl bg-white dark:bg-white/5 p-6 text-center shadow-soft"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-2xl text-white">
                  <step.icon />
                </div>
                <p className="font-bold text-primary dark:text-paper">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-primary/60 dark:text-paper/60">{step.description}</p>
              </motion.div>
              {i < workingProcess.length - 1 && <FaArrowRight className="shrink-0 text-xl text-accent" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
