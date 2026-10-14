"use client";

import { useState, type ReactNode } from "react";
import { Separator } from "valere-DS";
import { Button, IconButton } from "@/components/ds/button";
import { Logo } from "@/components/ds/logo";
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  hasErrors,
  nameFromEmail,
  validateLogin,
  validateSignUp,
  type FieldErrors,
  type FoodSession,
} from "./auth-session";

type HomeProps = {
  onCreateAccount: () => void;
  onGoogle: () => void;
  onLogIn: () => void;
};

type FormProps = {
  onBack: () => void;
  onSwitch: () => void;
  onSuccess: (session: FoodSession) => void;
};

export function LoggedOutHome({ onCreateAccount, onGoogle, onLogIn }: HomeProps) {
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column", minHeight: "100%" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          paddingInline: 24,
          textAlign: "center",
        }}
      >
        <Logo variant="landscape" width={296} height={86} role="img" aria-label="Food Rescue" />
        <p
          style={{
            margin: 0,
            maxWidth: "24ch",
            textWrap: "balance",
            fontSize: 18,
            lineHeight: 1.4,
            color: "var(--color-text-secondary)",
          }}
        >
          Find and share surplus food with your neighbors
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "0 17px 24px" }}>
        <Button variant="Primary" size="LG" label="Create account" onClick={onCreateAccount} style={{ width: "100%" }} />
        <div aria-hidden="true">
          <Separator label="or" />
        </div>
        <Button variant="Outline" size="LG" label="Continue with Google" onClick={onGoogle} style={{ width: "100%" }} />
        <Button
          variant="Link secondary"
          size="SM"
          label="Already have an account? Log in"
          onClick={onLogIn}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export function LoginScreen({ onBack, onSwitch, onSuccess }: FormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function submit() {
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    const nextEmail = email.trim();
    onSuccess({ name: nameFromEmail(nextEmail), email: nextEmail, password });
  }

  return (
    <AuthForm
      title="Log in"
      subtitle="Use your email and password."
      onBack={onBack}
      onSubmit={submit}
      switchLabel="Create account"
      onSwitch={onSwitch}
      submitLabel="Log in"
    >
      <AuthField
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        error={errors.email}
        onChange={(value) => {
          setEmail(value);
          setErrors((current) => ({ ...current, email: undefined }));
        }}
      />
      <AuthField
        id="login-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        error={errors.password}
        onChange={(value) => {
          setPassword(value);
          setErrors((current) => ({ ...current, password: undefined }));
        }}
      />
    </AuthForm>
  );
}

export function SignUpScreen({ onBack, onSwitch, onSuccess }: FormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function submit() {
    const draft = { name: name.trim(), email: email.trim(), password };
    const nextErrors = validateSignUp(draft);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    onSuccess(draft);
  }

  return (
    <AuthForm
      title="Create account"
      subtitle="Name, email, and a password."
      onBack={onBack}
      onSubmit={submit}
      switchLabel="Already have an account? Log in"
      onSwitch={onSwitch}
      submitLabel="Create account"
    >
      <AuthField
        id="signup-name"
        label="Name"
        autoComplete="name"
        value={name}
        error={errors.name}
        onChange={(value) => {
          setName(value);
          setErrors((current) => ({ ...current, name: undefined }));
        }}
      />
      <AuthField
        id="signup-email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        error={errors.email}
        onChange={(value) => {
          setEmail(value);
          setErrors((current) => ({ ...current, email: undefined }));
        }}
      />
      <AuthField
        id="signup-password"
        label="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        error={errors.password}
        onChange={(value) => {
          setPassword(value);
          setErrors((current) => ({ ...current, password: undefined }));
        }}
      />
    </AuthForm>
  );
}

function AuthForm({
  title,
  subtitle,
  onBack,
  onSubmit,
  switchLabel,
  onSwitch,
  submitLabel,
  children,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  onSubmit: () => void;
  switchLabel: string;
  onSwitch: () => void;
  submitLabel: string;
  children: ReactNode;
}) {
  return (
    <form
      style={{ display: "flex", flex: 1, flexDirection: "column", minHeight: "100%", padding: "8px 17px 24px" }}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      <IconButton
        variant="Ghost"
        size="MD"
        aria-label="Back"
        onClick={onBack}
        icon={<ChevronLeftIcon width={22} height={22} strokeWidth={1.75} aria-hidden="true" />}
        style={{ alignSelf: "flex-start", marginLeft: -8, borderRadius: "var(--radius-pill)", color: "var(--color-icon-primary)" }}
      />
      <h1 style={{ margin: "12px 0 0", fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>{title}</h1>
      <p style={{ margin: "8px 0 0", color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>{subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)", marginTop: 24 }}>{children}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto", paddingTop: 24 }}>
        <Button variant="Primary" size="LG" type="submit" label={submitLabel} style={{ width: "100%" }} />
        <Button variant="Link secondary" size="SM" label={switchLabel} onClick={onSwitch} style={{ width: "100%" }} />
      </div>
    </form>
  );
}

function AuthField({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="food-auth-field" htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)", width: "100%" }}>
      <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>
        {label}
        <span style={{ color: "var(--color-status-error-text)" }}> *</span>
      </span>
      <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
        <input
          id={id}
          type={resolvedType}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            height: "var(--size-control-md)",
            paddingLeft: "var(--space-inset-md)",
            paddingRight: isPassword ? 42 : "var(--space-inset-md)",
            borderRadius: "var(--radius-control)",
            border: "var(--border-hairline) solid var(--color-border-default)",
            background: "var(--color-background-surface)",
            color: "var(--color-text-primary)",
            font: "inherit",
            fontSize: "var(--font-size-body-sm)",
          }}
        />
        {isPassword ? (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={(event) => {
              event.preventDefault();
              setShowPassword((prev) => !prev);
            }}
            style={{
              position: "absolute",
              right: 8,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              padding: 0,
              border: "none",
              background: "transparent",
              color: "var(--color-icon-muted, #75757d)",
              cursor: "pointer",
              borderRadius: "var(--radius-pill, 9999px)",
            }}
          >
            {showPassword ? (
              <EyeSlashIcon width={18} height={18} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <EyeIcon width={18} height={18} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
      {error ? (
        <span id={`${id}-error`} style={{ fontSize: "var(--font-size-body-xs)", color: "var(--color-status-error-text)" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
