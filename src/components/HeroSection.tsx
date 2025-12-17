export const HeroSection = () => {
  return (
    <section className="text-center mb-16 animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
        👋 Hi, I'm <span className="underline decoration-wavy decoration-accent">Ehtesham Alam</span>
      </h1>

      <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Backend‑Focused <span className="text-primary font-semibold">Software Engineer</span> & Full Stack Developer 🚀
      </p>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
        Crafting scalable platforms, glowing dashboards, and joyful user experiences with clean architecture and modern tech.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="https://github.com/Ehtesham93"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:scale-105 transition-transform"
        >
          🚀 Explore My Work
        </a>
        <a
          href="https://www.linkedin.com/in/e-alam-29b0231ehtesham-alam-2239b0231?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium shadow-lg hover:scale-105 transition-transform"
        >
          📬 Get in Touch
        </a>
      </div>
    </section>
  );
};
