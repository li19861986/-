import * as React from "react";

/** Candy button. `candy` (pink) is the one primary action per view; `blue` is secondary; `quiet` is a text link. */
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "candy" | "blue" | "quiet"; size?: "l" | "s" }): JSX.Element;

/** Small pill for meta facts: participants, duration, "included". */
export function Badge(props: { tone?: "lime" | "sky" | "sun" | "pink" | "neutral"; icon?: React.ReactNode; children: React.ReactNode; className?: string }): JSX.Element;

/** The navy slogan ribbon with spark ticks on both sides. Defaults to "אירועים שלא שוכחים!". */
export function SloganRibbon(props: { children?: React.ReactNode; className?: string }): JSX.Element;

/** White outlined pill with the pink phone disc. Defaults to 055-5570173. */
export function PhonePill(props: { number?: string; className?: string }): JSX.Element;

/** Headline whose letters cycle blue / pink / pink / blue / lime with a navy outline, like the wordmark. Once per page. */
export function ColorHeadline(props: { children?: string; tones?: Array<"blue" | "pink" | "lime">; as?: "h1" | "h2" | "div"; className?: string }): JSX.Element;

/** Round sticker frame (navy / white / navy edge, coloured ring) for the logo or a round photo. */
export function Sticker(props: { src?: string; alt?: string; size?: number; ring?: "pink" | "lime" | "blue"; children?: React.ReactNode; className?: string }): JSX.Element;

/** Pill tab bar for price-list categories. Controlled with `value`/`onChange`, or uncontrolled with `defaultValue`. */
export function Tabs(props: { items: Array<{ value: string; label: React.ReactNode }>; value?: string; defaultValue?: string; onChange?: (value: string) => void; className?: string }): JSX.Element;

/** A package tile from the price list. `price` as a number renders as ₪1,800. `featured` adds the sun flag (string = its text). */
export function PackageCard(props: { name: string; tagline?: string; price: number | string; features?: React.ReactNode[]; participants?: number; duration?: string; perk?: string; note?: string; featured?: boolean | string; action?: string | false; onSelect?: () => void; className?: string }): JSX.Element;

/** One add-on line: name, optional note, price. */
export function PriceRow(props: { name: string; note?: string; price: number | string; className?: string }): JSX.Element;
