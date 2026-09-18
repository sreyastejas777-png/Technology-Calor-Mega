import { motion } from 'framer-motion';
import { Award, Trophy, ShieldCheck, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function AwardsAndAchievements() {
  return (
    <div className="min-h-[75vh] py-12 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Recognition & Excellence"
          title="Awards and Achievements"
          subtitle="Celebrating our technological breakthroughs, engineering distinctions, patent recognitions, and global industry honors."
          className="mb-12 max-w-3xl mx-auto text-center"
        />

        {/* Empty Content Shell - Ready for future awards & achievements data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-4xl rounded-3xl border border-dashed border-primary/20 dark:border-white/20 bg-white/40 dark:bg-white/[0.02] p-12 md:p-16 text-center backdrop-blur-md shadow-sm"
        >
          {/* Subtle decorative badges */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-inner">
            <Trophy className="h-10 w-10 stroke-[1.5]" />
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary dark:text-paper mb-3">
            Honors & Accolades
          </h3>
          
          <p className="mx-auto max-w-lg text-sm sm:text-base text-secondary-text leading-relaxed mb-8">
            This section will feature our official accreditations, international patents, and agricultural technology awards. Content will be added here shortly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-primary/60 dark:text-paper/60 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Award className="w-4 h-4 text-accent" /> Innovation Awards
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <ShieldCheck className="w-4 h-4 text-accent" /> Quality Certifications
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Sparkles className="w-4 h-4 text-accent" /> Industry Milestones
            </span>
          </div>

          {/* FUTURE_CONTENT_CONTAINER: Future awards grid or timeline components will be injected here */}
        </motion.div>
      </div>
    </div>
  );
}
