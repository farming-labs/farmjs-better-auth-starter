import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="auth-shell">
      <section className="auth-context">
        <a className="brand brand-on-dark" href="/" aria-label="Back to starter home">
          <span className="brand-mark" aria-hidden="true">
            F
          </span>
          <span>
            <strong>Farm.js</strong>
            <small>Auth Starter</small>
          </span>
        </a>

        <div className="auth-context-copy">
          <span className="section-index light">AUTH / EMAIL + PASSWORD</span>
          <h2>Authentication should feel like infrastructure, not a side project.</h2>
          <p>
            This starter keeps the setup small: one Farm config switch, framework-owned helpers,
            local SQLite, and production-ready Postgres support.
          </p>
        </div>

        <ul className="auth-checklist">
          <li>
            <span aria-hidden="true">✓</span> Secure cookie sessions
          </li>
          <li>
            <span aria-hidden="true">✓</span> Automatic local schema setup
          </li>
          <li>
            <span aria-hidden="true">✓</span> Server-side route protection
          </li>
        </ul>
      </section>

      <section className="auth-form-side">{children}</section>
    </main>
  );
}
