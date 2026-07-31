import { auth } from "@farm.js/auth/server";
import { FARM_VERSION } from "@farm.js/core/version";
import packageJson from "../../package.json";
import { SiteHeader } from "../components/site-header";

export default async function HomePage() {
  const session = await auth.session();

  return (
    <div className="site-frame">
      <SiteHeader user={session?.user ?? null} />

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="status-dot" aria-hidden="true" />
              <span>Farm.js authentication starter</span>
            </div>
            <h1>Ship the account flow before the product gets complicated.</h1>
            <p className="hero-description">
              Email and password authentication, secure cookie sessions, a middleware-protected
              dashboard, and database-backed persistence—available through Farm’s built-in auth API.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={session ? "/dashboard" : "/sign-up"}>
                {session ? "Open dashboard" : "Create an account"}
                <span aria-hidden="true">→</span>
              </a>
              <a className="button button-secondary" href="https://farm.js.dev">
                Read Farm.js docs
              </a>
            </div>
            <div className="version-row" aria-label="Starter versions">
              <span>Farm.js v{FARM_VERSION}</span>
              <span>Farm Auth v{packageJson.dependencies["@farm.js/auth"]}</span>
              <span>Local SQLite included</span>
            </div>
          </div>

          <div className="terminal-panel" aria-label="Starter setup commands">
            <div className="terminal-header">
              <span className="terminal-title">quick start</span>
              <span className="terminal-status">ready</span>
            </div>
            <div className="terminal-body">
              <p>
                <span className="prompt">$</span> pnpm install
              </p>
              <p>
                <span className="prompt">$</span> pnpm dev
              </p>
              <div className="terminal-divider" />
              <p className="terminal-success">✓ auth routes mounted at /api/auth/*</p>
              <p className="terminal-success">✓ local SQLite schema managed automatically</p>
              <p className="terminal-muted">http://localhost:3000</p>
            </div>
          </div>
        </section>

        <section className="proof-section" aria-labelledby="included-title">
          <div className="section-heading">
            <span className="section-index">01 / INCLUDED</span>
            <h2 id="included-title">A small starter with the important boundaries in place.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-cell">
              <span className="feature-number">01</span>
              <h3>Real sessions</h3>
              <p>Farm Auth owns credential validation, cookies, session expiry, and sign-out.</p>
              <code>/api/auth/*</code>
            </article>
            <article className="feature-cell">
              <span className="feature-number">02</span>
              <h3>Server protection</h3>
              <p>Route middleware checks the request session before protected UI can load.</p>
              <code>dashboard/middleware.ts</code>
            </article>
            <article className="feature-cell">
              <span className="feature-number">03</span>
              <h3>Deployable persistence</h3>
              <p>Use built-in SQLite locally and switch to Postgres through DATABASE_URL.</p>
              <code>.farm/auth.sqlite → DATABASE_URL</code>
            </article>
          </div>
        </section>

        <section className="flow-section" aria-labelledby="flow-title">
          <div className="section-heading compact">
            <span className="section-index">02 / FLOW</span>
            <h2 id="flow-title">The first user journey is already complete.</h2>
          </div>
          <ol className="flow-list">
            <li>
              <span>01</span>
              <div>
                <strong>Create an account</strong>
                <p>
                  Validated name, email, and password fields with clear pending and error states.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Receive a secure session</strong>
                <p>Farm Auth writes the session cookie through its built-in route.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Render protected product UI</strong>
                <p>Farm middleware verifies the signed-in user before the dashboard route runs.</p>
              </div>
            </li>
          </ol>
        </section>
      </main>

      <footer className="site-footer">
        <p>Built with Farm.js Auth.</p>
        <a href="https://github.com/farming-labs/farm.js">Farm.js on GitHub ↗</a>
      </footer>
    </div>
  );
}
