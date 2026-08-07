import SectionHeading from '../components/SectionHeading';

export default function PrivacyPolicy() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" center={false} />
      <div className="space-y-6 text-primary/75 dark:text-paper/75 leading-relaxed">
        <p>
          CALOR MEGA respects your privacy. Information submitted through our contact, quote and newsletter forms —
          including your name, email, phone number and business details — is used solely to respond to your inquiry
          and provide relevant product information.
        </p>
        <p>
          We do not sell or share your personal information with third parties for marketing purposes. Data is
          retained only as long as necessary to fulfill your request and comply with applicable regulations.
        </p>
        <p>
          You may request access to, correction of, or deletion of your personal data at any time by contacting us
          at info@calormega.com.
        </p>
        <p>
          This site may use cookies to improve browsing experience and remember preferences such as your theme
          setting. No sensitive personal data is stored in cookies.
        </p>
      </div>
    </section>
  );
}
