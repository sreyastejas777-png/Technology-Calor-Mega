import SectionHeading from '../components/SectionHeading';

export default function Terms() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <SectionHeading eyebrow="Legal" title="Terms of Service" center={false} />
      <div className="space-y-6 text-primary/75 dark:text-paper/75 leading-relaxed">
        <p>
          By accessing this website, you agree to use it only for lawful purposes related to evaluating and
          purchasing CALOR MEGA industrial food drying equipment.
        </p>
        <p>
          Product specifications, images and pricing information are provided for reference and may be updated
          without prior notice. Final specifications are confirmed at the time of quotation.
        </p>
        <p>
          All content on this site, including text, images and branding, is the property of CALOR MEGA and may not
          be reproduced without written permission.
        </p>
        <p>
          CALOR MEGA is not liable for any indirect or consequential loss arising from the use of information on
          this website. For binding terms of sale, please refer to your signed purchase agreement.
        </p>
      </div>
    </section>
  );
}
