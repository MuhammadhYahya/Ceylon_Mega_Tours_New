import {
  Anchor, Apple, Baby, BedDouble, Binoculars, Bird, Bus, Camera, Car, Clock,
  Coffee, Compass, CupSoda, Droplet, Fish, Flower, Footprints, Gem, Grape,
  Heart, Landmark, Leaf, LifeBuoy, MapPin, Mountain, Pill, Plane, Route,
  Sailboat, Sandwich, Shell, ShieldCheck, Ship, ShoppingBag, Snowflake, Soup,
  Sparkles, Star, Sun, Sunrise, Sunset, Telescope, Tent, Ticket, Train,
  TreePalm, Turtle, Umbrella, Users, Utensils, Waves, Wifi,
  type LucideIcon,
} from "lucide-react";

/**
 * The icon vocabulary an editor can pick from, for a programme step or an
 * inclusion. Keys are stored in Sanity; nothing but a key is ever written to
 * the document, so the drawing can be swapped here without touching content.
 *
 * KEEP IN SYNC with `studio/schemaTypes/tourIconOptions.ts`, which carries the
 * same keys plus their Russian labels for the Studio dropdown. The Studio is a
 * separate npm project and cannot import from here. Drift is survivable in one
 * direction only — an unknown key renders `FALLBACK_ICON` rather than throwing
 * — so add to the Studio list first, then here.
 */
export const TOUR_ICONS = {
  // Океан и дикая природа
  waves: Waves,
  fish: Fish,
  turtle: Turtle,
  shell: Shell,
  bird: Bird,
  binoculars: Binoculars,
  telescope: Telescope,
  ship: Ship,
  sailboat: Sailboat,
  anchor: Anchor,
  "life-buoy": LifeBuoy,

  // Природа и ландшафт
  mountain: Mountain,
  palm: TreePalm,
  leaf: Leaf,
  flower: Flower,
  sun: Sun,
  sunrise: Sunrise,
  sunset: Sunset,
  tent: Tent,
  footprints: Footprints,
  umbrella: Umbrella,
  droplet: Droplet,

  // Культура и шопинг
  landmark: Landmark,
  gem: Gem,
  camera: Camera,
  "shopping-bag": ShoppingBag,
  compass: Compass,
  "map-pin": MapPin,
  route: Route,
  sparkles: Sparkles,
  star: Star,

  // Транспорт
  bus: Bus,
  car: Car,
  train: Train,
  plane: Plane,

  // Еда и комфорт
  ticket: Ticket,
  coffee: Coffee,
  utensils: Utensils,
  soup: Soup,
  apple: Apple,
  grape: Grape,
  drink: CupSoda,
  sandwich: Sandwich,
  pill: Pill,
  insurance: ShieldCheck,
  wifi: Wifi,
  ac: Snowflake,
  bed: BedDouble,
  guide: Users,
  clock: Clock,
  baby: Baby,
  heart: Heart,
} satisfies Record<string, LucideIcon>;

export type TourIconId = keyof typeof TOUR_ICONS;

/** Shown when a step carries no icon, or one this build doesn't know. */
const FALLBACK_ICON = Sparkles;

/**
 * Resolves a stored key to a component. Deliberately total — content should
 * never be able to crash a page by naming an icon that was renamed in code.
 */
export function tourIcon(id: string | undefined): LucideIcon {
  if (!id) return FALLBACK_ICON;
  return (TOUR_ICONS as Record<string, LucideIcon>)[id] ?? FALLBACK_ICON;
}
