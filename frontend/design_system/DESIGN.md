---
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8d9e3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fd'
  surface-container: '#ecedf7'
  surface-container-high: '#e6e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#eff0fa'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f9f9ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
typography:
  display-xl:
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: '0'
  body-lg:
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  label-sm:
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

## Brand & Style

The design system establishes a high-end, editorial feel for travel planning. It prioritizes the user's journey through a synthesis of three distinct influences: the warmth and high-quality imagery of Airbnb, the structural clarity and "workspace" utility of Notion, and the uncompromising aesthetic precision of Apple.

The core objective is to reduce the cognitive load of complex itinerary planning while evoking the emotional excitement of travel. This is achieved through generous whitespace, a sophisticated use of glassmorphism for secondary navigation, and a focus on content over chrome. The system feels like a premium digital concierge—organized, reliable, yet deeply inspiring.

## Colors

The palette is engineered for high legibility and depth. In **Light Mode**, the system uses pure whites to maximize the "breathability" of the layout, with soft gray cards providing subtle grouping of information. Primary actions utilize a sophisticated blue gradient that signifies movement and sky-like expansiveness.

In **Dark Mode**, the system shifts to a deep charcoal base to reduce eye strain during late-night planning. Deep navy cards create a layered "stacking" effect, while cyan/blue "glowing" accents act as beacons for interaction. All colors are calibrated to meet AA contrast standards for accessibility while maintaining a premium, cinematic aesthetic.

## Typography

This design system utilizes **Inter** for its incredible versatility and structural clarity. The typographic hierarchy is inspired by modern editorial design: large, bold headlines with intentional negative letter-spacing for a tight, high-end feel. 

Display sizes are reserved for destination names and primary headers to create visual impact. Body copy maintains a generous line height (1.5x - 1.6x) to ensure long itineraries remain readable. For organizational elements like dates, tags, and small metadata, a slightly tracked-out uppercase label style is used to provide contrast against standard body text.

## Layout & Spacing

The system employs a **Fixed Grid** philosophy for desktop to maintain the "organized workspace" feel, centering content within a 1440px container. A 12-column grid provides the flexibility required for complex planning modules (e.g., a 4-column sidebar for itinerary details and an 8-column main view for maps/imagery).

Spacing follows an 8px rhythmic scale. Generous "XXL" spacing is used between major sections to mimic the Apple-style minimalist breathing room. On mobile devices, the layout transitions to a single-column fluid flow with 16px horizontal margins, ensuring touch targets are comfortable and imagery remains full-width for maximum emotional impact.

## Elevation & Depth

Depth is a primary functional driver in this design system. It uses a combination of **Glassmorphism** and **Ambient Shadows** to communicate hierarchy:

1.  **The Base:** Flat background (Pure White or Charcoal).
2.  **The Container:** Soft Gray or Navy cards with a very subtle 1px border.
3.  **The Overlay:** Navigation sidebars and modal overlays utilize a backdrop-blur (20px+) and 70-80% opacity to maintain a sense of context behind the current task.
4.  **The Shadow:** Multi-layered, highly diffused shadows (e.g., `0 10px 30px rgba(0,0,0,0.05)`) give elements a weightless, floating appearance.

In Dark Mode, the "elevation" is reinforced by subtle inner glows and animated border gradients on active cards, replacing traditional drop shadows which are less effective on dark backgrounds.

## Shapes

The shape language is approachable and modern, characterized by **large rounded corners**. A base radius of 16px is used for standard cards and input fields, while larger containers and imagery blocks use 24px to soften the overall UI. 

Interactive elements like buttons and category chips utilize pill-shaped radii to distinguish them clearly from informational containers. This "friendlier" geometry balances the technical structure of the planning tools, making the application feel inviting rather than purely utilitarian.

## Components

### Buttons
Primary buttons use the gradient fill with a subtle 2px hover "lift" (Y-axis translation) and a soft shadow expansion. Secondary buttons are "ghost" style with a 1px border.

### Cards
Cards are the primary organizational unit. They feature 16px padding as a minimum and use "overflow: hidden" to allow imagery to bleed to the edges. In Dark Mode, cards feature a 1px deep-navy stroke that glows when the card is hovered.

### Inputs
Fields use a subtle gray background (#F3F4F6) in light mode and a deep navy in dark mode. Focus states are indicated by a 2px primary blue border and a soft outer glow.

### Glassmorphism Overlays
Sidebars and Floating Action Buttons (FABs) use a high blur (30px) and a semi-transparent background. This keeps the user connected to their travel map or itinerary even when adjusting settings.

### Itinerary Timeline
A vertical, structured list component with "Apple-style" thin lines and dot indicators. This component uses the most "Notion-like" structure: clean, indented, and highly functional for data density.

### Interaction Details
All transitions must use a `cubic-bezier(0.4, 0, 0.2, 1)` timing function for a smooth, "Apple-like" feel. Hovering over a travel destination card should trigger a slight image scale-up (1.05x) within the card container.