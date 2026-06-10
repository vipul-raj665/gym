import { useEffect, useRef, useState } from "react";
import {
  Dumbbell,
  Flame,
  Heart,
  Apple,
  Activity,
  Timer,
  Trophy,
  Users,
  ShieldCheck,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ChevronDown,
  Check,
  MessageCircle,
  ArrowRight,
  PlayCircle,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";
import trainer3 from "@/assets/trainer-3.jpg";
import facility from "@/assets/facility.jpg";
import functional from "@/assets/functional.jpg";
import cardio from "@/assets/cardio.jpg";
import recovery from "@/assets/recovery.jpg";
import transform1 from "@/assets/transform-1.jpg";
import transform2 from "@/assets/transform-2.jpg";
import transform3 from "@/assets/transform-3.jpg";

const SITE = {
  name: "IRONFORGE",
  tagline: "Premium Fitness Club",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: "919876543210",
  email: "hello@ironforge.fit",
  address: "12 Linking Road, Bandra West, Mumbai 400050",
};

/* ---------- Reusable ---------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="max-w-3xl mb-12 md:mb-16 mx-auto text-center">
      <div className="gap-2 glass inline-flex items-center px-3 py-1 rounded-full text-primary text-xs tracking-[0.2em] uppercase">
        <span className="bg-primary rounded-full size-1.5" />
        {kicker}
      </div>
      <h2 className="font-display leading-[0.95] md:text-6xl mt-5 text-4xl uppercase">{title}</h2>
      {sub && (
        <p className="leading-relaxed md:text-lg mt-5 text-base text-muted-foreground">{sub}</p>
      )}
    </div>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  const links = [
    ["Programs", "#programs"],
    ["Trainers", "#trainers"],
    ["Pricing", "#pricing"],
    ["Facilities", "#facilities"],
    ["Results", "#results"],
    ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]" : ""}`}
        >
          <a href="#top" className="flex gap-2.5 items-center">
            <span className="btn-ember grid place-items-center rounded-lg size-9">
              <Dumbbell className="size-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-2xl tracking-[0.18em]">
              IRON<span className="text-gradient-ember">FORGE</span>
            </span>
          </a>
          <nav aria-label="Primary" className="gap-8 hidden items-center lg:flex">
            {links.map(([l, h]) => (
              <a
                key={h}
                href={h}
                className="after:-bottom-1.5 after:absolute after:bg-primary after:duration-300 after:h-px after:left-0 after:transition-all after:w-0 hover:after:w-full hover:text-primary relative text-foreground/80 text-sm transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="gap-3 hidden items-center md:flex">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="flex gap-2 hover:text-primary items-center text-foreground/80 text-sm"
            >
              <Phone className="size-4" />
              {SITE.phone}
            </a>
            <a
              href="#pricing"
              className="btn-ember font-semibold gap-2 inline-flex items-center px-5 py-2.5 rounded-xl text-sm"
            >
              Join Now <ArrowRight className="size-4" />
            </a>
          </div>
          <button
            aria-label="Toggle menu"
            className="glass grid lg:hidden place-items-center rounded-xl size-11"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
        {open && (
          <div className="animate-float-up glass-strong lg:hidden mt-2 p-5 rounded-2xl space-y-3">
            {links.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="block hover:text-primary py-2 text-foreground/90"
              >
                {l}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="btn-ember font-semibold inline-flex justify-center mt-2 px-5 py-3 rounded-xl w-full"
            >
              Join Now
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="flex items-end md:pb-24 min-h-svh noise overflow-hidden pb-16 pt-28 relative"
    >
      <img
        src={heroImg}
        alt="Athlete training with barbell at IRONFORGE premium fitness club"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 object-center object-cover size-full"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />

      <div className="container-x relative w-full z-10">
        <div className="max-w-4xl">
          <Reveal>
            <div className="gap-2 glass inline-flex items-center px-3 py-1 rounded-full text-primary text-xs tracking-[0.25em] uppercase">
              <Sparkles className="size-3" /> Mumbai's #1 Premium Fitness Club
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display leading-[0.88] mt-6 text-[clamp(2.75rem,8vw,7rem)] tracking-tight uppercase">
              Forge a body <br />
              <span className="text-gradient-ember">built to last.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="leading-relaxed max-w-xl md:text-lg mt-6 text-base text-foreground/75">
              Elite coaching. Luxury facilities. Results-driven programs in strength, functional
              fitness, weight loss and transformation — engineered for ambitious people who refuse
              average.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#pricing"
                className="btn-ember font-semibold gap-2 inline-flex items-center px-6 py-3.5 rounded-xl"
              >
                Join Now <ArrowRight className="size-4" />
              </a>
              <a
                href="#trial"
                className="backdrop-blur-md btn-outline-ember font-semibold gap-2 inline-flex items-center px-6 py-3.5 rounded-xl"
              >
                <PlayCircle className="size-5" /> Claim Free Trial
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={500}>
          <dl className="gap-3 grid grid-cols-2 md:gap-6 md:grid-cols-4 md:mt-20 mt-14">
            {[
              { v: 12000, s: "+", l: "Active Members" },
              { v: 45, s: "+", l: "Expert Coaches" },
              { v: 8500, s: "+", l: "Transformations" },
              { v: 12, s: "yrs", l: "Building Champions" },
            ].map((s) => (
              <div key={s.l} className="glass md:p-6 p-4 rounded-2xl">
                <dt className="font-display md:text-5xl text-3xl text-gradient-gold">
                  <AnimatedNumber value={s.v} suffix={s.s} />
                </dt>
                <dd className="md:text-sm mt-1 text-muted-foreground text-xs tracking-widest uppercase">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
    "Strength",
    "Hypertrophy",
    "Conditioning",
    "Mobility",
    "Nutrition",
    "Recovery",
    "Performance",
    "Transformation",
  ];
  const row = [...items, ...items];
  return (
    <div className="bg-surface/40 border-border/60 border-y overflow-hidden py-8 relative">
      <div className="animate-marquee flex gap-12 w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display md:text-4xl text-2xl text-foreground/40 tracking-[0.18em]"
          >
            {t} <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Why Choose Us ---------- */
function WhyUs() {
  const items = [
    {
      icon: Trophy,
      title: "Proven Results",
      desc: "8,500+ documented transformations across strength, fat loss and athletic performance.",
    },
    {
      icon: Users,
      title: "Elite Coaches",
      desc: "Internationally certified trainers (NSCA, ACE, K11) with 5–15 years of experience.",
    },
    {
      icon: ShieldCheck,
      title: "Science-Backed",
      desc: "Periodised programs, body composition tracking and quarterly performance reviews.",
    },
    {
      icon: Sparkles,
      title: "Luxury Experience",
      desc: "5-star facility, sauna recovery lounge, premium locker rooms and concierge service.",
    },
  ];
  return (
    <section className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Why IRONFORGE"
          title={
            <>
              The standard for <span className="text-gradient-ember">serious training</span>
            </>
          }
          sub="We don't sell memberships — we deliver outcomes. Every program is built around your goals, biometrics and lifestyle."
        />
        <div className="gap-5 grid lg:grid-cols-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <article className="card-premium group h-full p-7">
                <div className="btn-ember grid group-hover:rotate-6 mb-5 place-items-center rounded-xl size-12 transition-transform">
                  <it.icon className="size-6" strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-xl tracking-wide uppercase">{it.title}</h3>
                <p className="leading-relaxed mt-3 text-muted-foreground text-sm">{it.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Programs ---------- */
function Programs() {
  const progs = [
    {
      icon: Flame,
      title: "Weight Loss",
      desc: "Calorie-precise fat-loss protocols combining HIIT, strength and nutrition coaching.",
      tag: "8–16 weeks",
    },
    {
      icon: Dumbbell,
      title: "Muscle Building",
      desc: "Periodised hypertrophy programming designed to add lean mass — fast and sustainably.",
      tag: "12 weeks",
    },
    {
      icon: Users,
      title: "Personal Training",
      desc: "1-on-1 elite coaching, fully bespoke programming, weekly check-ins and accountability.",
      tag: "1-on-1",
    },
    {
      icon: Activity,
      title: "Functional Fitness",
      desc: "Movement-first training using kettlebells, sleds, ropes and bodyweight for real-world strength.",
      tag: "All levels",
    },
    {
      icon: Trophy,
      title: "Strength Training",
      desc: "Powerlifting-inspired barbell programs to build raw strength in the squat, bench and deadlift.",
      tag: "Intermediate+",
    },
    {
      icon: Heart,
      title: "Cardio Training",
      desc: "Zone-2 endurance, VO₂ intervals and metabolic conditioning on premium cardio equipment.",
      tag: "Beginner+",
    },
    {
      icon: Apple,
      title: "Nutrition Coaching",
      desc: "Macro-based meal planning, supplement guidance and behaviour coaching by certified dietitians.",
      tag: "Monthly",
    },
  ];
  return (
    <section id="programs" className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Training Programs"
          title={
            <>
              Programs engineered <span className="text-gradient-ember">for every goal</span>
            </>
          }
          sub="Whether you're chasing your first pull-up or your first 200kg deadlift, there's a coached program with your name on it."
        />
        <div className="gap-5 grid lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          {progs.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="card-premium h-full overflow-hidden p-7 relative">
                <div className="-right-10 -top-10 absolute bg-primary/10 blur-2xl rounded-full size-32" />
                <p.icon className="size-9 text-primary" strokeWidth={1.8} />
                <h3 className="font-display mt-5 text-2xl uppercase">{p.title}</h3>
                <p className="leading-relaxed mt-3 text-muted-foreground text-sm">{p.desc}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-[11px] text-primary/80 tracking-[0.2em] uppercase">
                    {p.tag}
                  </span>
                  <a
                    href="#trial"
                    className="font-semibold gap-1 hover:gap-2 inline-flex items-center text-primary text-sm transition-all"
                  >
                    Learn more <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Trainers ---------- */
function Trainers() {
  const list = [
    {
      img: trainer1,
      name: "Rohan Mehta",
      role: "Head Strength Coach",
      exp: "12 years",
      certs: ["NSCA-CSCS", "USA Powerlifting"],
      specs: ["Powerlifting", "Hypertrophy"],
    },
    {
      img: trainer2,
      name: "Aisha Kapoor",
      role: "Performance Coach",
      exp: "9 years",
      certs: ["ACE-CPT", "Precision Nutrition L2"],
      specs: ["Fat Loss", "Women's Health"],
    },
    {
      img: trainer3,
      name: "Vikram Singh",
      role: "Functional Fitness Lead",
      exp: "11 years",
      certs: ["K11", "CrossFit L3"],
      specs: ["Mobility", "Athleticism"],
    },
  ];
  return (
    <section id="trainers" className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Coaches"
          title={
            <>
              Train with <span className="text-gradient-ember">the best in India</span>
            </>
          }
          sub="Our coaching team blends international certifications with years of competitive experience."
        />
        <div className="gap-6 grid md:grid-cols-3">
          {list.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <article className="card-premium group overflow-hidden p-0 relative rounded-2xl">
                <div className="aspect-4/5 overflow-hidden relative">
                  <img
                    src={t.img}
                    alt={`${t.name}, ${t.role} at IRONFORGE`}
                    width={800}
                    height={1024}
                    loading="lazy"
                    className="duration-700 group-hover:scale-105 object-cover size-full transition-transform"
                  />
                  <div className="absolute bg-linear-to-t from-card inset-0 to-transparent via-card/40" />
                  <div className="absolute glass left-4 px-3 py-1 rounded-full text-[11px] top-4 tracking-widest uppercase">
                    {t.exp} Exp.
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl uppercase">{t.name}</h3>
                  <p className="mt-1 text-primary text-sm tracking-widest uppercase">{t.role}</p>
                  <div className="hairline my-4" />
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Certifications: </span>
                      {t.certs.join(" · ")}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Specialises in: </span>
                      {t.specs.join(", ")}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const plans = [
    {
      name: "Monthly",
      price: 4999,
      per: "/month",
      desc: "Full club access, all classes, no commitment.",
      feats: ["Unlimited gym access", "Group classes", "Locker access", "App workouts"],
      cta: "Get Started",
    },
    {
      name: "Quarterly",
      price: 12999,
      per: "/3 months",
      desc: "Save 13%. Most popular short-term plan.",
      feats: [
        "Everything in Monthly",
        "1 Personal training session",
        "Initial body composition",
        "Nutrition starter kit",
      ],
      cta: "Choose Quarterly",
    },
    {
      name: "Half-Yearly",
      price: 22999,
      per: "/6 months",
      desc: "Save 23%. The sweet spot for results.",
      feats: [
        "Everything in Quarterly",
        "4 PT sessions",
        "Quarterly InBody scan",
        "Recovery lounge access",
      ],
      cta: "Choose Half-Year",
      featured: true,
    },
    {
      name: "Annual",
      price: 39999,
      per: "/year",
      desc: "Best value. Maximum savings + premium perks.",
      feats: [
        "Everything in Half-Yearly",
        "12 PT sessions",
        "Custom nutrition plan",
        "Guest passes (4)",
        "Member events",
      ],
      cta: "Choose Annual",
    },
  ];
  return (
    <section id="pricing" className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Membership"
          title={
            <>
              Choose <span className="text-gradient-ember">your edge</span>
            </>
          }
          sub="Transparent pricing. No hidden fees. Cancel anytime in the first 7 days, no questions asked."
        />
        <div className="gap-5 grid md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article
                className={`relative card-premium p-7 h-full flex flex-col ${p.featured ? "ring-1 ring-primary/60" : ""}`}
              >
                {p.featured && (
                  <div className="-top-3 -translate-x-1/2 absolute btn-ember font-bold left-1/2 px-3 py-1 rounded-full text-[11px] tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-xl tracking-wider uppercase">{p.name}</h3>
                <p className="mt-1 text-muted-foreground text-sm">{p.desc}</p>
                <div className="flex gap-1 items-baseline mt-6">
                  <span className="font-display text-5xl text-gradient-gold">
                    ₹{p.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">{p.per}</span>
                </div>
                <ul className="flex-1 mt-6 space-y-3 text-sm">
                  {p.feats.map((f) => (
                    <li key={f} className="flex gap-2 items-start">
                      <span className="bg-primary/15 grid mt-0.5 place-items-center rounded-full size-5 text-primary">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#trial"
                  className={`mt-7 inline-flex justify-center px-5 py-3 rounded-xl font-semibold ${p.featured ? "btn-ember" : "btn-outline-ember"}`}
                >
                  {p.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Transformations ---------- */
function Transformations() {
  const items = [
    {
      img: transform1,
      name: "Arjun, 28",
      stat: "-14 kg in 16 weeks",
      note: "Lost fat, built visible abs, ran his first 10K.",
    },
    {
      img: transform2,
      name: "Priya, 32",
      stat: "-9 kg · +4 kg lean mass",
      note: "Reclaimed her energy post-pregnancy.",
    },
    {
      img: transform3,
      name: "Karan, 35",
      stat: "+8 kg muscle · 180kg DL",
      note: "Hit a 2x bodyweight deadlift for the first time.",
    },
  ];
  return (
    <section id="results" className="bg-surface/30 relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Real Results"
          title={
            <>
              Transformations that <span className="text-gradient-ember">speak for themselves</span>
            </>
          }
          sub="Verified member journeys. Coached programs. No filters, no shortcuts."
        />
        <div className="gap-6 grid md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.name} delay={i * 100}>
              <figure className="card-premium group overflow-hidden p-0">
                <div className="aspect-5/4 overflow-hidden">
                  <img
                    src={it.img}
                    alt={`Body transformation: ${it.name} — ${it.stat}`}
                    width={1000}
                    height={800}
                    loading="lazy"
                    className="duration-700 group-hover:scale-105 object-cover size-full transition-transform"
                  />
                </div>
                <figcaption className="p-6">
                  <div className="font-display text-xl uppercase">{it.name}</div>
                  <div className="mt-1 text-primary text-sm tracking-widest uppercase">
                    {it.stat}
                  </div>
                  <p className="mt-3 text-muted-foreground text-sm">{it.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mt-14">
          {[
            ["8,500+", "Transformations"],
            ["96%", "Goal completion"],
            ["4.9★", "Member rating"],
            ["12 yrs", "Coaching excellence"],
          ].map(([v, l]) => (
            <div key={l} className="glass p-5 rounded-2xl text-center">
              <div className="font-display md:text-4xl text-3xl text-gradient-gold">{v}</div>
              <div className="mt-1 text-muted-foreground text-xs tracking-widest uppercase">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Facilities ---------- */
function Facilities() {
  const items = [
    {
      img: facility,
      title: "Premium Equipment Floor",
      desc: "Latest Hammer Strength, Eleiko & Technogym across 12,000 sq ft.",
    },
    {
      img: functional,
      title: "Functional Training Zone",
      desc: "Turf lane, sleds, ropes, kettlebells & plyo for athletic conditioning.",
    },
    {
      img: cardio,
      title: "Skyline Cardio Zone",
      desc: "Treadmills, bikes & stair-climbers facing floor-to-ceiling windows.",
    },
    {
      img: recovery,
      title: "Recovery Lounge",
      desc: "Infrared sauna, massage chairs, cold plunge & Normatec boots.",
    },
  ];
  return (
    <section id="facilities" className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Facilities"
          title={
            <>
              A club built for <span className="text-gradient-ember">elite training</span>
            </>
          }
          sub="Every square foot is engineered for performance, recovery and the experience of training in a world-class space."
        />
        <div className="gap-5 grid md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <figure className="card-premium group h-72 md:h-96 overflow-hidden p-0 relative rounded-2xl">
                <img
                  src={it.img}
                  alt={it.title}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="duration-700 group-hover:scale-105 object-cover size-full transition-transform"
                />
                <div className="absolute bg-linear-to-t from-background inset-0 to-transparent via-background/30" />
                <figcaption className="absolute bottom-0 left-0 p-6 right-0">
                  <h3 className="font-display md:text-3xl text-2xl uppercase">{it.title}</h3>
                  <p className="max-w-md mt-1 text-foreground/80 text-sm">{it.desc}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
          <Reveal>
            <div className="card-premium flex flex-col h-full justify-center p-7">
              <h3 className="font-display text-2xl uppercase">Modern Locker Rooms</h3>
              <p className="mt-3 text-muted-foreground text-sm">
                Hotel-grade locker rooms with rainfall showers, premium toiletries, hairdryers and
                secure digital lockers.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-premium flex flex-col h-full justify-center p-7">
              <h3 className="font-display text-2xl uppercase">Members' Café</h3>
              <p className="mt-3 text-muted-foreground text-sm">
                Cold-pressed juices, post-workout protein bowls and macro-tracked meals prepared
                on-site.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    {
      name: "Nikhil R.",
      role: "Founder, Tech Startup",
      text: "I've tried five gyms in Mumbai. IRONFORGE is in a different league — the coaching, the facility and the energy are unmatched.",
      rating: 5,
    },
    {
      name: "Sneha M.",
      role: "Marketing Director",
      text: "Lost 11 kg in 4 months without crash dieting. The nutrition coaching made it sustainable for the first time in my life.",
      rating: 5,
    },
    {
      name: "Aman K.",
      role: "Banker",
      text: "The 5am crew is unreal. I deadlift more than I ever have and I'm not even sore the next day thanks to the recovery lounge.",
      rating: 5,
    },
    {
      name: "Riya S.",
      role: "Doctor",
      text: "Coaches actually understand programming. Not just counting reps. My squat went from 40kg to 100kg in 9 months.",
      rating: 5,
    },
    {
      name: "Faisal A.",
      role: "Entrepreneur",
      text: "Worth every rupee. The concierge service, the trainers, the equipment — everything feels premium without being pretentious.",
      rating: 5,
    },
    {
      name: "Ananya P.",
      role: "Architect",
      text: "I finally enjoy working out. The functional zone is my happy place. Highly recommend the personal training package.",
      rating: 5,
    },
  ];
  return (
    <section className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Members Speak"
          title={
            <>
              Loved by <span className="text-gradient-ember">12,000+ members</span>
            </>
          }
          sub="Rated 4.9 on Google. Featured in Vogue India, Men's Health and GQ."
        />
        <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <article className="card-premium h-full p-7">
                <div className="flex gap-0.5 mb-4 text-primary">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="fill-primary size-4" />
                  ))}
                </div>
                <p className="leading-relaxed text-foreground/85">"{t.text}"</p>
                <div className="hairline my-5" />
                <div className="flex gap-3 items-center">
                  <div className="btn-ember font-bold grid place-items-center rounded-full size-10 text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const qs = [
    {
      q: "Do you offer a free trial?",
      a: "Yes. Every prospective member gets a complimentary trial session with a coach, a facility tour and a 1:1 goal-setting consultation.",
    },
    {
      q: "Is IRONFORGE beginner-friendly?",
      a: "Absolutely. Around 40% of our members start as complete beginners. Every program is scaled to your current level by your coach.",
    },
    {
      q: "What are the membership inclusions?",
      a: "All memberships include unlimited gym access, group classes, locker rooms and the recovery lounge access (Half-Yearly+).",
    },
    {
      q: "Can I freeze my membership?",
      a: "Yes, you can freeze your membership for up to 30 days a year for medical or travel reasons at no charge.",
    },
    {
      q: "Do you offer personal training?",
      a: "Yes — 1-on-1 with NSCA / ACE / K11 certified coaches. PT credits are included from the Quarterly plan onwards.",
    },
    {
      q: "What are your operating hours?",
      a: "Monday–Friday: 5am–11pm. Saturday & Sunday: 6am–10pm. The recovery lounge opens 30 minutes after the gym.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative section-pad">
      <div className="container-x max-w-4xl">
        <SectionHeader
          kicker="FAQ"
          title={
            <>
              Questions, <span className="text-gradient-ember">answered</span>
            </>
          }
        />
        <div className="space-y-3">
          {qs.map((it, i) => (
            <Reveal key={it.q} delay={i * 40}>
              <div className="card-premium overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex gap-4 items-center justify-between md:p-6 p-5 text-left w-full"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold md:text-lg text-base">{it.q}</span>
                  <ChevronDown
                    className={`size-5 text-primary transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="duration-500 ease-out grid transition-all"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="leading-relaxed md:px-6 pb-6 px-5 text-muted-foreground">
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog ---------- */
function Blog() {
  const posts = [
    {
      cat: "Workout Guides",
      title: "The 5x5 Strength Blueprint for Busy Professionals",
      read: "6 min read",
      img: facility,
    },
    {
      cat: "Nutrition",
      title: "How to Build a Macro Plan You'll Actually Stick To",
      read: "8 min read",
      img: functional,
    },
    {
      cat: "Fat Loss",
      title: "Why Steps Beat Cardio for Sustainable Weight Loss",
      read: "5 min read",
      img: cardio,
    },
  ];
  return (
    <section className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="From the Journal"
          title={
            <>
              Insights from <span className="text-gradient-ember">our coaches</span>
            </>
          }
          sub="Science-backed articles on strength training, fat loss, nutrition and recovery."
        />
        <div className="gap-6 grid md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="card-premium flex flex-col group h-full overflow-hidden p-0">
                <div className="aspect-16/10 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className="duration-700 group-hover:scale-105 object-cover size-full transition-transform"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[11px] text-primary tracking-[0.2em] uppercase">
                    {p.cat} · {p.read}
                  </div>
                  <h3 className="font-display leading-tight mt-3 text-xl uppercase">{p.title}</h3>
                  <a
                    href="#"
                    className="gap-1 hover:gap-2 inline-flex items-center mt-5 text-primary text-sm transition-all"
                  >
                    Read article <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="relative section-pad">
      <div className="container-x">
        <SectionHeader
          kicker="Visit Us"
          title={
            <>
              Step inside <span className="text-gradient-ember">IRONFORGE</span>
            </>
          }
          sub="Book a tour or claim your free trial. Our concierge team will reach out within 30 minutes."
        />
        <div className="gap-6 grid lg:grid-cols-2">
          <Reveal>
            <form
              id="trial"
              className="card-premium p-7"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We'll be in touch within 30 minutes.");
              }}
            >
              <h3 className="font-display text-2xl uppercase">Claim your free trial</h3>
              <p className="mt-1 text-muted-foreground text-sm">
                Fill the form — first session is on us.
              </p>
              <div className="gap-4 grid mt-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    Full name
                  </span>
                  <input
                    required
                    maxLength={80}
                    className="bg-input/60 border border-border focus:border-primary mt-1 outline-none px-4 py-3 rounded-lg transition w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    Phone
                  </span>
                  <input
                    required
                    type="tel"
                    maxLength={20}
                    pattern="[0-9+\s-]{7,20}"
                    className="bg-input/60 border border-border focus:border-primary mt-1 outline-none px-4 py-3 rounded-lg transition w-full"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    maxLength={120}
                    className="bg-input/60 border border-border focus:border-primary mt-1 outline-none px-4 py-3 rounded-lg transition w-full"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    Goal
                  </span>
                  <select className="bg-input/60 border border-border focus:border-primary mt-1 outline-none px-4 py-3 rounded-lg transition w-full">
                    <option>Weight loss</option>
                    <option>Muscle building</option>
                    <option>Strength training</option>
                    <option>Functional fitness</option>
                    <option>General fitness</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    Message (optional)
                  </span>
                  <textarea
                    maxLength={500}
                    rows={3}
                    className="bg-input/60 border border-border focus:border-primary mt-1 outline-none px-4 py-3 resize-none rounded-lg transition w-full"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="btn-ember font-semibold gap-2 inline-flex items-center justify-center mt-6 px-6 py-3.5 rounded-xl w-full"
              >
                Book Free Trial <ArrowRight className="size-4" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col h-full space-y-5">
              <div className="card-premium gap-5 grid p-7 sm:grid-cols-2">
                <a href={`tel:${SITE.phoneRaw}`} className="flex gap-3 group">
                  <Phone className="mt-1 size-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground text-xs tracking-widest uppercase">
                      Call
                    </div>
                    <div className="font-semibold group-hover:text-primary transition">
                      {SITE.phone}
                    </div>
                  </div>
                </a>
                <a href={`mailto:${SITE.email}`} className="flex gap-3 group">
                  <Mail className="mt-1 size-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground text-xs tracking-widest uppercase">
                      Email
                    </div>
                    <div className="font-semibold group-hover:text-primary transition">
                      {SITE.email}
                    </div>
                  </div>
                </a>
                <div className="flex gap-3">
                  <MapPin className="mt-1 size-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground text-xs tracking-widest uppercase">
                      Address
                    </div>
                    <div className="font-semibold">{SITE.address}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-1 size-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground text-xs tracking-widest uppercase">
                      Hours
                    </div>
                    <div className="font-semibold">
                      Mon–Fri · 5am–11pm
                      <br />
                      Sat–Sun · 6am–10pm
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-premium flex-1 min-h-70 overflow-hidden p-0 relative">
                <iframe
                  title="IRONFORGE location"
                  src="https://www.google.com/maps?q=Bandra+West+Mumbai&output=embed"
                  loading="lazy"
                  className="absolute contrast-110 grayscale-40 inset-0 opacity-90 size-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative section-pad">
      <div className="container-x">
        <Reveal>
          <div className="card-premium md:p-20 overflow-hidden p-10 relative rounded-3xl text-center">
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: "var(--gradient-radial)" }}
            />
            <div className="-right-20 -top-20 absolute bg-primary/20 blur-3xl rounded-full size-80" />
            <div className="relative">
              <div className="text-primary text-xs tracking-[0.3em] uppercase">Start today</div>
              <h2 className="font-display leading-[0.95] md:text-7xl mt-4 text-4xl uppercase">
                Stop scrolling. <br />
                <span className="text-gradient-ember">Start training.</span>
              </h2>
              <p className="max-w-xl mt-6 mx-auto text-muted-foreground">
                Your free trial is one click away. The next 12 weeks can change everything.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <a
                  href="#trial"
                  className="btn-ember font-semibold gap-2 inline-flex items-center px-7 py-4 rounded-xl"
                >
                  Join Today <ArrowRight className="size-4" />
                </a>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="btn-outline-ember font-semibold gap-2 inline-flex items-center px-7 py-4 rounded-xl"
                >
                  <Phone className="size-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-surface/40 border-border/60 border-t md:pb-12 pb-32 pt-20">
      <div className="container-x">
        <div className="gap-10 grid lg:grid-cols-4 md:grid-cols-2">
          <div>
            <a href="#top" className="flex gap-2.5 items-center">
              <span className="btn-ember grid place-items-center rounded-lg size-9">
                <Dumbbell className="size-5" />
              </span>
              <span className="font-display text-2xl tracking-[0.18em]">
                IRON<span className="text-gradient-ember">FORGE</span>
              </span>
            </a>
            <p className="max-w-xs mt-4 text-muted-foreground text-sm">
              Mumbai's premium fitness club. Elite coaching, world-class facilities, real results.
            </p>
            <div className="flex gap-2 mt-5">
              {[Instagram, Facebook, Youtube, Twitter].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="glass grid hover:text-primary place-items-center rounded-lg size-10 transition"
                >
                  <I className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {[
                ["Programs", "#programs"],
                ["Trainers", "#trainers"],
                ["Pricing", "#pricing"],
                ["Facilities", "#facilities"],
                ["Transformations", "#results"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="hover:text-primary transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display mb-4 text-sm tracking-widest uppercase">Contact</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 text-primary" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 text-primary" />
                <a href={`tel:${SITE.phoneRaw}`} className="hover:text-primary">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 text-primary" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display mb-4 text-sm tracking-widest uppercase">Newsletter</h4>
            <p className="text-muted-foreground text-sm">
              Training tips, member offers and event invites.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
              className="flex gap-2 mt-3"
            >
              <input
                required
                type="email"
                placeholder="Your email"
                maxLength={120}
                className="bg-input/60 border border-border flex-1 focus:border-primary outline-none px-3 py-2.5 rounded-lg text-sm"
              />
              <button className="btn-ember font-semibold px-4 py-2.5 rounded-lg text-sm">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="flex flex-col gap-3 justify-between md:flex-row text-muted-foreground text-xs">
          <p>© {new Date().getFullYear()} IRONFORGE Fitness Club. All rights reserved.</p>
          <p>Crafted for athletes who refuse average.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating + Mobile CTAs ---------- */
function FloatingActions() {
  return (
    <>
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=Hi%20IRONFORGE%2C%20I%27d%20like%20a%20free%20trial`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="bottom-24 fixed grid md:bottom-6 place-items-center right-5 rounded-full shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] size-14 text-white z-40"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
      >
        <MessageCircle className="size-6" />
      </a>
      <div className="border-border/60 border-t bottom-0 fixed glass-strong inset-x-0 md:hidden p-3 z-40">
        <div className="flex gap-2">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="btn-outline-ember flex-1 font-semibold gap-2 inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm"
          >
            <Phone className="size-4" /> Call Now
          </a>
          <a
            href="#trial"
            className="btn-ember flex-1 font-semibold gap-2 inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm"
          >
            Free Trial <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </>
  );
}

/* ---------- Page ---------- */
export function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Marquee />
      <WhyUs />
      <Programs />
      <Trainers />
      <Pricing />
      <Transformations />
      <Facilities />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      <FinalCTA />
      <Footer />
      <FloatingActions />
    </main>
  );
}
