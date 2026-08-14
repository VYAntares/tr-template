import type { LegalDocument } from './legal';

/**
 * Addresses use the RFC 2606 reserved `.example` TLD on purpose: a template has
 * no registered domain. Swap both before any public deployment, or the contact
 * obligations below cannot be honoured.
 */
export const PRIVACY_CONTACT_EMAIL = 'privacy@template-app.example';
export const LEGAL_CONTACT_EMAIL = 'legal@template-app.example';

export const privacyPolicy: LegalDocument = {
  slug: 'privacy',
  title: 'Privacy Policy',
  description:
    'What this application collects, why it collects it, how long it keeps it, and how to get it back or deleted. Placeholder text for a template: rewrite it for your service.',
  lastUpdated: '2026-08-01',
  intro:
    'This is placeholder policy text shipped with template-app. It is written to be a realistic starting point rather than filler, but it describes the template as it stands: a skeleton that stores almost nothing. Before you deploy anything real, rewrite every section below to describe what your service actually does.',
  sections: [
    {
      id: 'scope',
      heading: '1. Scope',
      paragraphs: [
        'This policy covers the web application, its HTTP API, and the supporting database and cache that ship with this template. It applies to everyone who visits the deployed site, including visitors who only read public pages such as this one.',
        'template-app is a starting point for building an application. As shipped it has no accounts, no sign-in, and no user-submitted content, so the data described below is limited to what any web server necessarily observes while answering a request.',
      ],
    },
    {
      id: 'data-we-collect',
      heading: '2. Data we collect',
      paragraphs: [
        'Technical data: IP address, browser user agent, requested path, response status, timestamps, and error traces captured by server logs. These are collected to operate the service and to detect abuse, not to build a profile of anyone.',
        'Operational data: aggregate counters used for rate limiting, together with health and uptime measurements exposed by the health endpoint. These describe the state of the service rather than the people using it.',
        'As distributed, the template collects nothing else. It stores no account data, no credentials, no messages, and no submitted content, because none of those features exist yet. Adding any of them is a change to this policy as much as it is a change to the code.',
      ],
    },
    {
      id: 'why-we-process',
      heading: '3. Why we process it',
      paragraphs: [
        'Technical and operational data are processed on the basis of legitimate interest in keeping the service available, correct, and free of abuse, including rate limiting and blocking automated traffic. Without request logs an outage cannot be diagnosed at all.',
        'None of this data is used for advertising, none of it is sold, and none of it is combined with data from other sources to enrich a profile. If you extend this template with features that change that, say so here in plain language.',
      ],
    },
    {
      id: 'retention',
      heading: '4. How long we keep data',
      paragraphs: [
        'Server logs containing IP addresses are kept for thirty days, then rotated out. Aggregate counters used for rate limiting expire within minutes and are never archived.',
        'Backups of the database, where you configure them, are purged on their own rolling cycle, which should complete within ninety days. A retention period you do not actually enforce is worse than none, so verify the schedule your deployment really applies.',
      ],
    },
    {
      id: 'sharing',
      heading: '5. Who else sees your data',
      paragraphs: [
        'Data reaches only the infrastructure providers required to run the service, and only to the extent hosting it requires. Nothing is shared with advertisers, data brokers, or analytics networks.',
        'If the operators are ever compelled to disclose data by a lawful order, they will notify affected people unless prohibited from doing so.',
      ],
    },
    {
      id: 'cookies',
      heading: '6. Cookies and local storage',
      paragraphs: [
        'As shipped, this template sets no cookies at all and writes nothing to local storage. There are no advertising or analytics cookies, which is why the site shows no cookie consent banner.',
        'If you add sign-in or preference storage, the cookie it needs is strictly necessary and still requires no banner, but this section must then describe it: its name, its lifetime, and whether it is readable by client-side scripts.',
      ],
    },
    {
      id: 'your-rights',
      heading: '7. Your rights',
      paragraphs: [
        'You can request access to the data held about you, correction of anything inaccurate, deletion of it, a machine-readable export, restriction of processing while a dispute is open, and objection to processing based on legitimate interest.',
        'Because the template holds only short-lived technical data tied to an IP address, most requests are answered by explaining what the logs contain and when they expire. Write to the contact address below and expect an answer within thirty days.',
        'If you are in the European Economic Area or the United Kingdom, you also have the right to lodge a complaint with your national supervisory authority. Exercising any of these rights never costs you access to the service.',
      ],
    },
    {
      id: 'security',
      heading: '8. Security',
      paragraphs: [
        'All traffic is served over HTTPS, terminated at the reverse proxy. The database and cache are not published outside the internal network; only the proxy accepts external connections, and it sets conservative security headers on every response.',
        'No system is perfect. If you find a vulnerability, report it to the contact address below rather than disclosing it publicly, so it can be fixed before it is described anywhere else.',
      ],
    },
    {
      id: 'changes',
      heading: '9. Changes to this policy',
      paragraphs: [
        'When this policy changes materially, for example when a new category of data starts being collected or a new processor is introduced, the date at the top of this page is updated and, where the service has account holders, they are notified before the change takes effect.',
      ],
    },
    {
      id: 'contact',
      heading: '10. Contact',
      paragraphs: [
        `Privacy questions and rights requests: ${PRIVACY_CONTACT_EMAIL}. Security reports go to the same address with SECURITY in the subject line.`,
        'This is template text and the address above is a reserved example domain that cannot receive mail. Replace both with a real, monitored contact before publishing the site, and name the legal entity responsible for the service here.',
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  slug: 'terms',
  title: 'Terms of Service',
  description:
    'The rules for using this application: acceptable use, availability, and liability. Placeholder text for a template: rewrite it for your service.',
  lastUpdated: '2026-08-01',
  intro:
    'These are placeholder terms shipped with template-app. They are deliberately short, because the template does very little, and deliberately concrete, because terms written entirely in generalities are of no use to anyone. Rewrite them to match the service you actually deploy.',
  sections: [
    {
      id: 'acceptance',
      heading: '1. Acceptance',
      paragraphs: [
        'Using this service means you accept these terms and the Privacy Policy. If you do not accept them, do not use it. Continuing to use the service after a change to these terms means you accept the updated version.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: '2. Acceptable use',
      paragraphs: [
        'Use the service for its intended purpose. As shipped, that purpose is to serve a small set of public pages and a health endpoint, and nothing here is an invitation to test how much more it can be made to do.',
        'You may not scrape the service or automate requests against it; attempt to bypass rate limits or any other protection; probe the infrastructure for weaknesses outside a good-faith security report; use it to distribute unlawful material or malware; or resell access to it.',
        'Rate limits protect a shared and genuinely limited resource. Circumventing them takes capacity from everyone else and is treated as abuse rather than as a technical curiosity.',
      ],
    },
    {
      id: 'your-content',
      heading: '3. Your content',
      paragraphs: [
        'As distributed, this template accepts no user-submitted content, so there is nothing here to own or license. If you add features that accept content, state plainly that users keep ownership of what they write and grant only the narrow licence needed to operate the service for them.',
        'That licence should end when the content is deleted, and this section should say so. Users reading terms want to know what happens to their work after they leave, and a vague answer reads as an evasive one.',
      ],
    },
    {
      id: 'availability',
      heading: '4. Availability and changes',
      paragraphs: [
        'The service is provided as it is, with no uptime guarantee. It may be taken down for maintenance, redeployed, reset, or discontinued without notice. Export anything you want to keep.',
        'Features may change or be removed. When a change removes something people depend on, it should be announced on this page and, where the service has account holders, by email.',
      ],
    },
    {
      id: 'termination',
      heading: '5. Suspension and termination',
      paragraphs: [
        'Access may be suspended or terminated for anyone who breaks these terms. For anything other than serious abuse a warning comes first, with a chance to explain.',
        'For serious abuse, including unlawful content or attacks on the infrastructure, removal is immediate and permanent, and may be reported to the relevant authorities.',
      ],
    },
    {
      id: 'disclaimer',
      heading: '6. Disclaimers and liability',
      paragraphs: [
        'The service is provided without warranty of any kind, express or implied, including fitness for a particular purpose. To the maximum extent permitted by law, the maintainers are not liable for indirect or consequential loss, lost data, or any decision made on the basis of anything the service produced.',
        'Nothing in these terms limits liability that cannot be limited by law, including liability for death or personal injury caused by negligence, or for fraud.',
      ],
    },
    {
      id: 'governing-law',
      heading: '7. Governing law',
      paragraphs: [
        'These terms are governed by the law of the jurisdiction the operator names here, whose courts have jurisdiction over any dispute. If you are a consumer resident in the European Union, this does not deprive you of the protection of the mandatory rules of your own country.',
        'If any provision of these terms is found unenforceable, the rest stays in force. Choose a real jurisdiction before publishing: this placeholder names none.',
      ],
    },
    {
      id: 'contact',
      heading: '8. Contact',
      paragraphs: [
        `Questions about these terms, reports of abuse, and appeals against a suspension: ${LEGAL_CONTACT_EMAIL}. Privacy requests are handled separately at the address given in the Privacy Policy.`,
      ],
    },
  ],
};

export const legalDocuments: LegalDocument[] = [privacyPolicy, termsOfService];
