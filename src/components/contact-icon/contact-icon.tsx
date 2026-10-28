// Footer "Aloqa" ro'yxati ikonlari — barcha saytlar uchun umumiy. Chiziqli (stroke), rang — currentColor, dekor.
export type ContactIconName = "phone" | "email" | "telegram" | "instagram" | "youtube" | "location";

const PATHS: Record<ContactIconName, string[]> = {
  phone: ["M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"],
  email: ["M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M3.5 6.5 12 13l8.5-6.5"],
  telegram: ["M21.5 3.5 2.8 10.7c-.9.4-.9 1.1 0 1.4l4.7 1.5 1.8 5.6c.2.6.9.8 1.4.4l2.6-2.2 4.9 3.6c.6.4 1.4.1 1.6-.6l3-15.4c.2-1-.5-1.6-1.3-1.5z", "m7.5 13.6 10-6.2-7.6 7.6"],
  instagram: ["M7 2.5h10A4.5 4.5 0 0 1 21.5 7v10a4.5 4.5 0 0 1-4.5 4.5H7A4.5 4.5 0 0 1 2.5 17V7A4.5 4.5 0 0 1 7 2.5z", "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", "M17.5 6.5h.01"],
  location: ["M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z", "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"],
  youtube: ["M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17z", "m10 15 5-3-5-3z"],
};

export default function ContactIcon({ name, size = 18, className }: { name: ContactIconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
