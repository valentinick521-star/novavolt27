import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist", "spa");
const indexPath = path.join(distDir, "index.html");

let indexHtml = fs.readFileSync(indexPath, "utf8");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateFooterLink(footer, label, href) {
  const re = new RegExp(`<a\\b([^>]*)>\\s*${escapeRegex(label)}\\s*<\\/a>`, "i");
  if (!re.test(footer)) {
    throw new Error(`Could not find footer link: ${label}`);
  }
  return footer.replace(re, (_match, attrs) => {
    let nextAttrs = attrs;
    if (/\\bhref\\s*=/.test(nextAttrs)) {
      nextAttrs = nextAttrs.replace(/\\bhref\\s*=\\s*["'][^"']*["']/i, `href="${href}"`);
    } else {
      nextAttrs = ` href="${href}"${nextAttrs}`;
    }
    return `<a${nextAttrs}>${label}</a>`;
  });
}

const footerMatch = indexHtml.match(/<footer\\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>[\\s\\S]*?<\\/footer>/i);
if (!footerMatch) {
  throw new Error("Could not find site footer");
}

let footer = footerMatch[0];
footer = updateFooterLink(footer, "Privacy Policy", "/privacy-policy/");
footer = updateFooterLink(footer, "Terms", "/terms/");
footer = updateFooterLink(footer, "Affiliate Disclosure", "/affiliate-disclosure/");
footer = updateFooterLink(footer, "Contact", "mailto:nickv_3@outlook.com");
indexHtml = indexHtml.replace(footerMatch[0], footer);
fs.writeFileSync(indexPath, indexHtml);

const header = indexHtml.match(/<header\\b[^>]*class=["'][^"']*site-header[^"']*["'][^>]*>[\\s\\S]*?<\\/header>/i)?.[0] || "";
const finalFooter = indexHtml.match(/<footer\\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>[\\s\\S]*?<\\/footer>/i)?.[0] || footer;
const head = indexHtml.match(/<head>[\\s\\S]*?<\\/head>/i)?.[0] || "";
const sharedStyles = [...head.matchAll(/<style\\b[^>]*>[\\s\\S]*?<\\/style>/gi)].map((m) => m[0]).join("\n");
const sharedHeadScripts = [...head.matchAll(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi)].map((m) => m[0]).join("\n");

const LEGAL_CSS = `
<style data-ncr-legal-pages>
.legal-page{max-width:780px;margin:0 auto;padding:44px 24px 72px;color:#282828;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.72;}
.legal-page__eyebrow{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1d5f50;margin-bottom:10px;}
.legal-page h1{font-size:clamp(36px,5vw,50px);line-height:1.08;letter-spacing:-.035em;margin:0 0 10px;color:#111;}
.legal-page .effective-date{color:#777;font-size:13px;margin:0 0 32px;}
.legal-page h2{font-size:27px;line-height:1.2;letter-spacing:-.02em;margin:38px 0 12px;color:#171717;}
.legal-page h3{font-size:20px;line-height:1.3;margin:27px 0 9px;color:#202020;}
.legal-page p{margin:0 0 17px;}
.legal-page ul{margin:0 0 19px;padding-left:24px;}
.legal-page li{margin:7px 0;}
.legal-page a{color:#1456b8;text-underline-offset:2px;}
.legal-page .legal-note{background:#f4f5f4;border:1px solid #e1e3e2;border-radius:6px;padding:18px 20px;margin:24px 0;}
.legal-page .contact-box{margin-top:34px;padding:20px;background:#f7f7f5;border:1px solid #e3e3e3;border-radius:6px;}
.legal-page strong{color:#171717;}
@media(max-width:600px){.legal-page{padding:32px 20px 58px;font-size:16px}.legal-page h2{font-size:24px;margin-top:32px}}
</style>`;

const EFFECTIVE_DATE = "August 10, 2026";
const EMAIL = "nickv_3@outlook.com";

function pageShell({ title, description, canonical, content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} | National Consumer Review</title>
<meta name="description" content="${description}" />
<meta name="robots" content="index,follow" />
<link rel="canonical" href="${canonical}" />
${sharedStyles}
${LEGAL_CSS}
${sharedHeadScripts}
</head>
<body>
${header}
${content}
${finalFooter}
</body>
</html>`;
}

const privacyContent = `<main class="legal-page">
<div class="legal-page__eyebrow">National Consumer Review</div>
<h1>Privacy Policy</h1>
<p class="effective-date">Effective date: ${EFFECTIVE_DATE}</p>
<p>This Privacy Policy explains how National Consumer Review ("National Consumer Review," "we," "us," or "our") handles information when you visit nationalconsumerreview.com and pages that link to this policy (the "Site"). The Site is intended primarily for users in the United States.</p>
<p>National Consumer Review is an informational and affiliate-content website. We do not currently offer user accounts, direct checkout, comments, or on-site email signup forms. We do, however, use analytics, measurement, session-insight, and affiliate-attribution technologies that may collect information automatically when you use the Site.</p>

<h2>1. Information We Collect</h2>
<h3>Information collected automatically</h3>
<p>When you use the Site, we and service providers may automatically receive information such as:</p>
<ul>
<li>IP address and approximate location derived from it;</li>
<li>browser type, operating system, device type, screen or viewport information, and language settings;</li>
<li>pages viewed, referring and exit pages, dates and times of visits, and time spent on pages;</li>
<li>clicks, scrolling, navigation patterns, and other interactions with the Site;</li>
<li>advertising, campaign, affiliate, click, or attribution identifiers contained in URLs or cookies; and</li>
<li>diagnostic, security, and performance information.</li>
</ul>
<h3>Information you choose to send us</h3>
<p>If you contact us by email, we receive the information you provide, such as your email address, the contents of your message, and any information you voluntarily include. We use that information to respond to you and maintain appropriate business records.</p>

<h2>2. Cookies and Similar Technologies</h2>
<p>The Site may use cookies, pixels, tags, local storage, URL parameters, and similar technologies for analytics, measurement, security, site performance, and affiliate attribution. These technologies can recognize a browser or device, measure visits and interactions, or help determine whether a visit or purchase should be attributed to a referral from National Consumer Review.</p>
<p>Your browser may allow you to block or delete cookies. Doing so may affect certain measurement or attribution functions, but the core informational content of the Site should remain available.</p>

<h2>3. Analytics and Measurement Services</h2>
<p>We use Google Analytics and related Google measurement technology to understand Site traffic and usage. Google may collect and process information about your use of the Site as described in Google's own privacy materials.</p>
<p>We also use Microsoft Clarity to better understand how visitors interact with the Site, including through interaction analytics and session-insight features. Microsoft may process device and usage information in connection with that service.</p>
<p>You can review the privacy practices of these providers at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a> and <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft's Privacy Statement</a>.</p>

<h2>4. Affiliate and Attribution Tracking</h2>
<p>National Consumer Review contains links to third-party merchants, brands, retailers, affiliate networks, and offer platforms. Some of these links use tracking parameters, cookies, or similar identifiers so that a merchant or affiliate network can determine that a visitor was referred by our Site and, where applicable, credit us with a commission.</p>
<p>Our current affiliate and attribution infrastructure may include services such as GiddyUp, Everflow, merchant tracking systems, and comparable technologies used by offers we promote. When you click an affiliate link, you leave our Site and the third party's own privacy policy and terms apply.</p>

<h2>5. How We Use Information</h2>
<p>We may use information collected through the Site to:</p>
<ul>
<li>operate, maintain, secure, and improve the Site;</li>
<li>understand traffic, readership, and how visitors use our content;</li>
<li>measure the performance of pages, links, offers, and marketing campaigns;</li>
<li>attribute referrals and affiliate transactions;</li>
<li>detect fraud, abuse, security incidents, or technical problems;</li>
<li>respond to messages and requests; and</li>
<li>comply with legal obligations and enforce our agreements.</li>
</ul>

<h2>6. How Information May Be Disclosed</h2>
<p>We may disclose information to analytics, hosting, security, technology, affiliate, advertising, and measurement providers that perform services for us or participate in referral attribution. We may also disclose information when reasonably necessary to comply with law, protect rights or safety, investigate misuse, or in connection with a merger, sale, financing, reorganization, or transfer of Site assets.</p>
<p>We do not operate a business in which we sell lists of visitor personal information for money. However, some disclosures involving advertising, analytics, or affiliate technologies may be treated as a "sale," "sharing," or targeted-advertising activity under certain U.S. state privacy laws, depending on the law, the technology involved, and whether that law applies to National Consumer Review.</p>

<h2>7. Third-Party Websites</h2>
<p>The Site links to websites we do not control. Those third parties determine their own data practices. National Consumer Review is not responsible for the privacy, security, content, or practices of third-party websites. Review the privacy policy of any third-party website before providing information or completing a transaction there.</p>

<h2>8. Data Retention and Security</h2>
<p>We retain information for as long as reasonably necessary for the purposes described in this policy, to maintain business records, resolve disputes, enforce agreements, or meet legal obligations. Third-party providers maintain information according to their own retention practices.</p>
<p>We use reasonable administrative and technical measures intended to protect information. No internet transmission, website, or storage system can be guaranteed to be completely secure, and we cannot guarantee absolute security.</p>

<h2>9. U.S. State Privacy Rights</h2>
<p>Depending on where you live, the nature of the information involved, and whether a particular state privacy law applies to National Consumer Review, you may have rights concerning personal information. These can include rights to request access, confirmation, correction, deletion, or a portable copy of certain information, and in some circumstances rights to opt out of certain targeted advertising, sale, or sharing activities.</p>
<p>To submit a privacy request, email <a href="mailto:${EMAIL}">${EMAIL}</a> with the subject line "Privacy Request" and describe the request and the state in which you reside. We may need to take reasonable steps to verify your request. We will not discriminate against you for exercising a privacy right that applies to you.</p>
<p>Because privacy laws differ by state and contain applicability thresholds and exceptions, not every listed right applies to every visitor or to National Consumer Review in every circumstance.</p>

<h2>10. Children's Privacy</h2>
<p>The Site is intended for adults and is not directed to children under 13. We do not knowingly seek to collect personal information from children under 13. If you believe a child has provided personal information to us, contact us so we can evaluate and address the issue.</p>

<h2>11. Do Not Track</h2>
<p>Some browsers offer a "Do Not Track" setting. Because there is not a single universally adopted standard for responding to that signal, the Site may not respond to ordinary Do Not Track signals. Where an applicable law requires National Consumer Review to honor a legally recognized privacy preference or opt-out mechanism, we will handle applicable requests as required by that law.</p>

<h2>12. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date. Your continued use of the Site after an update means the updated policy will govern information handled after the change to the extent permitted by law.</p>

<div class="contact-box"><strong>Contact</strong><br />Questions or privacy requests may be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</div>
</main>`;

const termsContent = `<main class="legal-page">
<div class="legal-page__eyebrow">National Consumer Review</div>
<h1>Terms of Use</h1>
<p class="effective-date">Effective date: ${EFFECTIVE_DATE}</p>
<p>These Terms of Use ("Terms") govern your access to and use of nationalconsumerreview.com and pages operated under the National Consumer Review name (the "Site"). By accessing or using the Site, you agree to these Terms. If you do not agree, do not use the Site.</p>

<h2>1. Eligibility and U.S. Audience</h2>
<p>The Site is intended for users in the United States who are at least 18 years old. By using the Site, you represent that you are at least 18 and legally able to agree to these Terms.</p>

<h2>2. Informational Content Only</h2>
<p>National Consumer Review publishes educational, editorial, advertorial, comparison, and product-related content. The Site is provided for general informational purposes only.</p>
<div class="legal-note"><strong>Not veterinary or medical advice.</strong> Content on the Site is not a substitute for advice, diagnosis, or treatment from a veterinarian, physician, or other qualified professional. Always consult an appropriate professional about health conditions, medications, supplements, or treatment decisions.</div>
<p>We do not guarantee that information on the Site is complete, error-free, current, or suitable for your individual circumstances. Product formulations, prices, promotions, guarantees, availability, and merchant terms can change without notice.</p>

<h2>3. Affiliate Relationships and Third-Party Offers</h2>
<p>National Consumer Review is primarily an affiliate-content website. We may receive compensation when visitors click links, visit third-party websites, or make qualifying purchases. Please review our <a href="/affiliate-disclosure/">Affiliate Disclosure</a> for more information.</p>
<p>Unless expressly stated otherwise, National Consumer Review is not the manufacturer, seller, fulfillment provider, payment processor, veterinarian, or customer-service provider for products discussed on the Site. Purchases are completed on third-party websites and are governed by the merchant's own terms, privacy policy, shipping practices, refund rules, warranties, and customer-service policies.</p>
<p>We are not responsible for a third party's products, services, claims, acts, omissions, security, availability, pricing, fulfillment, refunds, or business practices.</p>

<h2>4. No Guaranteed Results</h2>
<p>References to experiences, testimonials, reported outcomes, potential benefits, or product performance do not guarantee that you or any animal will experience the same result. Individual results vary, and products may not be appropriate for every person or animal.</p>

<h2>5. Intellectual Property</h2>
<p>Unless otherwise indicated, the Site's original text, layout, branding, graphics, compilations, and other original content are owned by or licensed to National Consumer Review and are protected by applicable intellectual-property laws. Third-party trademarks, product names, images, and other materials remain the property of their respective owners.</p>
<p>You may view and use the Site for personal, non-commercial purposes. You may not reproduce, republish, scrape, sell, systematically download, modify, create derivative commercial works from, or exploit Site content without permission, except as permitted by law.</p>

<h2>6. Acceptable Use</h2>
<p>You agree not to misuse the Site, interfere with its operation, attempt unauthorized access, introduce malicious code, use automated systems in a manner that materially burdens the Site, impersonate another person, or use the Site for unlawful or fraudulent purposes.</p>

<h2>7. Third-Party Links</h2>
<p>Links to third-party websites are provided for information, convenience, and affiliate referral purposes. A link does not mean we control or assume responsibility for the third party. You should independently review a merchant's product information and policies before purchasing.</p>

<h2>8. Disclaimer of Warranties</h2>
<p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE SITE AND ITS CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. NATIONAL CONSUMER REVIEW DISCLAIMS IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, AND QUIET ENJOYMENT TO THE EXTENT PERMITTED BY LAW.</p>
<p>Nothing in these Terms excludes a warranty or right that cannot lawfully be excluded.</p>

<h2>9. Limitation of Liability</h2>
<p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, NATIONAL CONSUMER REVIEW WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, LOST PROFITS, LOST DATA, LOSS OF GOODWILL, OR DAMAGES ARISING FROM THIRD-PARTY PRODUCTS, SERVICES, WEBSITES, OR TRANSACTIONS.</p>
<p>To the extent liability cannot be excluded, National Consumer Review's aggregate liability arising out of or relating to the Site will not exceed the greater of $100 or the amount, if any, you paid directly to National Consumer Review for use of the Site during the twelve months before the event giving rise to the claim. Some jurisdictions do not allow certain limitations, so portions of this section may not apply to you.</p>

<h2>10. Indemnification</h2>
<p>To the extent permitted by law, you agree to defend, indemnify, and hold National Consumer Review harmless from claims, liabilities, losses, and expenses, including reasonable legal fees, arising from your unlawful misuse of the Site or your material violation of these Terms. This provision does not require indemnification for conduct for which indemnification is prohibited by applicable law.</p>

<h2>11. Dispute Resolution and Binding Individual Arbitration</h2>
<p>Please read this section carefully. It affects legal rights.</p>
<h3>Informal resolution first</h3>
<p>Before starting arbitration or a lawsuit, you and National Consumer Review agree to make a good-faith effort to resolve the dispute informally for at least 30 days. You may send a written notice describing the dispute and requested resolution to <a href="mailto:${EMAIL}">${EMAIL}</a> with the subject line "Legal Dispute Notice."</p>
<h3>Binding arbitration</h3>
<p>Except for disputes eligible for small-claims court and matters that applicable law does not permit to be arbitrated, disputes arising out of or relating to the Site or these Terms will be resolved by binding arbitration on an individual basis. The Federal Arbitration Act governs the interpretation and enforcement of this arbitration provision.</p>
<p>Unless the parties agree otherwise, arbitration will be administered by the American Arbitration Association under the consumer rules that apply to the dispute. If that administrator is unavailable or declines to administer the matter, the parties will seek a mutually acceptable alternative arbitration provider or a court may appoint one where permitted by law.</p>
<h3>Small claims</h3>
<p>Either party may bring an individual claim in a small-claims court that has jurisdiction, as long as the claim remains only in that court and proceeds only on an individual basis.</p>
<h3>Class and representative action waiver</h3>
<p>TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND NATIONAL CONSUMER REVIEW AGREE THAT EACH MAY BRING CLAIMS ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF, CLASS MEMBER, OR REPRESENTATIVE IN A CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION. The arbitrator may award relief only to the individual party seeking relief, except where applicable law requires otherwise.</p>
<h3>Arbitration opt-out</h3>
<p>You may opt out of this arbitration provision by emailing <a href="mailto:${EMAIL}">${EMAIL}</a> within 30 days after the date you first become bound by these Terms. Use the subject line "Arbitration Opt-Out" and state that you wish to opt out of arbitration under the National Consumer Review Terms of Use.</p>

<h2>12. Applicable Law for a Nationwide U.S. Site</h2>
<p>The Site is intended for users throughout the United States, and these Terms do not select one particular state's substantive law for every user. The Federal Arbitration Act governs the arbitration provision. For issues outside that provision, applicable federal law and the state law that properly applies under ordinary conflict-of-laws principles will govern, including any mandatory state-law rights that cannot be waived.</p>
<p>For a dispute that is not subject to arbitration or small-claims court, the matter may be brought in a court of competent jurisdiction in the United States that has appropriate subject-matter and personal jurisdiction under applicable law.</p>

<h2>13. Changes to the Site or Terms</h2>
<p>We may modify, suspend, or discontinue Site features and may update these Terms. Materially updated Terms will be posted with a revised effective date. Your continued use of the Site after updated Terms become effective constitutes acceptance to the extent permitted by law.</p>

<h2>14. Severability and Entire Agreement</h2>
<p>If a provision of these Terms is found unenforceable, it will be enforced to the maximum extent permitted and the remaining provisions will continue in effect, except that the arbitration section will be interpreted according to its own terms and applicable law. These Terms, together with policies expressly incorporated by reference, constitute the agreement between you and National Consumer Review regarding use of the Site.</p>

<div class="contact-box"><strong>Contact</strong><br />Questions about these Terms may be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</div>
</main>`;

const affiliateContent = `<main class="legal-page">
<div class="legal-page__eyebrow">National Consumer Review</div>
<h1>Affiliate Disclosure</h1>
<p class="effective-date">Effective date: ${EFFECTIVE_DATE}</p>
<div class="legal-note"><strong>Plain-English disclosure:</strong> National Consumer Review may earn a commission when you click certain links on this Site and make a purchase or take another qualifying action. This compensation is generally paid by the merchant, brand, retailer, or affiliate network.</div>

<h2>1. Our Affiliate Relationships</h2>
<p>National Consumer Review is primarily supported through affiliate marketing. Some links on the Site are affiliate or tracked referral links. If you follow one of those links and make a qualifying purchase or complete another qualifying action, we may receive compensation.</p>
<p>You usually do not pay an additional charge simply because we receive an affiliate commission. The price, checkout, billing, shipping, refund, and other transaction terms are established by the third-party merchant, not National Consumer Review.</p>

<h2>2. Why We Disclose This</h2>
<p>A financial relationship can be relevant when a reader evaluates a product recommendation, review, advertorial, comparison, or buying guide. We therefore disclose that relationship so readers understand that National Consumer Review may have a financial interest in referrals generated through certain links.</p>
<p>In addition to this full disclosure page, we may place shorter affiliate disclosures directly on pages containing recommendations or affiliate links so the relationship is visible near the relevant content.</p>

<h2>3. How Compensation May Affect the Site</h2>
<p>Affiliate compensation may affect which products, services, merchants, or offers we choose to cover, whether an offer appears on the Site, and the placement or prominence of certain links or calls to action. A product's inclusion on the Site should not be interpreted as an uncompensated or completely independent recommendation.</p>
<p>Compensation does not change the fact that visitors should make their own purchasing decisions and independently evaluate product information, merchant terms, suitability, and professional advice where appropriate.</p>

<h2>4. Not Every Link Is an Affiliate Link</h2>
<p>Some links are provided only as references or for convenience and may not generate compensation. The presence of a link alone does not necessarily mean National Consumer Review is paid for it.</p>

<h2>5. Tracking and Attribution</h2>
<p>Affiliate links may contain campaign, click, sub-ID, or other tracking parameters, and affiliate networks or merchants may use cookies or similar technologies to attribute a referral or transaction to National Consumer Review. Additional information about these technologies appears in our <a href="/privacy-policy/">Privacy Policy</a>.</p>

<h2>6. Third-Party Products and Transactions</h2>
<p>National Consumer Review is not the seller of products purchased through third-party links unless a page explicitly states otherwise. Product claims, ingredients, pricing, stock, subscriptions, guarantees, shipping, returns, customer service, and checkout are controlled by the third-party merchant.</p>
<p>You should review the merchant's current product information and policies before buying. National Consumer Review does not guarantee the accuracy or continued availability of a third party's price, promotion, product formulation, guarantee, or other terms.</p>

<h2>7. Health and Pet-Related Content</h2>
<p>Affiliate compensation does not turn Site content into veterinary or medical advice. Pet-health and wellness content on National Consumer Review is general educational information only. Consult a veterinarian or other qualified professional when making decisions about a pet's health, medications, supplements, or treatment.</p>

<h2>8. Questions</h2>
<p>If you have a question about whether a specific link or relationship is compensated, contact us and identify the page or link in question.</p>

<div class="contact-box"><strong>Contact</strong><br />Affiliate-disclosure questions may be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</div>
</main>`;

const pages = [
  {
    dir: "privacy-policy",
    html: pageShell({
      title: "Privacy Policy",
      description: "Privacy Policy for National Consumer Review.",
      canonical: "https://nationalconsumerreview.com/privacy-policy/",
      content: privacyContent,
    }),
  },
  {
    dir: "terms",
    html: pageShell({
      title: "Terms of Use",
      description: "Terms of Use for National Consumer Review.",
      canonical: "https://nationalconsumerreview.com/terms/",
      content: termsContent,
    }),
  },
  {
    dir: "affiliate-disclosure",
    html: pageShell({
      title: "Affiliate Disclosure",
      description: "Affiliate Disclosure for National Consumer Review.",
      canonical: "https://nationalconsumerreview.com/affiliate-disclosure/",
      content: affiliateContent,
    }),
  },
];

for (const page of pages) {
  const pageDir = path.join(distDir, page.dir);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, "index.html"), page.html);
}

for (const marker of [
  'href="/privacy-policy/"',
  'href="/terms/"',
  'href="/affiliate-disclosure/"',
  `href="mailto:${EMAIL}"`,
]) {
  if (!indexHtml.includes(marker)) throw new Error(`Missing footer destination: ${marker}`);
}

for (const page of pages) {
  const output = path.join(distDir, page.dir, "index.html");
  if (!fs.existsSync(output) || fs.statSync(output).size < 3000) {
    throw new Error(`Legal page was not generated correctly: ${output}`);
  }
}

console.log("Built Privacy Policy, Terms of Use, and Affiliate Disclosure pages and connected footer links");
