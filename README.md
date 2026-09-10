# Kosmetika Lima — web

Statický web pro kosmetický salon v Hlučíně. Postaveno na [Astro](https://astro.build),
běží na webhostingu WEDOS. Žádný WordPress, žádná databáze, žádné pluginy.

---

## Nejčastější úkol: změnit cenu

1. Na GitHubu otevřít `src/data/osetreni.json`
2. Kliknout na ikonu tužky vpravo nahoře
3. Přepsat hodnotu `"cena"` u příslušného ošetření
4. Dole **Commit changes**
5. Za ~2 minuty je změna živá

Není potřeba nic instalovat. Jde to i z mobilu.

**Pozor na dvě věci:** hodnoty musí zůstat v uvozovkách a mezi bloky `{ }` musí
být čárka — kromě posledního. Když se to rozbije, GitHub Actions to zachytí a
build spadne, takže se rozbitý web na hosting nedostane.

## Kde co je

| Soubor | K čemu slouží |
|---|---|
| `src/data/osetreni.json` | ceny, popisy a kategorie všech ošetření |
| `src/data/kontakt.json` | telefon, adresa, otevírací doba, IČO, značky |
| `src/data/faq.json` | časté dotazy |
| `src/styles/global.css` | barvy a rozměry — vše nahoře v `:root` |
| `src/assets/` | fotky použité na webu |
| `public/img/og.jpg` | náhled při sdílení na sítích |
| `public/.htaccess` | přesměrování, cache, bezpečnostní hlavičky |
| `src/pages/` | jednotlivé stránky |
| `src/lib/odkaz.ts` | pomocná funkce pro interní odkazy |

Nejčastěji se sahá jen do prvních tří.

## Vývoj na počítači

```bash
npm install     # jednou po stažení
npm run dev     # spustí náhled na http://localhost:4321
npm run build   # sestaví web do složky dist/
```

Potřebujete Node 22 (verze je zamčená v `.nvmrc`).

## Náhledová verze na GitHub Pages

Dokud web neběží na ostré doméně, publikuje se náhled na
`https://VASE-JMENO.github.io/kosmetika-lima/`.

Stará se o to `.github/workflows/nahled.yml`. Náhled má v HTML `noindex`,
takže se nedostane do vyhledávačů, a kanonické odkazy míří na ostrou doménu.

**Podmínka:** GitHub Pages fungují na bezplatném účtu jen u veřejného
repozitáře. V repozitáři nejsou žádné citlivé údaje — přístupy k FTP jsou
uložené v Secrets, ne v souborech.

Zapnout se to musí jednou ručně: **Settings → Pages → Source: GitHub Actions**.

Po přechodu na ostrou doménu můžete `nahled.yml` smazat.

### Odkazy a podsložka

Náhled běží v podsložce, ostrý web v kořeni domény. Proto se všechny interní
odkazy a cesty k obrázkům píšou přes funkci `odkaz()` ze `src/lib/odkaz.ts`:

```astro
---
import { odkaz } from '../lib/odkaz';
---
<a href={odkaz('/osetreni/')}>Ošetření</a>
<img src={odkaz('/img/salon.jpg')} alt="Salon" />
```

Když napíšete `href="/osetreni/"` napevno, na ostrém webu to bude fungovat,
ale na náhledu se odkaz rozbije. Na `tel:` a `mailto:` se funkce nepoužívá.

## Nasazení na ostro

Automaticky. Po každém pushi do větve `main` se spustí
`.github/workflows/deploy.yml`, web se sestaví a nahraje přes FTPS na WEDOS.
Průběh je vidět v záložce **Actions**.

Přístupové údaje jsou v **Settings → Secrets and variables → Actions**:

| Secret | Hodnota |
|---|---|
| `FTP_SERVER` | FTP server z administrace WEDOS |
| `FTP_USER` | FTP uživatel |
| `FTP_PASSWORD` | FTP heslo |
| `FTP_DIR` | cílová složka, např. `/www/domains/kosmetika-lima.cz/` |

**Nikdy nepište přístupové údaje přímo do souborů v repozitáři.**

### Když Actions nefungují

Záložní ruční cesta: `npm run build` a obsah složky `dist/` nahrát FileZillou
do stejné složky na hostingu. Nahrávají se soubory *uvnitř* `dist/`, ne složka
`dist` samotná.

## Před spuštěním ostrého webu doplnit

- [ ] Odkazy na Instagram a Facebook, nebo je nechat prázdné (pak se v patičce nezobrazí)
- [ ] Projít a doplnit `src/pages/ochrana-udaju.astro`
- [ ] Ověřit otevírací dobu v `src/data/kontakt.json`

## Provozní údaje

- **Doména a hosting:** WEDOS, účet — *doplnit, kdo ho platí a kde je přihlášení*
- **E-mailové schránky:** WEDOS mailhosting
- **Originály fotek:** *doplnit umístění*
- **Profil Firma na Googlu:** *doplnit, kdo ho spravuje*

## Co dělat po nasazení

1. Smazat workflow `.github/workflows/nahled.yml` a vypnout Pages
2. V Google Search Console odeslat `https://kosmetika-lima.cz/sitemap-index.xml`
3. Zkontrolovat, že staré adresy přesměrovávají (`/cenik/`, `/kosmetika/`, `/sluzby/`)
4. Až doběhne přesměrování, smazat starý WordPress a jeho databázi
5. Aktualizovat odkaz na web v profilu Firma na Googlu

## Výměna fotek

Fotky jsou v `src/assets/`. Nahraďte soubor stejným názvem a pushněte —
Astro si při sestavení přidá do názvu otisk obsahu (`nastroje.DkfxB3H1.webp`),
takže se návštěvníkům vždy načte nová verze. Ruční mazání cache není potřeba.

Doporučené formáty: WebP pro fotky, PNG pro logo s průhledností.
Šířka 1200 px stačí; větší soubory jen zpomalují načítání.

**Výjimka:** `public/img/og.jpg` (náhled při sdílení na Facebooku) musí zůstat
na pevné adrese, proto se otiskem neopatřuje.

## Psaní textů

Zdvořilostní oslovení se na celém webu píše **velkým písmenem**: Vás, Vám,
Vaše, Vaší. Když budete přidávat nový text, držte se toho — jinak bude web
nekonzistentní.
