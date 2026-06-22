import { createFileRoute } from "@tanstack/react-router";
import heroStudio from "@/assets/hero-studio.jpg";
import aboutSunflowers from "@/assets/about-sunflowers.jpg";
import wTexture from "@/assets/workshop-texture.jpg";
import wCeramic from "@/assets/workshop-ceramic.jpg";
import wCanvas from "@/assets/workshop-canvas.jpg";
import wKids from "@/assets/workshop-kids.jpg";
import wTherapy from "@/assets/workshop-therapy.jpg";
import wDrawing from "@/assets/workshop-drawing.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Créart — Atelier d'Art à Tétouan" },
      { name: "description", content: "Atelier artistique à Tétouan dédié aux enfants et aux adultes. Cours de dessin, peinture, céramique, art-thérapie et ateliers créatifs." },
      { property: "og:title", content: "Studio Créart — Atelier d'Art à Tétouan" },
      { property: "og:description", content: "Un lieu d'apprentissage, d'expression et de découverte au cœur de Tétouan." },
      { property: "og:image", content: heroStudio },
    ],
  }),
  component: Index,
});

const PHONE = "+212708830154";
const PHONE_DISPLAY = "+212 708 830 154";
const EMAIL = "creartstudiio@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/studiocreart/";
const ADDRESS = "Bureaux Chams Doha, 4e Étage, N20 — Wilaya Center, Tétouan 93000";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Cr%C3%A9art+Studio+Tetouan";

const workshops = [
  {
    title: "Canvas Painting",
    tag: "Acrylique sur toile",
    desc: "Explorez la couleur et la composition sur toile vierge — fleurs, portraits, abstrait. Tous niveaux.",
    price: "350 DH",
    duration: "2h",
    img: wCanvas,
  },
  {
    title: "Ceramic Painting",
    tag: "Céramique peinte main",
    desc: "Repartez avec une pièce unique : assiettes, bols et plats peints à la main, cuits au four.",
    price: "400 DH",
    duration: "2h",
    img: wCeramic,
  },
  {
    title: "Texture Art Painting",
    tag: "Empâtement & relief",
    desc: "Une technique sensorielle où la matière prend vie — fleurs, papillons, motifs en relief.",
    price: "380 DH",
    duration: "2h",
    img: wTexture,
  },
  {
    title: "Cours de Dessin & Peinture",
    tag: "Cours hebdomadaires",
    desc: "Apprenez les fondamentaux : observation, perspective, ombres, couleur. Progression suivie.",
    price: "Dès 600 DH / mois",
    duration: "1h30 × 4",
    img: wDrawing,
  },
  {
    title: "Art Therapy",
    tag: "Bien-être par l'art",
    desc: "Sessions guidées pour libérer l'expression, apaiser l'esprit et renouer avec la créativité.",
    price: "450 DH",
    duration: "1h30",
    img: wTherapy,
  },
  {
    title: "Programmes pour Enfants",
    tag: "Ateliers Kids",
    desc: "Un espace joyeux où les enfants découvrent peinture, collage et imagination — encadrement attentif.",
    price: "300 DH",
    duration: "1h30",
    img: wKids,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Mission />
      <Workshops />
      <Gallery />
      <Feedback />
      <Reserve />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">Studio</span>
          <span className="font-script text-xl text-secondary -ml-1">Creart</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#about" className="hover:text-primary transition-colors">À propos</a>
          <a href="#mission" className="hover:text-primary transition-colors">Mission</a>
          <a href="#workshops" className="hover:text-primary transition-colors">Ateliers</a>
          <a href="#gallery" className="hover:text-primary transition-colors">Galerie</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:bg-primary/90 transition-all hover:scale-105"
        >
          Réserver
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroStudio} alt="Atelier Studio Creart" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="animate-fade-up">
          <p className="font-script text-2xl text-secondary mb-4">Bienvenue à</p>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] font-black text-primary">
            Studio<br/>
            <span className="font-script font-medium text-secondary text-5xl md:text-6xl lg:text-7xl italic">Creart</span>
          </h1>
          <p className="mt-8 text-lg text-foreground/75 max-w-md leading-relaxed">
            Un atelier artistique au cœur de Tétouan, dédié aux enfants et aux adultes —
            un lieu d'apprentissage, d'expression et de découverte.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-medium shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all"
            >
              Réserver un atelier
              <span aria-hidden>→</span>
            </a>
            <a
              href="#workshops"
              className="inline-flex items-center gap-2 rounded-full border-2 border-secondary text-secondary px-8 py-4 text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-all"
            >
              Voir les ateliers
            </a>
          </div>
          <div className="mt-12 flex items-center gap-6 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <span className="text-secondary">★★★★★</span>
              <span className="font-medium">5.0</span>
            </div>
            <span className="w-px h-4 bg-border" />
            <span>Wilaya Center, Tétouan</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 text-xs tracking-[0.3em] uppercase animate-float">
        Scroll
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
          <img src={aboutSunflowers} alt="Tournesols peints" loading="lazy" width={1200} height={1400} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-script text-3xl text-secondary">Qui sommes-nous ?</p>
          <h2 className="mt-2 text-5xl md:text-6xl font-black text-primary leading-tight">
            L'art comme<br/>art de vivre.
          </h2>
          <div className="mt-8 space-y-5 text-foreground/80 leading-relaxed text-lg">
            <p>
              Studio Creart est un atelier artistique dédié aux enfants et aux adultes —
              un lieu d'apprentissage, d'expression et de découverte niché au Wilaya Center
              de Tétouan.
            </p>
            <p>
              Sous la direction d'<span className="font-medium text-foreground">Ihssan</span>,
              nous accueillons celles et ceux qui veulent renouer avec leurs mains, leur
              regard, et la matière. Aucun pré-requis : juste l'envie d'essayer.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              ["4+", "Ateliers signature"],
              ["5.0", "Note Google"],
              ["∞", "Possibilités"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 border-primary pl-4">
                <div className="font-serif text-3xl font-bold text-primary">{n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const items = [
    { t: "Développer la créativité", d: "Réveiller le geste, oser la couleur, faire confiance à l'intuition." },
    { t: "Encourager l'expression", d: "Offrir un espace bienveillant où chaque voix trouve sa forme." },
    { t: "Stimuler l'imagination", d: "Donner les outils pour rêver large, et la technique pour le réaliser." },
  ];
  return (
    <section id="mission" className="py-28 px-6 bg-card relative overflow-hidden">
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="font-script text-3xl text-secondary">Notre mission</p>
          <h2 className="mt-2 text-5xl md:text-6xl font-black text-primary">Trois promesses.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it, i) => (
            <div key={it.t} className="group relative bg-background/60 backdrop-blur rounded-2xl p-8 border border-border hover:border-primary/40 transition-all hover:-translate-y-1">
              <div className="font-serif text-6xl font-black text-secondary/20 absolute top-4 right-6">0{i+1}</div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3 relative">{it.t}</h3>
              <p className="text-foreground/70 leading-relaxed relative">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workshops() {
  return (
    <section id="workshops" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-script text-3xl text-secondary">Ce que nous proposons</p>
            <h2 className="mt-2 text-5xl md:text-6xl font-black text-primary leading-tight">Nos ateliers.</h2>
          </div>
          <p className="max-w-md text-foreground/70">
            Six expériences distinctes — choisissez la matière qui vous parle. Matériel fourni,
            ambiance conviviale, repartez toujours avec votre œuvre.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <article key={w.title} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={w.img} alt={w.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-secondary font-medium">{w.tag}</p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">{w.title}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{w.desc}</p>
                <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="font-serif text-xl font-bold text-primary">{w.price}</div>
                    <div className="text-xs text-muted-foreground">{w.duration}</div>
                  </div>
                  <a href="#contact" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                    Réserver →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [wTexture, wCeramic, wCanvas, wKids, wTherapy, wDrawing];
  return (
    <section id="gallery" className="py-28 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-script text-3xl text-secondary">Galerie</p>
          <h2 className="mt-2 text-5xl md:text-6xl font-black text-primary">Œuvres de l'atelier.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {imgs.map((src, i) => (
            <div key={i} className={`overflow-hidden rounded-xl ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}>
              <img src={src} alt={`Création ${i+1}`} loading="lazy" width={800} height={800} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feedback() {
  const testimonials = [
    {
      quote: "J'ai adoré l'ambiance et la créativité du studio. Ihssan est très patient et inspirant.",
      name: "Sara",
      role: "Élève créative",
    },
    {
      quote: "Mes enfants ont passé un moment magique. Ils sont repartis fiers de leurs œuvres !",
      name: "Youssef",
      role: "Parent satisfait",
    },
    {
      quote: "Un lieu chaleureux où on ose expérimenter. Les ateliers sont très bien organisés.",
      name: "Leila",
      role: "Artiste en herbe",
    },
  ];

  return (
    <section id="feedback" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-script text-3xl text-secondary">Témoignages</p>
          <h2 className="mt-2 text-5xl md:text-6xl font-black text-primary">Ce que disent nos participants.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-border bg-background/70 p-8 shadow-xl shadow-primary/5">
              <p className="text-lg leading-relaxed text-foreground/75">“{item.quote}”</p>
              <div className="mt-8">
                <p className="font-serif text-xl font-bold text-primary">{item.name}</p>
                <p className="text-sm uppercase tracking-[0.3em] text-secondary/80">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reserve() {
  return (
    <section id="contact" className="py-28 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-cream/10 blur-3xl" />
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="font-script text-3xl text-cream/90">Rejoignez-nous bientôt !</p>
        <h2 className="mt-2 text-5xl md:text-7xl font-black leading-tight">Réservez votre<br/>place à l'atelier.</h2>
        <p className="mt-8 text-lg text-primary-foreground/80 max-w-xl mx-auto">
          Un appel suffit. Ihssan vous répond et vous propose la prochaine séance disponible.
        </p>
        <a
          href={`tel:${PHONE}`}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-cream text-primary px-10 py-5 text-lg font-medium shadow-2xl hover:scale-105 transition-all"
        >
          <span className="text-2xl">📞</span>
          {PHONE_DISPLAY}
        </a>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
          <a href={`mailto:${EMAIL}`} className="hover:text-cream transition-colors">{EMAIL}</a>
          <span>•</span>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Itinéraire Google Maps</a>
          <span>•</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Instagram</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream/90 py-20 px-6" style={{ backgroundColor: "oklch(0.22 0.04 60)" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-primary">Studio</span>
            <span className="font-script text-2xl text-secondary">Creart</span>
          </div>
          <p className="mt-4 max-w-sm text-cream/70 leading-relaxed">
            Atelier artistique dédié aux enfants et aux adultes —
            un lieu d'apprentissage, d'expression et de découverte à Tétouan.
          </p>
          <p className="mt-6 font-script text-2xl text-secondary">With Ihssan</p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-cream mb-4">Visitez-nous</h4>
          <p className="text-sm leading-relaxed text-cream/70">
            Bureaux Chams Doha<br/>
            4e Étage, N20<br/>
            Wilaya Center, Tétouan 93000<br/>
            Maroc
          </p>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-primary hover:text-cream transition-colors">
            Voir sur Maps →
          </a>
        </div>
        <div>
          <h4 className="font-serif text-lg text-cream mb-4">Horaires</h4>
          <ul className="text-sm text-cream/70 space-y-1">
            <li className="flex justify-between gap-4"><span>Lun – Ven</span><span>11h – 21h30</span></li>
            <li className="flex justify-between gap-4"><span>Samedi</span><span>14h – 21h30</span></li>
            <li className="flex justify-between gap-4"><span>Dimanche</span><span className="text-cream/40">Fermé</span></li>
          </ul>
          <h4 className="font-serif text-lg text-cream mt-6 mb-2">Contact</h4>
          <a href={`tel:${PHONE}`} className="block text-sm text-primary hover:text-cream transition-colors">{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`} className="block text-sm text-cream/70 hover:text-cream transition-colors mt-1">{EMAIL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="block text-sm text-cream/70 hover:text-cream transition-colors mt-1">@studiocreart</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cream/10 flex flex-wrap justify-between gap-4 text-xs text-cream/50">
        <p>© {new Date().getFullYear()} Studio Creart. Tous droits réservés.</p>
        <p className="font-script text-base text-secondary">L'art commence ici.</p>
      </div>
    </footer>
  );
}
