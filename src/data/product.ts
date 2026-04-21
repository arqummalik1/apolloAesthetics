import type { PaymentOption, Product } from "@/types/store";

const PRODUCT_MEDIA_BASE = "/product-media";

function productMedia(
  id: string,
  file: string,
  alt: string,
  label: string,
  accent: string,
) {
  return {
    id,
    src: `${PRODUCT_MEDIA_BASE}/${file}`,
    alt,
    label,
    accent,
  };
}

const media = {
  heroCampaign: productMedia(
    "hero-image",
    "heroImage.png",
    "Clean front-facing mockup of Dermato Care Kojic Acid 2% Face Serum for the hero section.",
    "Hero image",
    "Primary front-facing hero mockup",
  ),
  frontShowcase: productMedia(
    "front-close",
    "image.png",
    "Close front mockup of Dermato Care Kojic Acid 2% Face Serum on a metallic surface.",
    "Front close-up",
    "Clean bottle shot with the front label clearly visible",
  ),
  backShowcase: productMedia(
    "back-close",
    "image2.png",
    "Back-label close mockup of Dermato Care Kojic Acid 2% Face Serum.",
    "Back close-up",
    "Back panel with Apollo Aesthetics branding and product details",
  ),
  dropperEditorial: productMedia(
    "desk-shot",
    "imageModel.png",
    "Top-down desk mockup of Dermato Care Kojic Acid 2% Face Serum.",
    "Desk shot",
    "Lifestyle mockup that shows the bottle in a real worktable setting",
  ),
  sourceFront: productMedia(
    "hand-front",
    "IMG_2924.PNG",
    "Handheld front mockup of Dermato Care Kojic Acid 2% Face Serum in clinic lighting.",
    "Handheld front",
    "Real in-hand product view with the front label visible",
  ),
  sourceBack: productMedia(
    "hand-side",
    "IMG_2928.PNG",
    "Handheld side mockup of Dermato Care Kojic Acid 2% Face Serum showing ingredients.",
    "Handheld side",
    "Side panel view showing ingredients and usage details",
  ),
  angleLabel: productMedia(
    "angle-label",
    "IMG_2929.PNG",
    "Angled mockup of Dermato Care Kojic Acid 2% Face Serum with partial front and back label.",
    "Angle label",
    "Angled clinic shot that shows both front and side branding",
  ),
};

export const product: Product = {
  id: "dermato-care-kojic-acid-2",
  brand: "Dermato Care",
  name: "Kojic Acid 2%",
  form: "Face Serum",
  volume: "30ml / 1.01 fl. oz.",
  price: 1199,
  currency: "INR",
  shortDescription:
    "A focused serum presentation for dark spot and pigmentation care, showcased in a premium amber dropper bottle.",
  description:
    "Apollo Aesthetics presents Dermato Care Kojic Acid 2% Face Serum in a clean clinical-luxe shopping experience built around conservative, label-aligned product storytelling.",
  usage: [
    "Apply 3 to 5 drops to the face and neck.",
    "Massage gently in upward circular motions.",
    "Use as part of a simple serum step before moisturizer.",
  ],
  caution: [
    "External use only.",
    "Avoid direct contact with the eyes.",
    "Store in a cool place away from direct sunlight.",
  ],
  highlights: [
    "Single-product focus with a premium amber glass bottle.",
    "Label-led copy that stays conservative and easy to trust.",
    "Checkout-ready frontend flow for cart, address, payment, and confirmation.",
    "Structured for future Supabase auth and order storage integration.",
  ],
  listedIngredients: ["Kojic Acid", "Alpha Arbutin", "Niacinamide", "Glycerin"],
  heroImage: media.heroCampaign,
  featureImages: [
    media.frontShowcase,
    media.sourceFront,
    media.dropperEditorial,
    media.sourceBack,
    media.angleLabel,
    media.backShowcase,
  ],
  gallery: [
    media.heroCampaign,
    media.frontShowcase,
    media.sourceFront,
    media.dropperEditorial,
    media.sourceBack,
    media.angleLabel,
    media.backShowcase,
  ],
};

export const benefitCards = [
  {
    title: "Premium Medical Finish",
    body: "Amber glass, gold detailing, and a clean white label create a refined clinical-luxe skincare presentation.",
  },
  {
    title: "Easy Image Swaps",
    body: "All site visuals now come from one public product-media folder so replacing assets later stays straightforward.",
  },
  {
    title: "Checkout Ready",
    body: "Visitors can move from landing page to cart, address entry, demo payment, and confirmation without leaving the funnel.",
  },
  {
    title: "Future Backend Friendly",
    body: "State, contracts, and route boundaries are prepared for future Supabase auth and order storage.",
  },
];

export const kojicBenefitCards = [
  {
    title: "Targets Visible Uneven Tone",
    body: "Kojic acid is widely used in pigmentation-focused skincare for helping reduce the appearance of dark spots, patches, and uneven-looking tone.",
  },
  {
    title: "Fits Post-Blemish Routines",
    body: "It is often chosen for routines focused on the look of post-acne marks and other areas where extra pigment can leave the skin looking less uniform.",
  },
  {
    title: "Supports A Brighter Look",
    body: "Used consistently, a kojic acid serum can support a clearer, more luminous-looking complexion without aiming to change your natural skin tone.",
  },
  {
    title: "Pairs Well With Daily SPF",
    body: "Pigmentation care works best when brightening ingredients are backed by sun protection, making a serum-plus-SPF routine especially relevant in 2026.",
  },
];

export const kojicRoutineNotes = [
  "Ideal for customers focused on visible dark spots and pigmentation care.",
  "Works best as part of a simple routine with moisturizer and broad-spectrum sunscreen.",
  "A strong fit for shoppers who want one targeted serum instead of a crowded 10-step routine.",
];

export const trustPoints = [
  "Dermatologically recommended",
  "Cosmetologist recommended",
  "30ml amber dropper bottle",
  "Smooth frontend demo checkout",
];

export const faqItems = [
  {
    question: "Is this a real payment flow?",
    answer:
      "This version is frontend only. The payment step is a demo simulator so the user journey can be tested before a live gateway is added.",
  },
  {
    question: "Can login be added later?",
    answer:
      "Yes. The project is structured so Supabase username or password and Google login can be layered in later without rebuilding the storefront UI.",
  },
  {
    question: "How should the serum be used?",
    answer:
      "The bottle instructions indicate applying 3 to 5 drops to the face and neck and massaging gently in upward circular motions.",
  },
  {
    question: "What happens after payment in this version?",
    answer:
      "A mock confirmation page is shown with the captured shipping details, selected demo payment option, and a generated order reference.",
  },
];

export const paymentOptions: PaymentOption[] = [
  {
    id: "upi-demo",
    label: "UPI Demo",
    description: "Fast mock flow for mobile-first checkout reviews.",
  },
  {
    id: "card-demo",
    label: "Card Demo",
    description: "Classic credit or debit card style payment simulation.",
  },
  {
    id: "cod-demo",
    label: "Cash on Delivery Demo",
    description: "A placeholder COD option to keep future payment modes flexible.",
  },
];
