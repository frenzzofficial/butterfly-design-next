import { ButtonLink, Container } from "@/components/ui";
import { siteConfig } from "@/packages/configs/site.config";

export default function NotFound() {
  const { notFound } = siteConfig;

  return (
    <Container className="flex flex-col items-center gap-4 py-28 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="font-brand text-4xl font-bold tracking-tight">
        {notFound.title}
      </h1>
      <p className="max-w-md text-muted-foreground">{notFound.description}</p>
      <ButtonLink href="/">{notFound.cta}</ButtonLink>
    </Container>
  );
}
