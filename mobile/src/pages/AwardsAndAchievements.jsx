import { motion } from 'framer-motion';
import { Award, Trophy, ShieldCheck, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function AwardsAndAchievements() {
  return (
    <div className="min-h-[75vh] py-10 px-4">
      <div className="mx-auto max-w-md">
        <SectionHeading
          eyebrow="Recognition & Excellence"
          title="Awards & Achievements"
          subtitle="Celebrating our technological breakthroughs, engineering distinctions, and global industry honors."
          className="mb-8 text-center"
        />

        {/* Empty Content Shell - Ready for future content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-dashed border-border bg-surface/50 p-8 text-center backdrop-blur-md shadow-sm"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Trophy className="h-8 w-8 stroke-[1.5]" />
          </div>

          <h3 className="font-display text-xl font-bold text-primary-text mb-2">
            Honors & Accolades
          </h3>
          
          <p className="text-xs text-secondary-text leading-relaxed mb-6">
            Official accreditations, international patents, and agricultural technology awards will be published here shortly.
          </p>

          <div className="flex flex-col gap-2 text-xs text-secondary-text font-medium text-left">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg border border-border">
              <Award className="w-4 h-4 text-accent shrink-0" />
              <span>Innovation Awards</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg border border-border">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Quality Certifications</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg border border-border">
              <Sparkles className="w-4 h-4 text-accent shrink-0" />
              <span>Industry Milestones</span>
            </div>
          </div>

          {/* FUTURE_CONTENT_CONTAINER */}
        </motion.div>
      </div>
    </div>
  );
}
