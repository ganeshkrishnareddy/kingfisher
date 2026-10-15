# Kingfisher — The King of Good Times

**Built by P Ganesh Krishna Reddy**

A complete, buildless, responsive website adapted for Kingfisher. All displayed products are Kingfisher variants.

## Live Deployments

- **Vercel Production**: [https://kingfisher-tawny.vercel.app](https://kingfisher-tawny.vercel.app)
- **GitHub Pages**: [https://ganeshkrishnareddy.github.io/kingfisher/](https://ganeshkrishnareddy.github.io/kingfisher/)

## Run or deploy

Serve `dist/` using any static server, for example `python -m http.server 8741 --directory dist`. No package installation, API key, build step or runtime framework is required.

Every push to `main` automatically redeploys to Vercel and republishes `dist/` to GitHub Pages through `.github/workflows/pages.yml`.

## Experience

- Oversized red condensed typography, paper-colour backgrounds and a fixed left navigation rail.
- A single persistent bottle moves from the tilted hero through product details, story and tasting-note sections, then into the range.
- Nine products with category filters and accessible detail dialogs.
- Expandable navigation, brand story and source credits.
- Responsive mobile layouts, keyboard navigation and reduced-motion styling.
- Product imagery and the Anton, Barlow and DM Sans fonts are served locally. Yatra One and the Noto Sans Indic families load from Google Fonts.

## The Indian layer

Every addition is borrowed from an Indian street object, and each responds the way the real thing would.

- **Toran**: a marigold and mango-leaf garland hangs across the hero. Strings swing like pendulums when the pointer brushes past, and a click sheds petals.
- **Hindi type**: the hero carries a hand-painted Devanagari line, the menu pairs each section with a Hindi word, and product dialogs show the beer's name in Devanagari. Display Devanagari uses Yatra One, which is based on hand-painted Indian signage.
- **Diwali night**: the header switch swaps daylight for a night palette, revealed as a circle spreading from the switch. A string of lights runs along the top of the page, and six diyas appear under the headline to be lit one by one.
- **Pour it right**: lift the bottle by its base (or hold the button) and beer leaves the neck as a falling stream that arcs, thins and splashes into the glass. Steeper tilts pour faster and foam more. A millilitre gauge tracks the level, the fill line turns green when the beer reaches it, and the pour sound rises in pitch as the glass fills. Serving is scored with Hinglish feedback.
- **Good company**: a railway departures board lists eight cities. Choosing one flips the yellow station sign to show the city in its regional script, Hindi and English, with a local dish and a Kingfisher pairing.
- **Horn OK Please**: the footer is a painted truck tailgate carrying the don't-drink-and-drive message in Hindi and English. Pressing the horn plays a synthesised two-tone honk.

Alcohol-restricted states are left out of the city pairings, and pairings are labelled as editorial.

## Product and asset provenance

The in-page credits dialog contains source links. United Breweries' portfolio and annual report support the product list. Premium and Ultra assets are from Kingfisher Drinks; pack designs vary across markets. Strong and Storm assets are from Talli Drinks. The Strong, Storm and Blue photos are cut out of their flat backgrounds into transparent `*-cut.webp` files used on the page; the original photos are kept alongside them. Ultra Max and Witbier photos are from SipDirect. Mango Berry Twist and Lemon Masala assets are from United Breweries. Blue uses archival packaging artwork credited to Ashwin KN. Food photo: Curry India Tabla / Hot Pepper Gourmet. Glass: 365 Drinks. Fonts: Google Fonts.

This independent design concept is not an official Kingfisher service and does not process alcohol orders. No universal ABV, price or local availability is claimed. Verify current regional packaging before a commercial launch. All trademarks and images remain the property of their respective owners.

## Verification

JavaScript syntax, local asset integrity and page link targets are checked prior to publishing. Browser visual and interaction QA is unavailable in the current managed environment because its required control-browser capability is not exposed. The low-resolution reference is recreated through inferred layout and motion; pixel-perfect or frame-exact parity is not verified.
