import LegalPage from "./LegalPage";

export default function AffiliateDisclosure() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      updated="June 2026"
      intro={
        <p>
          National Consumer Review believes in full transparency with our
          readers. This page explains how we fund our independent testing and how
          our affiliate relationships work.
        </p>
      }
      sections={[
        {
          heading: "How We Make Money",
          body: (
            <p>
              Some of the links on this site are affiliate links. If you click
              one of these links and make a purchase, we may earn a commission at
              no additional cost to you. These commissions help us buy the
              products we test, cover the cost of running our tests, and keep our
              content free to read.
            </p>
          ),
        },
        {
          heading: "Our Editorial Independence",
          body: (
            <p>
              Our rankings and recommendations are based on hands-on testing,
              research, and editorial judgment — never on commission rates. A
              product's placement in our rankings is never sold, and earning a
              commission does not influence where a product lands or what we say
              about it. If a product underperforms, we say so regardless of any
              affiliate relationship.
            </p>
          ),
        },
        {
          heading: "Amazon Associates",
          body: (
            <p>
              As an Amazon Associate, we may earn from qualifying purchases.
              Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or
              its affiliates.
            </p>
          ),
        },
        {
          heading: "Pricing and Availability",
          body: (
            <p>
              Prices, discounts, and availability shown on this site are accurate
              to the best of our knowledge at the time of publication but can
              change without notice. Always confirm the current price and terms
              on the retailer's or manufacturer's official page before buying.
            </p>
          ),
        },
        {
          heading: "Questions",
          body: (
            <p>
              If you have any questions about our affiliate relationships or how
              we test products, reach out to us at
              hello@nationalconsumerreview.com.
            </p>
          ),
        },
      ]}
    />
  );
}
