import LegalPage from "./LegalPage";

export default function TermsOfUse() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="June 2026"
      intro={
        <p>
          These Terms of Use govern your access to and use of
          NationalConsumerReview.com. By using this site, you agree to these
          terms. If you do not agree, please discontinue use of the site.
        </p>
      }
      sections={[
        {
          heading: "Use of the Site",
          body: (
            <p>
              You may use this site for personal, non-commercial purposes. You
              agree not to misuse the site, interfere with its operation, attempt
              to access it through unauthorized means, or use it in any way that
              violates applicable law.
            </p>
          ),
        },
        {
          heading: "Editorial Content and Opinions",
          body: (
            <p>
              Our reviews and rankings reflect our own testing, research, and
              editorial opinions at the time of publication. Product
              specifications, pricing, and availability change frequently, and we
              cannot guarantee that all information is current or error-free.
              Always confirm details on the official product page before
              purchasing.
            </p>
          ),
        },
        {
          heading: "No Professional Advice",
          body: (
            <p>
              Content on this site is provided for general informational purposes
              only and is not a substitute for professional advice. Follow all
              manufacturer instructions and safety guidance for any product you
              purchase.
            </p>
          ),
        },
        {
          heading: "Intellectual Property",
          body: (
            <p>
              All content on this site, including text, graphics, logos, and
              layout, is the property of National Consumer Review or its
              licensors and is protected by applicable intellectual property
              laws. You may not reproduce or redistribute our content without
              prior written permission.
            </p>
          ),
        },
        {
          heading: "Affiliate Relationships",
          body: (
            <p>
              This site participates in affiliate programs and may earn
              commissions from qualifying purchases made through our links. See
              our Affiliate Disclosure for details. These relationships do not
              affect the independence of our editorial rankings.
            </p>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <p>
              To the fullest extent permitted by law, National Consumer Review is
              not liable for any direct, indirect, incidental, or consequential
              damages arising from your use of the site or reliance on its
              content. The site is provided on an "as is" and "as available"
              basis.
            </p>
          ),
        },
        {
          heading: "Changes to These Terms",
          body: (
            <p>
              We may revise these Terms of Use at any time. Continued use of the
              site after changes are posted constitutes acceptance of the updated
              terms.
            </p>
          ),
        },
      ]}
    />
  );
}
