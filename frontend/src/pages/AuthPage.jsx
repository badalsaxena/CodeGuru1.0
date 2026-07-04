import React, { useState, useMemo } from "react";
import { loginUser, registerUser } from "../services/authService";
import {
  Eye, EyeOff, ArrowLeft, Check, Mail, Lock, User,
  Shield, GraduationCap, BookOpen, AlertCircle,
  CheckCircle2, Loader2, ChevronRight, Zap,
} from "lucide-react";

/* ─────────────────────────── helpers ─────────────────────────── */
const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { score: s, label: "Weak",   color: "#ef4444", bg: "bg-red-500"    };
  if (s <= 2) return { score: s, label: "Fair",   color: "#f59e0b", bg: "bg-amber-500"  };
  if (s <= 3) return { score: s, label: "Good",   color: "#3b82f6", bg: "bg-blue-500"   };
  return       { score: s, label: "Strong", color: "#10b981", bg: "bg-emerald-500" };
};

const ROLES = [
  { id: "student", label: "Student", Icon: BookOpen,      desc: "Take assessments & track progress" },
  { id: "teacher", label: "Teacher", Icon: GraduationCap, desc: "Create exams & monitor cohorts"    },
  { id: "admin",   label: "Admin",   Icon: Shield,         desc: "Manage platform & institutions"   },
];

/* ─────────────────────────── Field ───────────────────────────── */
function Field({ label, id, error, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────── Input ───────────────────────────── */
function Input({ id, type = "text", placeholder, value, onChange, icon: Icon, right, autoComplete }) {
  return (
    <div className="relative">
      {Icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          <Icon className="w-4 h-4" />
        </span>
      )}
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-zinc-900/70 border border-white/8 rounded-xl py-3 text-sm text-white placeholder-zinc-600
          focus:outline-none focus:border-emerald-500/60 focus:bg-zinc-900 transition-all duration-200
          ${Icon ? "pl-10" : "pl-4"} ${right ? "pr-11" : "pr-4"}`}
      />
      {right && <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{right}</span>}
    </div>
  );
}

/* ─────────────────────── Trust badges ────────────────────────── */
const BADGES = ["SOC 2 Compliant", "GDPR Ready", "256-bit TLS", "99.9% Uptime"];

/* ═══════════════════════ AUTH PAGE ═══════════════════════════════ */
export default function AuthPage({ onClose }) {
  const [tab,             setTab]             = useState("login");   // "login" | "signup"
  const [view,            setView]            = useState("main");    // "main" | "forgot" | "verify" | "success"

  /* form state */
  const [role,            setRole]            = useState(null);
  const [name,            setName]            = useState("");
  const [email,           setEmail]           = useState("");
  const [forgotEmail,     setForgotEmail]     = useState("");
  const [password,        setPassword]        = useState("");
  const [confirm,         setConfirm]         = useState("");
  const [showPw,          setShowPw]          = useState(false);
  const [showCnf,         setShowCnf]         = useState(false);
  const [rememberMe,      setRememberMe]      = useState(false);
  const [agreeTerms,      setAgreeTerms]      = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [errors,          setErrors]          = useState({});
  const [successMsg,      setSuccessMsg]      = useState("");

  const strength = useMemo(() => getStrength(password), [password]);

  /* ─── switch tab ─── */
  const switchTab = (t) => {
    setTab(t); setErrors({}); setSuccessMsg("");
    setRole(null); setName(""); setEmail(""); setPassword(""); setConfirm("");
  };

  /* ─── validation ─── */
  const validate = () => {
    const e = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim())         e.email    = "Email is required.";
    else if (!emailRx.test(email)) e.email = "Enter a valid email address.";
    if (!password)             e.password = "Password is required.";
    else if (password.length < 8) e.password = "Minimum 8 characters required.";
    if (tab === "signup") {
      if (!name.trim())        e.name     = "Full name is required.";
      if (!role)               e.role     = "Please select a role.";
      if (strength.score < 2) e.password  = "Please use a stronger password.";
      if (!confirm)            e.confirm  = "Please confirm your password.";
      else if (confirm !== password) e.confirm = "Passwords do not match.";
      if (!agreeTerms)         e.terms    = "You must accept the terms to continue.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ─── submit ─── */
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);
  setErrors({});
  setSuccessMsg("");

  try {
    if (tab === "signup") {
      const data = await registerUser({
        fullName: name,
        email,
        password,
        role,
      });

      setSuccessMsg(
        data.message || "Account created successfully!"
      );

      setTimeout(() => {
        setView("verify");
      }, 1000);

    } else {
      const data = await loginUser({
        email,
        password,
      });

      setSuccessMsg(
        data.message || "Login successful!"
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setTimeout(() => {
  window.location.reload();
}, 1000);
    }
  } catch (error) {
    setErrors({
      general:
        error.message ||
        "Something went wrong. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};
  /* ──────────────────────────── render ──────────────────────────── */
  return (
    <div className="fixed inset-0 z-[200] flex items-stretch bg-black">

      {/* ── LEFT PANEL (desktop brand panel) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] relative overflow-hidden px-14 py-12 bg-gradient-to-br from-zinc-950 via-black to-zinc-900">

        {/* glow orbs */}
        <div className="absolute top-1/4 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-56 h-56 bg-purple-500/10 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/5 via-transparent to-transparent pointer-events-none" />

        {/* brand */}
        <div className="relative z-10">
          <button onClick={onClose} className="flex items-center gap-2 group mb-16 w-fit">
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-xs text-zinc-500 group-hover:text-white transition-colors">Back to home</span>
          </button>

          <div className="flex items-center gap-2 mb-8">
            <span className="text-emerald-400 font-mono font-black text-lg">&lt;/&gt;</span>
            <span className="text-white font-bold text-lg tracking-tight">CodeGuru</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">v1.0</span>
          </div>

          <h2 className="text-4xl font-black text-white leading-tight mb-4" style={{ fontFamily: "'Anton', sans-serif" }}>
            The Future of<br />
            <span className="text-emerald-400">Code Assessment</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Enterprise-grade AI evaluation. Real-time proctoring. Built for institutions that demand integrity.
          </p>
        </div>

        {/* feature pills */}
        <div className="relative z-10 space-y-4">
          {[
            { Icon: Zap,          text: "Auto-grade 1,000 submissions in &lt; 30s"    },
            { Icon: Shield,       text: "Keystroke-level anti-cheat detection"         },
            { Icon: CheckCircle2, text: "Trusted by 150+ universities worldwide"       },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs text-zinc-300" dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          ))}

          {/* trust badges */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {BADGES.map(b => (
              <span key={b} className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto bg-zinc-950 relative">

        {/* mobile back */}
        <button onClick={onClose} className="lg:hidden absolute top-5 left-5 flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-xs">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        {/* mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <span className="text-emerald-400 font-mono font-black">&lt;/&gt;</span>
          <span className="text-white font-bold tracking-tight">CodeGuru</span>
        </div>

        <div className="w-full max-w-md">

          {/* ═══ FORGOT PASSWORD VIEW ═══ */}
          {view === "forgot" && (
            <div className="space-y-6">
              <div>
                <button onClick={() => { setView("main"); setErrors({}); setSuccessMsg(""); }}
                  className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs mb-6 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                </button>
                <h3 className="text-2xl font-bold text-white mb-1">Reset password</h3>
                <p className="text-xs text-zinc-500">Enter your email and we'll send a secure reset link.</p>
              </div>

              {successMsg ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-300">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleForgot} className="space-y-4">
                  <Field label="Email address" id="forgot-email" error={errors.forgotEmail}>
                    <Input id="forgot-email" type="email" placeholder="you@university.edu" icon={Mail}
                      value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} autoComplete="email" />
                  </Field>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-black font-bold py-3 rounded-xl transition-colors">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ═══ EMAIL VERIFY VIEW ═══ */}
          {view === "verify" && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Verify your email</h3>
                <p className="text-sm text-zinc-400">
                  We've sent a verification link to <span className="text-white font-medium">{email}</span>.
                  Please check your inbox to activate your account.
                </p>
              </div>
              <div className="p-4 bg-zinc-900/60 border border-white/8 rounded-xl text-left space-y-2">
                {["Check your spam folder if not received.", "Link expires in 24 hours.", "Contact support if you need help."].map(t => (
                  <div key={t} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-zinc-400">{t}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setView("main"); switchTab("login"); }}
                className="text-xs text-zinc-500 hover:text-white transition-colors underline underline-offset-2">
                Already verified? Sign in
              </button>
            </div>
          )}

          {/* ═══ MAIN AUTH VIEW ═══ */}
          {view === "main" && (
            <div className="space-y-6">

              {/* header */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {tab === "login" ? "Welcome back" : "Create your account"}
                </h3>
                <p className="text-xs text-zinc-500">
                  {tab === "login"
                    ? "Sign in to your CodeGuru console."
                    : "Join 150+ institutions already using CodeGuru."}
                </p>
              </div>

              {/* tab switcher */}
              <div className="flex bg-zinc-900 border border-white/8 rounded-xl p-1">
                {["login", "signup"].map(t => (
                  <button key={t} onClick={() => switchTab(t)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 capitalize
                      ${tab === t ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20" : "text-zinc-400 hover:text-white"}`}>
                    {t === "login" ? "Log In" : "Sign Up"}
                  </button>
                ))}
              </div>

              {/* success banner */}
              {successMsg && (
                <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-xs text-emerald-300">{successMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">

{errors.general && (
  <div className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl">
    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
    <p className="text-xs text-red-300">
      {errors.general}
    </p>
  </div>
)}



                {/* ── SIGNUP: role selector ── */}
                {tab === "signup" && (
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                      I am a…
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {ROLES.map(({ id, label, Icon, desc }) => (
                        <button key={id} type="button" onClick={() => setRole(id)}
                          className={`relative flex flex-col items-center gap-2 p-3.5 rounded-xl border text-center transition-all duration-200
                            ${role === id
                              ? "border-emerald-500 bg-emerald-500/10 shadow-md shadow-emerald-500/10"
                              : "border-white/8 bg-zinc-900/50 hover:border-zinc-600"}`}>
                          <Icon className={`w-5 h-5 ${role === id ? "text-emerald-400" : "text-zinc-500"}`} />
                          <span className={`text-xs font-semibold ${role === id ? "text-emerald-300" : "text-zinc-400"}`}>
                            {label}
                          </span>
                          {role === id && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-black" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.role && (
                      <p className="flex items-center gap-1 text-[11px] text-red-400">
                        <AlertCircle className="w-3 h-3" />{errors.role}
                      </p>
                    )}
                  </div>
                )}

                {/* full name (signup only) */}
                {tab === "signup" && (
                  <Field label="Full Name" id="name" error={errors.name}>
                    <Input id="name" placeholder="Dr. Alex Rivera" icon={User}
                      value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
                  </Field>
                )}

                {/* email */}
                <Field label="Email Address" id="email" error={errors.email}>
                  <Input id="email" type="email" placeholder="you@university.edu" icon={Mail}
                    value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                </Field>

                {/* password */}
                <Field label="Password" id="password" error={errors.password}>
                  <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••••••" icon={Lock}
                    value={password} onChange={e => setPassword(e.target.value)} autoComplete={tab === "login" ? "current-password" : "new-password"}
                    right={
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        className="text-zinc-500 hover:text-white transition-colors">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    } />

                  {/* strength bar (signup only) */}
                  {tab === "signup" && password.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      <div className="flex gap-1">
                        {[0,1,2,3].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300
                            ${i < strength.score ? strength.bg : "bg-zinc-800"}`} />
                        ))}
                      </div>
                      <p className="text-[10px] font-semibold" style={{ color: strength.color }}>
                        {strength.label} password
                        {strength.score < 3 && <span className="text-zinc-600 font-normal"> — add uppercase, numbers & symbols</span>}
                      </p>
                    </div>
                  )}
                </Field>

                {/* confirm password (signup only) */}
                {tab === "signup" && (
                  <Field label="Confirm Password" id="confirm" error={errors.confirm}>
                    <Input id="confirm" type={showCnf ? "text" : "password"} placeholder="Repeat password" icon={Lock}
                      value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password"
                      right={
                        <button type="button" onClick={() => setShowCnf(v => !v)}
                          className="text-zinc-500 hover:text-white transition-colors">
                          {showCnf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      } />
                    {/* match indicator */}
                    {confirm.length > 0 && (
                      <p className={`flex items-center gap-1 text-[10px] mt-1 font-semibold ${confirm === password ? "text-emerald-400" : "text-red-400"}`}>
                        {confirm === password
                          ? <><Check className="w-3 h-3" /> Passwords match</>
                          : <><AlertCircle className="w-3 h-3" /> Does not match</>}
                      </p>
                    )}
                  </Field>
                )}

                {/* remember me + forgot (login) */}
                {tab === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div onClick={() => setRememberMe(v => !v)}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer
                          ${rememberMe ? "bg-emerald-500 border-emerald-500" : "border-zinc-600 bg-transparent group-hover:border-zinc-400"}`}>
                        {rememberMe && <Check className="w-2.5 h-2.5 text-black" />}
                      </div>
                      <span className="text-[11px] text-zinc-400 select-none">Remember me</span>
                    </label>
                    <button type="button" onClick={() => { setView("forgot"); setErrors({}); setSuccessMsg(""); }}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* terms (signup only) */}
                {tab === "signup" && (
                  <div className="space-y-1">
                    <label className="flex items-start gap-2 cursor-pointer group">
                      <div onClick={() => setAgreeTerms(v => !v)}
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all cursor-pointer
                          ${agreeTerms ? "bg-emerald-500 border-emerald-500" : "border-zinc-600 bg-transparent group-hover:border-zinc-400"}`}>
                        {agreeTerms && <Check className="w-2.5 h-2.5 text-black" />}
                      </div>
                      <span className="text-[11px] text-zinc-400 leading-relaxed select-none">
                        I agree to the{" "}
                        <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="flex items-center gap-1 text-[11px] text-red-400 pl-6">
                        <AlertCircle className="w-3 h-3 shrink-0" />{errors.terms}
                      </p>
                    )}
                  </div>
                )}

                {/* submit */}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600
                    disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl
                    transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-emerald-500/20 mt-2">
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> {tab === "login" ? "Signing in…" : "Creating account…"}</>
                    : <>{tab === "login" ? "Sign In to Console" : "Create Account"} <ChevronRight className="w-4 h-4" /></>}
                </button>

              </form>

              {/* divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] text-zinc-600 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* switch mode prompt */}
              <p className="text-center text-xs text-zinc-500">
                {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => switchTab(tab === "login" ? "signup" : "login")}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                  {tab === "login" ? "Sign up free" : "Log in"}
                </button>
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
