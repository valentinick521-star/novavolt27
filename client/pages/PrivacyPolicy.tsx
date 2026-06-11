import LegalPage from "./LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      intro={
        <p>
          This Privacy Policy explains how National Consumer Review
          ("we," "us," or "our") collects, uses, and protects information when
          you visit NationalConsumerReview.com. By using this site, you consent
          to the practices described below.
        </p>
      }
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>
                We collect limited information to operate and improve the site.
                This may include technical data your browser sends
                automatically — such as your IP address, device type, browser
                version, and the pages you visit — as well as any information
                you choose to provide directly.
              </p>
              <p>
                We do not require you to create an account to read our reviews.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies and Analytics",
          body: (
            <p>
              We use cookies and similar technologies to understand how visitors
              use the site, measure the performance of our content, and remember
              basic preferences. You can disable cookies in your browser
              settings, though some parts of the site may not function as
              intended without them.
            </p>
          ),
        },
        {
          heading: "How We Use Information",
          body: (
            <p>
              We use the information we collect to deliver and maintain the site,
              analyze traffic and engagement, improve our editorial content, and
              detect or prevent abuse. We do not sell your personal information.
            </p>
          ),
        },
        {
          heading: "Third-Party Links",
          body: (
            <p>
              Our pages contain links to third-party retailers and manufacturer
              offer pages. When you click these links, the destination site's
              own privacy policy governs how your information is handled. We are
              not responsible for the privacy practices of external sites.
            </p>
          ),
        },
        {
          heading: "Data Retention and Security",
          body: (
            <p>
              We retain information only as long as necessary for the purposes
              described in this policy and apply reasonable safeguards to protect
              it. No method of transmission over the internet is completely
              secure, so we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          heading: "Your Choices",
          body: (
            <p>
              Depending on where you live, you may have the right to access,
              correct, or delete personal information we hold about you. To make
              a request, contact us at privacy@nationalconsumerreview.com.
            </p>
          ),
        },
        {
          heading: "Changes to This Policy",
          body: (
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with a revised "Last updated" date.
            </p>
          ),
        },
      ]}
    />
  );
}
