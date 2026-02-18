import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FoggyIcon from "@mui/icons-material/Foggy";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export function weatherCodeToIcon(code?: number, props?: SvgIconProps) {
  if (code == null) return <CloudIcon {...props} />;

  if (code === 0) return <WbSunnyIcon {...props} />;
  if (code === 1 || code === 2) return <WbSunnyIcon {...props} />;
  if (code === 3) return <CloudIcon {...props} />;
  if (code === 45 || code === 48) return <FoggyIcon {...props} />;

  if ([51, 53, 55, 56, 57].includes(code)) return <GrainIcon {...props} />; // szitálás
  if ([61, 63, 65, 80, 81, 82].includes(code)) return <GrainIcon {...props} />; // eső/zápor
  if ([71, 73, 75, 77].includes(code)) return <AcUnitIcon {...props} />; // hó
  if ([95, 96, 99].includes(code)) return <ThunderstormIcon {...props} />; // zivatar

  return <CloudIcon {...props} />;
}