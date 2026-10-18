import { Container } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";
import { siteConfig } from "@/packages/configs/site.config";

// Set in next.config.ts at build time (Cache Components forbids reading the
// clock while prerendering). On a static export it is the year of the build.
const year = process.env.NEXT_PUBLIC_BUILD_YEAR;

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.brand}. {siteConfig.footer.tagline}
        </p>
        <a
          href={appConfig.social.github.handle}
          className="transition-colors hover:text-foreground"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
