export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">National Consumer Review</div>
          <div className="footer-copy">
            National Consumer Review publishes general educational buyer's
            guides for
            pet owners. This page is not veterinary advice and does not
            diagnose, treat, cure, or prevent disease. Always discuss new
            supplements with your veterinarian, particularly if your dog takes
            medications or has an existing health condition.
            <br />
            <br />
            <strong style={{ color: "#eef2f0" }}>
              Affiliate disclosure:
            </strong>{" "}
            We may receive compensation when readers purchase through product
            links on this page.
          </div>
        </div>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms</a>
          <a href="/affiliate-disclosure">Affiliate Disclosure</a>
        </div>
      </div>
      <div className="copyright">
        © 2026 NationalConsumerReview.com. All rights reserved. This page is an
        advertorial and general educational content, not veterinary advice.
      </div>
    </footer>
  );
}
