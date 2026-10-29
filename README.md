# Pema Choda — Personal Portfolio Website

A modern, responsive, and interactive personal portfolio showcasing web development projects, AI applications, certifications, and skills. Built with clean HTML5, CSS3, and JavaScript with interactive features such as dark mode, particles background, interactive CV modal, and EmailJS-powered contact integration.

---

## 🌟 Features

- **Responsive & Mobile-First Design**: Optimized for smartphones, tablets, and desktop displays.
- **Dark Mode Support**: Seamless toggle between Light and Dark themes, with user preference saved in `localStorage`.
- **Interactive Hero Canvas**: Powered by [particles.js](https://vincentgarreau.com/particles.js/) with real-time interactive particles.
- **Dynamic Typing Animation**: Smooth typewriter effect highlighting core competencies.
- **Interactive Project Modals**: Detailed project breakdown with feature lists, tech stack tags, and repository/live demo links.
- **Embedded Resume / CV Viewer**: View the interactive PDF CV directly in a modal without leaving the page, plus a one-click download option.
- **Certificates & Awards Verification**: Quick verification links to verified credential PDFs.
- **Working Contact Form**: Integrated with [EmailJS](https://www.emailjs.com/) and protected with Google reCAPTCHA v2.
- **Scroll Progress & Back to Top**: Real-time reading progress indicator and a smooth floating back-to-top button.
- **Progressive Web App (PWA) Ready**: Includes `manifest.json` and multi-size application icons for home screen installation.

---

## 🛠️ Tech Stack

- **Markup**: HTML5 (Semantic, SEO-optimized, Schema.org JSON-LD structured data)
- **Styling**: CSS3 (CSS Custom Properties / Variables, Flexbox, CSS Grid, Transitions & Animations)
- **Scripting**: Vanilla JavaScript (ES6+, IntersectionObserver API, Throttled Scroll Handlers)
- **Icons**: [Font Awesome 6](https://fontawesome.com/)
- **Typography**: [Runiga](https://www.cdnfonts.com/runiga.font) (Brand & Headings), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Body & UI), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Technical Accents)
- **Libraries**:
  - [Particles.js 2.0.0](https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js)
  - [EmailJS Browser SDK v4](https://www.emailjs.com/)
  - [Google reCAPTCHA v2](https://developers.google.com/recaptcha)

---

## 📂 Project Structure

```text
Personal_Portfolio/
├── certificates/         # Verified certificates and awards (PDFs)
├── images/               # Project screenshots, profile pictures, and favicons
├── Resume/               # Resume / Curriculum Vitae (PDF)
├── icon-192x192.png      # PWA App Icon (192x192)
├── icon-512x512.png      # PWA App Icon (512x512)
├── index.html            # Main portfolio markup & SEO metadata
├── manifest.json         # Web App Manifest for PWA installation
├── README.md             # Project overview and documentation
├── script.js             # Interactive behavior, modals, form submission
└── styles.css            # Stylesheet, design tokens, dark mode, responsive styles
```

---

## 🚀 Getting Started

### Prerequisites

You only need a modern web browser (e.g., Google Chrome, Firefox, Edge, or Safari).

### Local Setup

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/pemachoda/Personal_Portfolio.git
   cd Personal_Portfolio
   ```

2. **Open with a local development server:**
   - Using VS Code / Antigravity IDE: Right-click `index.html` and select **"Open with Live Server"**.
   - Or using Python:
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.

---

## ⚙️ Configuration & Customization

### 1. Contact Form (EmailJS)
To connect your own EmailJS account:
1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Create an Email Service and note your `Service ID`.
3. Create an Email Template with fields `from_name`, `from_email`, `subject`, and `message`, and note your `Template ID`.
4. In `index.html`, initialize EmailJS with your Public Key:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
5. In `script.js` (around line 430), update `emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)`.

### 2. Google reCAPTCHA v2
1. Register your domain or `localhost` at [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
2. Choose **reCAPTCHA v2 ("I'm not a robot" Checkbox)**.
3. Update `data-sitekey` in `index.html`:
   ```html
   <div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
   ```

---

## 📄 License

This portfolio is open source and available under the [MIT License](LICENSE).
Feel free to customize it for your own personal use!