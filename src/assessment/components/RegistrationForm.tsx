import type { ChangeEvent, FormEvent, FocusEvent } from "react";
import { useState } from "react";

function validate(fields: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!fields.name.trim()) {
    errors.name = "Full name is required";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Enter your full name";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?[\d\s\-()]{7,15}$/.test(fields.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  if (!fields.password) {
    errors.password = "Password is required";
  } else if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

function pwStrength(password: string) {
  if (!password) {
    return 0;
  }

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const strengthColors = ["#1e2530", "#e24b4a", "#ef9f27", "#1d9e75", "#1d9e75"];
const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

export default function RegistrationForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPw, setShowPw] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const strength = pwStrength(fields.password);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));

    if (touched[name]) {
      const nextErrors = validate({ ...fields, [name]: value });
      setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    const nextErrors = validate(fields);
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allTouched = { name: true, email: true, phone: true, password: true };
    setTouched(allTouched);
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const cls = (name: string) => {
    if (!touched[name]) return "";
    return errors[name] ? " error" : " ok";
  };

  if (submitted) {
    return (
      <div className="main">
        <div className="form-wrap">
          <div className="form-card">
            <div className="success-card">
              <div className="success-icon">✓</div>
              <div className="success-title">Registration Complete</div>
              <div className="success-sub">
                Welcome aboard, {fields.name.split(" ")[0]}! Your account has been created successfully.
              </div>
              <button
                className="reset-btn"
                onClick={() => {
                  setFields({ name: "", email: "", phone: "", password: "" });
                  setTouched({});
                  setErrors({});
                  setSubmitted(false);
                }}
              >
                Register Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="form-wrap">
        <div className="page-title">User Registration</div>
        <div className="page-sub">Create a new account to get started</div>
        <div className="form-card">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>All fields are required</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Smith"
                className={cls("name")}
                autoComplete="name"
              />
              {touched.name && errors.name && <div className="err-msg">⚠ {errors.name}</div>}
            </div>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className={cls("email")}
                autoComplete="email"
              />
              {touched.email && errors.email && <div className="err-msg">⚠ {errors.email}</div>}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={fields.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+1 (555) 000-0000"
                className={cls("phone")}
                autoComplete="tel"
              />
              {touched.phone && errors.phone && <div className="err-msg">⚠ {errors.phone}</div>}
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="pw-wrap">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={fields.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Minimum 6 characters"
                  className={cls("password")}
                  autoComplete="new-password"
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPw((current) => !current)}>
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
              {fields.password && (
                <div className="pw-strength" title={strengthLabels[strength]}>
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="pw-bar"
                      style={{ background: level <= strength ? strengthColors[strength] : "#1e2530" }}
                    />
                  ))}
                </div>
              )}
              {touched.password && errors.password && <div className="err-msg">⚠ {errors.password}</div>}
            </div>
            <button type="submit" className="submit-btn">
              Create Account →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
