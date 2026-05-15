import React from 'react';
import {
  Building2,
  Laptop,
  Monitor,
  IndianRupee,
  Landmark,
  Cog,
  Stethoscope,
  HeartPulse,
  TrendingUp,
  Tv,
  ShoppingBag,
  Zap,
  BookOpen,
  Wheat,
  Truck,
  Radio,
  Hammer
} from 'lucide-react';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const DEFAULT_ICON: IconType = Building2;

const SECTOR_COMPONENTS: Record<string, IconType> = {
  it: Laptop,
  technology: Monitor,
  software: Laptop,
  finance: IndianRupee,
  banking: Landmark,
  manufacturing: Cog,
  healthcare: HeartPulse,
  medical: Stethoscope,
  government: Landmark,
  marketing: TrendingUp,
  media: Tv,
  retail: ShoppingBag,
  'energy & power': Zap,
  energy: Zap,
  power: Zap,
  fmcg: ShoppingBag,
  education: BookOpen,
  agriculture: Wheat,
  agri: Wheat,
  logistics: Truck,
  telecom: Radio,
  construction: Hammer,
};

export function getSectorIcon(sector?: string) {
  const key = (sector || '').toLowerCase();
  const Icon = SECTOR_COMPONENTS[key] || DEFAULT_ICON;
  return <Icon className="w-6 h-6 text-blue-700" aria-hidden />;
}
