# GMAJ DESARROLLOS — Bv. San Juan al 600

Sitio web de presentación comercial e inversión patrimonial para **GMAJ DESARROLLOS**, correspondiente al edificio completo ubicado en Bv. San Juan al 600, Centro de Córdoba Capital (Zona Tribunales).

## Stack técnico

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4**
- **Lucide React** para iconografía
- **Google Maps Embed** para ubicación exacta en Bv. San Juan al 600

## Desarrollo local

```bash
npm install
npm run dev
```

Compilación de producción y verificación de tipos:

```bash
npm run lint
npm run build
```

## Subir a GitHub y desplegar en Vercel

1. Creá un repositorio nuevo en GitHub (sin inicializar con README ni `.gitignore`).
2. Vinculá tu repositorio y subí la rama `main`:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

3. En **Vercel**, seleccioná **Add New Project** → importá el repositorio de GitHub.
   - **Framework Preset**: `Vite` (detectado automáticamente por `vercel.json`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. (Opcional) Variables de entorno en Vercel:
   - `VITE_WHATSAPP_NUMBER`: por defecto ya apunta a `5493512042270`.
   - `VITE_GA_MEASUREMENT_ID` / `VITE_GTM_ID`: si deseás conectar Google Analytics o Tag Manager.
