import Image from "next/image";
import Link from "next/link";
import { Container, PresetSwitcher, ThemeToggle } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";
import { siteConfig } from "@/packages/configs/site.config";
import { assetPath } from "@/packages/utils/asset-path";

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-brand text-lg font-semibold"
        >
          <Image
            src={assetPath(appConfig.site.logo)}
            alt=""
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span>{siteConfig.brand}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <PresetSwitcher />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

export default Header;
