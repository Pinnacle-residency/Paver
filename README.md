# Paver

Marketing website for Paver, built from the [Figma design](https://www.figma.com/design/10HsbCp1g26AIp3MxMCcN2/Paver).

It's a static site (plain HTML, CSS and JavaScript, no build step):

| Page | File |
| --- | --- |
| Home | `index.html` |
| How It Works | `how-it-works.html` |
| Paver Advisor | `paver-advisor.html` |
| About | `about.html` |

Shared styles live in `assets/css/styles.css`, behaviour (mobile menu, FAQ accordion, Advisor search/filter, scroll reveal) in `assets/js/main.js`, and images in `assets/img/`.

Every "Join waitlist" button, along with the other sign-up and download buttons, opens the waitlist form: https://forms.gle/uasFHxJZCSpPC54bA

The investor and partner "Get started now" button (Home and About) opens an email to Ogunmakinwatolu@gmail.com.

## Run locally

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

`.github/workflows/pages.yml` publishes the site to GitHub Pages on every push to `main`. Enable it once under **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site is served at https://trypaver.online. The domain is set under **Settings → Pages → Custom domain**, and its DNS points at GitHub Pages. `CNAME` records the domain in the repository.

The site also works on any static host (Netlify, Vercel, Cloudflare Pages). Point it at the repository root; there is no build command.

## Images still to add

- About hero photo (Figma node `1:1191`): this slot currently uses the app screenshot.
