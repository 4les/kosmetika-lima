/**
 * Sestaví odkaz nebo cestu k souboru s ohledem na to, kde web běží.
 *
 * Na ostrém webu (kořen domény) vrátí cestu beze změny: /osetreni/
 * Na náhledu na GitHub Pages ji předřadí názvem podsložky: /kosmetika-lima/osetreni/
 *
 * Používejte na VŠECHNY interní odkazy a na cesty k obrázkům.
 * Odkazy typu tel: a mailto: se přes tuhle funkci neposílají.
 */
export function odkaz(cesta: string): string {
  const zaklad = import.meta.env.BASE_URL.replace(/\/$/, '');
  return zaklad + cesta;
}

/** True, když běžíme na náhledu v podsložce, ne na ostré doméně. */
export const jeNahled = import.meta.env.BASE_URL !== '/';

/**
 * Opak funkce odkaz(): z adresy aktuální stránky odstraní prefix podsložky.
 * Používá se pro kanonický odkaz, který musí vždy mířit na ostrou doménu,
 * i když se stránka právě prohlíží na náhledu.
 */
export function ostraCesta(cesta: string): string {
  const zaklad = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (zaklad && cesta.startsWith(zaklad)) {
    return cesta.slice(zaklad.length) || '/';
  }
  return cesta;
}
