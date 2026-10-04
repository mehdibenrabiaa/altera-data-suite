// Line icons for the use-case teams (tabs, cards). Stroke uses
// currentColor so each place can tint them (gray idle, red when active).

const PATHS: Record<string, React.ReactNode> = {
  // Bank
  finance: (
    <>
      <path d="M3 10h18L12 4 3 10Z" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
      <path d="M3 21h18" />
    </>
  ),
  // People
  payroll: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" />
      <path d="M18 14c2.1.7 3.5 3 3.5 6" />
    </>
  ),
  // Shopping cart
  procurement: (
    <>
      <path d="M2 3h3l2.7 12.2a1.2 1.2 0 0 0 1.2.9h9.3a1.2 1.2 0 0 0 1.2-.9L21 7H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </>
  ),
  // Truck
  logistics: (
    <>
      <path d="M2 6h12v11H2Z" />
      <path d="M14 9.5h4l3.5 3.5V17H14" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </>
  ),
  // Shield with check
  audit: (
    <>
      <path d="M12 3 20 6v6c0 4.6-3.4 8.4-8 9-4.6-.6-8-4.4-8-9V6l8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
};

export default function UseCaseIcon({ slug, size = 20 }: { slug: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[slug]}
    </svg>
  );
}
