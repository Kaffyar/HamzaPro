export type NavItem = { label: string; href: `#${string}` };

export type WorkMediaSlot =
  | { kind: "placeholder"; note: string; tone?: "featured" | "supporting" }
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string; ariaLabel: string };

export type WorkShowcaseItem = {
  id: string;
  title: string;
  label: string;
  period: string;
  summary: string;
  tech: string[];
  media: WorkMediaSlot;
  github?: string;
  live?: string;
};

export type ConsoleLine = string;
