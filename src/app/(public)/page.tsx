import { ButtonLink, Container, PresetGrid } from "@/components/ui";
import { siteConfig } from "@/packages/configs/site.config";

export default function Home() {
  const { hero, features, presets } = siteConfig;

  return (
    <>
      <section className="border-b border-border">
        <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {hero.badge}
          </span>
          <h1 className="max-w-3xl font-brand text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            {hero.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink
              href={hero.primaryCta.href}
              size="lg"
              target="_blank"
              rel="noreferrer"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              size="lg"
              variant="outline"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="features" className="scroll-mt-16 py-20">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-brand text-3xl font-bold tracking-tight">
              {features.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{features.description}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.items.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="presets"
        className="scroll-mt-16 border-t border-border bg-muted/40 py-20"
      >
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-brand text-3xl font-bold tracking-tight">
              {presets.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{presets.description}</p>
          </div>
          <PresetGrid />
        </Container>
      </section>
    </>
  );
}
