import { SITE } from '@/lib/site';

/**
 * Real Austrian legal text (German is the binding version). Company data is the
 * client's own registration data; the Firmenbuchgericht is the one field still
 * outstanding. Not legal advice — have it reviewed before launch.
 */

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-10 font-display text-2xl tracking-tight text-sea-deep first:mt-0">
    {children}
  </h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 leading-relaxed text-grey-dark">{children}</p>
);

export function Impressum() {
  return (
    <div className="max-w-prose">
      <H>Offenlegung gemäß §§ 24, 25 MedienG und § 5 ECG</H>
      <P>
        <strong>{SITE.legalName}</strong>
        <br />
        Einzelhandel mit Fisch und Lebensmitteln
        <br />
        {SITE.legalAddress}, {SITE.postalCode} {SITE.city}, Österreich
      </P>
      <P>
        Telefon: {SITE.phone}
        <br />
        E-Mail: {SITE.legalEmail}
      </P>

      <H>Unternehmensdaten</H>
      <P>
        Firmenwortlaut: {SITE.legalName}
        <br />
        Umsatzsteuer-Identifikationsnummer (UID): {SITE.uid}
        <br />
        Firmenbuchnummer: {SITE.firmenbuch}
        <br />
        Firmenbuchgericht: (wird ergänzt)
        <br />
        Gewerbe: Handelsgewerbe, verliehen in Österreich
        <br />
        Mitgliedschaft: Wirtschaftskammer Wien, Fachgruppe Lebensmittelhandel
      </P>

      <H>Aufsichtsbehörde / Gewerbebehörde</H>
      <P>
        Magistratisches Bezirksamt für den 2. Bezirk, Wien.
        <br />
        Anwendbare Rechtsvorschrift: Gewerbeordnung (
        <a
          className="text-sea underline-offset-4 hover:underline"
          href="https://www.ris.bka.gv.at"
          target="_blank"
          rel="noopener noreferrer"
        >
          ris.bka.gv.at
        </a>
        ).
      </P>

      <H>Online-Streitbeilegung</H>
      <P>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
        bereit:{' '}
        <a
          className="text-sea underline-offset-4 hover:underline"
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>
        . Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </P>

      <H>Haftung für Inhalte</H>
      <P>
        Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
        übernommen werden. Als Diensteanbieter sind wir für eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich.
      </P>
    </div>
  );
}

export function Datenschutz() {
  return (
    <div className="max-w-prose">
      <H>Verantwortlicher</H>
      <P>
        Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist:
        <br />
        <strong>{SITE.legalName}</strong>, {SITE.legalAddress},{' '}
        {SITE.postalCode} {SITE.city}, Österreich. E-Mail: {SITE.legalEmail}.
      </P>

      <H>Grundsätzliches</H>
      <P>
        Wir verarbeiten personenbezogene Daten nur im notwendigen Umfang und auf Grundlage
        der Datenschutz-Grundverordnung (DSGVO) sowie des österreichischen
        Datenschutzgesetzes (DSG). Diese Website verwendet <strong>keine</strong>{' '}
        Tracking-Cookies und keine Web-Analyse.
      </P>

      <H>Kontaktformular</H>
      <P>
        Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir die von Ihnen
        angegebenen Daten (Name, E-Mail oder Telefon, Nachricht), um Ihre Anfrage zu
        beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO (vorvertragliche
        Maßnahmen bzw. berechtigtes Interesse an der Beantwortung). Die Daten werden
        gelöscht, sobald die Anfrage erledigt ist und keine Aufbewahrungspflichten
        entgegenstehen.
      </P>

      <H>Benachrichtigung „Frischer Fisch“</H>
      <P>
        Wenn Sie sich für Benachrichtigungen anmelden, verarbeiten wir Ihre E-Mail-Adresse
        ausschließlich zum Versand dieser Nachrichten. Rechtsgrundlage ist Ihre
        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit mit Wirkung für die
        Zukunft widerrufen können — etwa per E-Mail an {SITE.legalEmail}.
      </P>

      <H>Auftragsverarbeiter &amp; Hosting</H>
      <P>
        Zur Verarbeitung der Formulare nutzen wir den Dienst <strong>Formspree</strong>{' '}
        (Formspree, Inc., USA). Die Website wird bei <strong>Vercel</strong> (Vercel, Inc.,
        USA) gehostet; dabei können in Server-Logs technische Daten (z. B. IP-Adresse,
        Zeitpunkt des Zugriffs) verarbeitet werden. Mit diesen Anbietern bestehen
        Auftragsverarbeitungsverträge; Datenübermittlungen in die USA erfolgen auf
        Grundlage der EU-Standardvertragsklauseln.
      </P>

      <H>Ihre Rechte</H>
      <P>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
        Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Zudem können Sie sich bei der
        österreichischen Datenschutzbehörde beschweren (
        <a
          className="text-sea underline-offset-4 hover:underline"
          href="https://www.dsb.gv.at"
          target="_blank"
          rel="noopener noreferrer"
        >
          dsb.gv.at
        </a>
        ).
      </P>

      <P>Stand: Juli 2026.</P>
    </div>
  );
}
