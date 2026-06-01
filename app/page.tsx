"use client";

import Image from "next/image";
import { useState } from "react";

const ARTISTS = [
  { name: "FRANKY RIZARDO", role: "Headliner" },
  { name: "MASON COLLECTIVE", role: "Special Guest" },
  { name: "ANDREA", role: "" },
  { name: "ELBIO & DENIS", role: "" },
  { name: "SAMBO B2B HRIS2", role: "" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "A apărut o eroare.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Conexiune eșuată. Încearcă din nou.");
      setStatus("error");
    }
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Hero Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/outro_frame0.png"
          alt="Concert 13 Iunie Romaero"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/97" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(88,28,135,0.25) 0%, transparent 60%, rgba(88,28,135,0.15) 100%)" }} />
      </div>

      {/* Noise grain */}
      <div
        className="fixed inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <header className="w-full px-6 pt-8 pb-4 flex items-center justify-center animate-fade-in">
          <Image
            src="/logos.png"
            alt="AME x Mecanica Membrana x Sambo x Cecille"
            width={260}
            height={75}
            className="object-contain"
            style={{ filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.95)) brightness(1.1)" }}
          />
        </header>

        {/* Main */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">

          {/* Badge */}
          <div className="animate-fade-up delay-100 mb-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase"
              style={{
                background: "rgba(147,51,234,0.12)",
                border: "1px solid rgba(147,51,234,0.35)",
                color: "#c084fc",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Tombolă Exclusivă
            </span>
          </div>

          {/* Headline */}
          <div className="animate-fade-up delay-200 text-center mb-3">
            <h1
              className="font-black text-white leading-[0.88] tracking-[-0.03em] uppercase"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(3rem, 13vw, 7.5rem)",
                textShadow: "0 4px 40px rgba(0,0,0,0.99)",
              }}
            >
              INIVITATII
            </h1>
            <h1
              className="font-black leading-[0.88] tracking-[-0.03em] uppercase"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(3rem, 13vw, 7.5rem)",
                background: "linear-gradient(135deg, #fff 0%, #c084fc 50%, #fff 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              GRATUITE
            </h1>
          </div>

            {/* Event chips */}
            <div className="animate-fade-up delay-400 flex items-center gap-3 mb-8 flex-wrap justify-center">
                <Chip icon="📅" text="13 Iunie 2026" />
                <Dot />
                <Chip icon="📍" text="Romaero, București" />
                <Dot />
                <Chip icon="🎟️" text="Acces Gratuit" />
            </div>


            {/* Form / Success */}
            <div className="animate-fade-up delay-600 w-full max-w-md">
                {status === "success" ? (
                    <SuccessCard />
                ) : (
                    <FormCard
                        email={email}
                        phone={phone}
                        status={status}
                        errorMsg={errorMsg}
                        onEmailChange={setEmail}
                        onPhoneChange={setPhone}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>




          {/* Lineup */}
          <div className="animate-fade-up delay-500 w-full max-w-lg mb-8 mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(147,51,234,0.5))" }} />
              <span className="text-[0.6rem] font-black tracking-[0.35em] uppercase" style={{ color: "#a855f7" }}>Line-up</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(147,51,234,0.5))" }} />
            </div>
            <div>
              {ARTISTS.map((artist, i) => (
                <ArtistRow key={i} artist={artist} />
              ))}
            </div>
          </div>



          <p
            className="animate-fade-up delay-700 mt-7 text-center max-w-sm tracking-wide"
            style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}
          >
            Prin înregistrare ești de acord cu prelucrarea datelor tale personale în scopul organizării tombolei. Câștigătorii vor fi anunțați prin email/telefon.
          </p>
        </div>

        {/*/!* Footer *!/*/}
        {/*<footer className="relative z-10 text-center pb-6 pt-2">*/}
        {/*  <p className="font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem" }}>*/}
        {/*    AME · Mecanica Membrana · 2026*/}
        {/*  </p>*/}
        {/*</footer>*/}
      </div>
    </main>
  );
}

function Chip({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5 font-semibold text-xs tracking-wide" style={{ color: "rgba(255,255,255,0.75)" }}>
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  );
}

function Dot() {
  return <span className="w-1 h-1 rounded-full" style={{ background: "rgba(147,51,234,0.6)" }} />;
}

function ArtistRow({ artist }: { artist: { name: string; role: string } }) {
  const isHeadliner = artist.role === "Headliner";
  const isSpecial = artist.role === "Special Guest";

  return (
    <div
      className="relative flex items-center justify-between py-3 px-2 rounded group cursor-default transition-all duration-300"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-black tracking-[-0.01em] uppercase"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isHeadliner ? "clamp(1rem, 4vw, 1.4rem)" : "clamp(0.8rem, 3vw, 1rem)",
            color: isHeadliner ? "#ffffff" : "rgba(255,255,255,0.72)",
            textShadow: isHeadliner ? "0 0 30px rgba(147,51,234,0.35)" : "none",
          }}
        >
          {artist.name}
        </span>
        {isSpecial && (
          <span
            className="px-2 py-0.5 text-[0.5rem] font-black tracking-[0.15em] uppercase rounded-full hidden sm:inline"
            style={{ border: "1px solid rgba(147,51,234,0.4)", color: "#a855f7" }}
          >
            Special Guest
          </span>
        )}
      </div>
      {isHeadliner && (
        <span className="text-[0.5rem] font-black tracking-[0.2em] uppercase opacity-70" style={{ color: "#a855f7" }}>
          HEADLINER
        </span>
      )}
    </div>
  );
}

function FormCard({
  email, phone, status, errorMsg, onEmailChange, onPhoneChange, onSubmit,
}: {
  email: string; phone: string; status: "idle" | "loading" | "error";
  errorMsg: string;
  onEmailChange: (v: string) => void; onPhoneChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(20,5,35,0.96) 0%, rgba(8,0,18,0.98) 100%)",
        border: "1px solid rgba(147,51,234,0.22)",
        boxShadow: "0 0 60px rgba(147,51,234,0.08), 0 24px 80px rgba(0,0,0,0.85)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #9333ea, transparent)" }} />

      <div className="p-6 sm:p-8">
        <h2
          className="font-black text-white text-center mb-1 tracking-[-0.02em] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1rem, 3.5vw, 1.3rem)" }}
        >
          Înscrie-te în tombolă
        </h2>
        <p className="text-center text-xs mb-6 tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>
          Completează formularul și intri automat în tragerea la sorți
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="tu@email.com"
          />
          <InputField
            label="Număr de Telefon"
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            placeholder="+40 7XX XXX XXX"
          />

          {status === "error" && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold"
              style={{ background: "rgba(127,29,29,0.3)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 rounded-xl font-black text-white text-sm tracking-[0.12em] uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 0 20px rgba(147,51,234,0.35), 0 0 60px rgba(147,51,234,0.2)",
            }}
            onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner />
                Se procesează...
              </span>
            ) : "Înscrie-mă →"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label, type, value, onChange, placeholder,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-[0.62rem] font-black tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl text-white text-sm font-semibold outline-none transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'Montserrat', sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.border = "1px solid rgba(147,51,234,0.55)";
          e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.1)";
          e.target.style.background = "rgba(255,255,255,0.06)";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid rgba(255,255,255,0.08)";
          e.target.style.boxShadow = "none";
          e.target.style.background = "rgba(255,255,255,0.04)";
        }}
      />
    </div>
  );
}

function SuccessCard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden text-center py-10 px-8"
      style={{
        background: "linear-gradient(135deg, rgba(20,5,35,0.96) 0%, rgba(8,0,18,0.98) 100%)",
        border: "1px solid rgba(147,51,234,0.4)",
        boxShadow: "0 0 80px rgba(147,51,234,0.18), 0 24px 80px rgba(0,0,0,0.85)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #9333ea, transparent)" }} />

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 0 30px rgba(147,51,234,0.5)" }}
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2
        className="font-black text-white uppercase tracking-[-0.02em] mb-2"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(1.3rem, 5vw, 1.7rem)" }}
      >
        Ești înscris!
      </h2>
      <p className="text-sm mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
        Te-ai înregistrat cu succes.
      </p>
      <p className="text-xs font-black tracking-wide uppercase" style={{ color: "#a855f7" }}>
        13 Iunie · Romaero
      </p>

      <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="tracking-wide mb-4" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.62rem" }}>
          Câștigătorii vor fi contactați înainte de eveniment ✨
        </p>

        <p className="font-black text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem" }}>
          ⚡ Line-up-ul merită împărțit.
        </p>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
          Trimite unui prieten care ar veni cu tine.
        </p>
        <WhatsAppShareButton />
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

const WA_MESSAGE = `ROMAERO TAKEOVER: 13 IUNIE Punem la bătaie 10 invitații pentru tine!

Vrei să prinzi loc pe dancefloor când pică beat-ul?
Completează formularul de mai jos și poți câștiga una din cele 10 invitații gratuite pe care le oferim: Link Formular: https://ameform.vercel.app/

Aducem la București un line-up care va face istorie:
FRANKY RIZARDO
MASON COLLECTIVE
ELBIO & DENIS
ANDREA
SAMBO b2b HRISTWO

Good to know: Accesul cu invitația se face exclusiv între orele 22:00 și 00:00. Nu întârzia!
Let's make it a night to remember!

Contact rezervări: +40 723 623 862`;

function WhatsAppShareButton() {
  const url = `https://wa.me/?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-black text-white text-sm tracking-[0.08em] uppercase transition-all duration-200"
      style={{
        background: "rgba(37,211,102,0.1)",
        border: "1px solid rgba(37,211,102,0.3)",
        fontFamily: "'Montserrat', sans-serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.18)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,211,102,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.1)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,211,102,0.3)";
      }}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span style={{ color: "#25D366" }}>Trimite mai departe pe WhatsApp</span>
    </a>
  );
}
