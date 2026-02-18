export function weatherCodeToLabel(code?: number) {
  if (code == null) return "Ismeretlen";

  if (code === 0) return "Tiszta idő";
  if (code === 1 || code === 2) return "Derült / kissé felhős";
  if (code === 3) return "Felhős";
  if (code === 45 || code === 48) return "Köd";
  if ([51, 53, 55, 56, 57].includes(code)) return "Szitálás";
  if ([61, 63, 65].includes(code)) return "Eső";
  if ([66, 67].includes(code)) return "Fagyos eső";
  if ([71, 73, 75, 77].includes(code)) return "Hó";
  if ([80, 81, 82].includes(code)) return "Zápor";
  if ([95, 96, 99].includes(code)) return "Zivatar";

  return "Változékony";
}