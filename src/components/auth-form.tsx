"use client";

import { useState } from "react";
import { signIn, signUp } from "@farm.js/auth/client";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "").trim();

    try {
      const response = isSignUp
        ? await signUp({
            email,
            name,
            password,
          })
        : await signIn({
            email,
            password,
          });

      if (response.error) {
        setError(response.error.message ?? "We could not complete that request.");
        setPending(false);
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setError("The authentication service could not be reached. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="auth-form-panel">
      <div className="auth-form-heading">
        <span className="section-index">{isSignUp ? "NEW ACCOUNT" : "WELCOME BACK"}</span>
        <h1>{isSignUp ? "Create your account" : "Sign in to continue"}</h1>
        <p>
          {isSignUp
            ? "Start with email and password. Add social providers when your product needs them."
            : "Use the credentials you created for this local starter."}
        </p>
      </div>

      <form className="auth-form" onSubmit={submit}>
        {isSignUp ? (
          <label className="field">
            <span>Name</span>
            <input
              autoComplete="name"
              minLength={2}
              name="name"
              placeholder="Ada Lovelace"
              required
              type="text"
            />
          </label>
        ) : null}

        <label className="field">
          <span>Email address</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            autoComplete={isSignUp ? "new-password" : "current-password"}
            minLength={8}
            name="password"
            placeholder="At least 8 characters"
            required
            type="password"
          />
        </label>

        {error ? (
          <div className="form-error" role="alert">
            <strong>Authentication failed</strong>
            <span>{error}</span>
          </div>
        ) : null}

        <button className="button button-primary auth-submit" disabled={pending} type="submit">
          <span>{pending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}</span>
          <span aria-hidden="true">{pending ? "···" : "→"}</span>
        </button>
      </form>

      <p className="auth-switch">
        {isSignUp ? "Already have an account?" : "New to the starter?"}{" "}
        <a href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Sign in" : "Create an account"}
        </a>
      </p>
    </div>
  );
}
