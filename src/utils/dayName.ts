export function dayName(dateStr: string) {
  const d = new Date(dateStr);
  const name = d.toLocaleDateString("hu-HU", { weekday: "long" });
  return name.charAt(0).toUpperCase() + name.slice(1).toUpperCase();
}

export function dayLabel(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("hu-HU", { weekday: "short" }); // H, K, Sze...
}