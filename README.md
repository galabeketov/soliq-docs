# Soliq Servis API Documentation

Modern va professional API documentation website. Swagger JSON dan foydalangan holda Redoc orqali yaratilgan.

## 🚀 Features

- ✅ **Interactive API Documentation** - Barcha endpointlar batafsil tushuntirilgan
- ✅ **Multiple Environment Support** - Production, Staging, Local o'rtasida osongina o'tish
- ✅ **Search Functionality** - Tez qidiruv imkoniyati
- ✅ **Dark Mode Support** - Ko'z uchun qulay tema
- ✅ **Responsive Design** - Mobil va desktop uchun optimallashtirilgan
- ✅ **Try It Out** - API'larni to'g'ridan-to'g'ri test qilish imkoniyati

## 📋 Prerequisites

Loyihani ishga tushirishdan oldin quyidagilar o'rnatilgan bo'lishi kerak:

- Node.js 18.x yoki undan yuqori
- npm yoki yarn

## 🛠️ Installation

### 1. Loyihani clone qiling

```bash
git clone https://github.com/your-username/soliq-docs.git
cd soliq-docs
```

### 2. Dependencies'larni o'rnating

```bash
npm install
# yoki
yarn install
```

### 3. Environment variables sozlang

`.env.local` fayl yarating:

```bash
NEXT_PUBLIC_API_BASE_URL=https://v3.soliqservis.uz:2443
```

### 4. Development serverni ishga tushiring

```bash
npm run dev
# yoki
yarn dev
```

Brauzerda `http://localhost:3000` ga o'ting.

## 📁 Project Structure

```
soliq-docs/
├── app/
│   ├── page.tsx              # Asosiy sahifa
│   ├── swagger.json          # Swagger/OpenAPI spec
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── public/
│   └── logo.png              # Logo (opsional)
├── .env.local                # Environment variables
├── next.config.js            # Next.js config
├── package.json
└── README.md
```

## 🔧 Configuration

### Base URL ni o'zgartirish

**Variant 1: Environment variable orqali**

`.env.local` faylida:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

**Variant 2: Code ichida**

`app/page.tsx` da:

```typescript
const ENVIRONMENTS = {
  production: {
    url: "https://v3.soliqservis.uz:2443",
    name: "Production",
  },
  staging: {
    url: "https://staging.soliqservis.uz:2443",
    name: "Staging",
  },
};
```

### Theme customization

`app/page.tsx` da Redoc options:

```typescript
theme: {
  colors: {
    primary: {
      main: "#1976d2",  // Asosiy rang
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
  },
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. GitHub repository yarating va loyihangizni push qiling
2. [Vercel](https://vercel.com) ga kiring
3. "New Project" tugmasini bosing
4. Repository'ni tanlang
5. Environment variables qo'shing (agar kerak bo'lsa)
6. Deploy tugmasini bosing

Yoki CLI orqali:

```bash
# Vercel CLI o'rnating
npm install -g vercel

# Deploy qiling
vercel --prod
```

### Netlify

```bash
# Build qiling
npm run build

# Netlify CLI orqali deploy qiling
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

### Docker

`Dockerfile` yarating:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

Build va run:

```bash
docker build -t soliq-docs .
docker run -p 3000:3000 soliq-docs
```

### Nginx (Static Export)

`next.config.js` ga qo'shing:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Build va deploy:

```bash
npm run build

# Build papkani nginx ga ko'chiring
cp -r out/* /var/www/soliq-docs/
```

Nginx config (`/etc/nginx/sites-available/soliq-docs`):

```nginx
server {
    listen 80;
    server_name docs.soliqservis.uz;

    root /var/www/soliq-docs;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SSL uchun (Let's Encrypt)
    # listen 443 ssl;
    # ssl_certificate /etc/letsencrypt/live/docs.soliqservis.uz/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/docs.soliqservis.uz/privkey.pem;
}
```

## 🔐 Security

### API Keys yashirish

Agar API documentation authentication talab qilsa:

```typescript
// app/page.tsx
const swaggerJson = {
  ...originalSwaggerJson,
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "X-API-Key",
      },
      BasicAuth: {
        type: "http",
        scheme: "basic",
      },
    },
  },
};
```

### CORS sozlamalari

Production'da CORS to'g'ri sozlangan bo'lishi kerak:

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://docs.soliqservis.uz",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
```

## 📚 Usage Examples

### Environment Switcher bilan

```typescript
// Production API'ga so'rov yuborish
const response = await fetch(
  `${ENVIRONMENTS.production.url}/api/factura-create`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN",
    },
    body: JSON.stringify(data),
  }
);
```

### Swagger JSON ni dinamik yuklash

```typescript
// Remote URL dan yuklash
const response = await fetch("https://api.soliqservis.uz/swagger.json");
const swaggerJson = await response.json();
```

## 🐛 Troubleshooting

### Swagger JSON yuklanmayapti

**Muammo:** JSON file topilmayapti

**Yechim:**

```typescript
// tsconfig.json ga qo'shing
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

### Port band

**Muammo:** Port 3000 allaqachon ishlatilmoqda

**Yechim:**

```bash
# Boshqa portda ishga tushiring
PORT=3001 npm run dev
```

### Build error: Type errors

**Muammo:** TypeScript type errors

**Yechim:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": false,
    "skipLibCheck": true
  }
}
```

### Memory leak during build

**Muammo:** Build vaqtida memory tugayapti

**Yechim:**

```bash
# Node memory limit oshiring
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## 🎨 Customization

### Logo qo'shish

```typescript
// app/page.tsx
<RedocStandalone
  spec={swaggerJson}
  options={{
    ...options,
    logo: {
      url: "/logo.png",
      backgroundColor: "#FFFFFF",
      altText: "Soliq Servis Logo",
    },
  }}
/>
```

### Custom CSS

```css
/* app/globals.css */
.redoc-wrap {
  background-color: #f5f5f5;
}

.menu-content {
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.api-content {
  padding: 20px;
}
```

## 📊 Analytics Integration

### Google Analytics

```typescript
// app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
```

## 🤝 Contributing

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Branch'ni push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

### Development Guidelines

- Code style: Prettier + ESLint
- Commit message format: Conventional Commits
- Branch naming: `feature/`, `fix/`, `docs/`

## 📝 License

MIT License - batafsil [LICENSE](LICENSE) faylida.

## 📞 Contact

- **Call Center:** 1198
- **Email:** servis@soliq.uz
- **Website:** https://new.soliqservis.uz
- **Documentation:** https://docs.soliqservis.uz

## 🙏 Acknowledgments

- [Redoc](https://github.com/Redocly/redoc) - API documentation tool
- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📈 Roadmap

- [ ] Multi-language support (UZ, RU, EN)
- [ ] Interactive code examples
- [ ] API testing playground
- [ ] Authentication flow examples
- [ ] Webhook documentation
- [ ] SDK generation
