import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';
import Newsletter from '../components/Newsletter';
import { applications } from '../data/applications';

export default function Applications() {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <SectionHeading
        eyebrow="One Machine, Endless Produce"
        title="Applications"
        subtitle="CALOR MEGA dryers are trusted across fruit, vegetable, spice, fish and medicinal plant processing."
      />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {applications.map((app, i) => (
          <ApplicationCard key={app.title} application={app} index={i} onSelect={setSelectedApp} />
        ))}
      </div>
      <div className="mt-20">
        <Newsletter />
      </div>

      <ApplicationModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onSelectRelated={setSelectedApp}
      />
    </section>
  );
}
