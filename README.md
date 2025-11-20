# 🎨 Neo-Brutalism Portfolio

A stunning, interactive portfolio website built with Next.js 15, featuring a unique **Builder Mode** that lets visitors customize the layout, immersive 3D backgrounds, and hidden easter eggs.

![Neo-Brutalism Design](https://img.shields.io/badge/style-neo--brutalism-ff6b6b?style=for-the-badge)
![Next.js 15](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.181-white?style=for-the-badge&logo=three.js)

## ✨ Features

### 🎯 Core Features
- **Builder Mode** - Drag-and-drop sections to rearrange the entire website layout
- **Inline Text Editing** - Click on any text to edit project descriptions and titles in real-time
- **3D Particle Background** - Immersive Three.js particle system with 1500+ optimized particles
- **Custom Cursor** - Interactive cursor with contextual hints and glitch effects
- **Contact Form** - Integrated with Resend API for professional email delivery
- **Responsive Design** - Optimized for all devices with mobile-first approach

### 🎮 Easter Eggs
- **Konami Code** (↑↑↓↓←→←→BA) - Unlock a special surprise
- **Secret Code Panel** - Click the bottom-right corner 7 times to reveal hidden developer tools
- **Onboarding Tooltip** - First-time visitor guide to discover Builder Mode

### 🎨 Design System
- **Neo-Brutalism Aesthetic** - Bold borders, high contrast, and playful shadows
- **Glitch Animations** - Cyberpunk-inspired visual effects
- **Scanline Overlay** - CRT monitor effect for retro-futuristic feel
- **Custom Components** - Handcrafted UI elements with Radix UI primitives

## 🚀 Tech Stack

### Frontend
- **Next.js 15.1.6** - React framework with App Router
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 12** - Advanced animations and drag-and-drop

### 3D Graphics
- **Three.js 0.181** - 3D rendering engine
- **React Three Fiber 9.4** - React renderer for Three.js
- **React Three Drei 10** - Useful helpers for R3F
- **React Spring Three** - Spring physics animations

### Email & Forms
- **Resend 6.5** - Modern email API
- **React Email 2.0** - Beautiful email templates
- **Zod 4.1** - Schema validation

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **cmdk** - Command menu interface

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Setup

1. **Clone the repository**
```bash
git clone git@github.com:Kabir-Narula/Neo_Brutalism.git
cd Neo_Brutalism
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# Resend API Key for contact form
RESEND_API_KEY=your_resend_api_key_here
```

Get your free API key from [Resend](https://resend.com/api-keys)

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Type-check without building
npm run clean        # Remove .next build folder
npm run fresh        # Clean and start dev server
```

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── resume/            # Resume page
│   ├── components/            # React components
│   │   ├── sections/          # Page sections (Hero, Projects, etc.)
│   │   ├── 3d/               # Three.js components
│   │   ├── DigitalCompanion/  # AI companion feature
│   │   ├── BackgroundManager.tsx
│   │   ├── ChaosManager.tsx   # Builder Mode controller
│   │   ├── CommandMenu.tsx
│   │   ├── ContactForm.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── KineticBackground.tsx
│   │   ├── Monolith.tsx
│   │   ├── SecretCodePanel.tsx
│   │   └── ...
│   ├── context/               # React Context providers
│   │   └── LayoutContext.tsx  # Builder Mode state management
│   ├── hooks/                 # Custom React hooks
│   │   └── useKonamiCode.ts
│   ├── actions/               # Server actions
│   │   └── send-email.tsx     # Email sending logic
│   ├── lib/                   # Utilities
│   │   └── utils.ts
│   ├── types/                 # TypeScript types
│   └── resume-data.ts         # Portfolio content data
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🎨 Customization

### Update Portfolio Content

Edit `src/resume-data.ts` to customize:
- Personal information (name, location, bio)
- Work experience
- Education
- Projects
- Skills
- Contact information

### Modify Color Scheme

Edit `src/app/globals.css` to customize the neo-brutalism color palette:
```css
:root {
  --background: #fafaf9;
  --foreground: #0a0a0a;
  --primary: #22c55e;
  --accent: #f97316;
}
```

### Adjust 3D Background

Modify particle count in `src/components/3d/ParticleSystem.tsx`:
```typescript
const PARTICLE_COUNT = 1500; // Adjust for performance
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Add environment variable: `RESEND_API_KEY`
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Kabir-Narula/Neo_Brutalism)

### Build for Production

```bash
npm run build
npm run start
```

## 🎮 How to Use Builder Mode

1. Click the **"Builder Mode"** button in the bottom-right corner
2. **Drag sections** up/down to rearrange the page layout
3. **Click on text** to edit project titles and descriptions
4. Changes persist during your session
5. Click **"Exit Builder Mode"** to return to normal view

## 🐛 Known Issues

- Builder Mode changes don't persist after page refresh (by design)
- 3D background may impact performance on older devices
- Email sending requires valid Resend API key

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kabir Narula**
- GitHub: [@Kabir-Narula](https://github.com/Kabir-Narula)
- LinkedIn: [Kabir Narula](https://www.linkedin.com/in/kabir-narula-19b129260/)
- Email: Kabirnar10@gmail.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- 3D graphics powered by [Three.js](https://threejs.org)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Email service by [Resend](https://resend.com)
- Icons from [Lucide](https://lucide.dev)

---

⭐ Star this repo if you found it helpful!
