// Le vrai logo d'ONHA (photo de profil Instagram), vectorisé par scripts/logo.mjs :
// public/logo.svg (lettrage « onha / Vietnam Street Food ») et public/logo-rond.svg (badge dans son cercle au pinceau).

/** Lettrage seul, affiché en masque CSS : il prend la couleur du texte (currentColor). */
export function Logo({ className = "w-28" }: { className?: string }) {
  return (
    <span className={`logo-mark ${className}`} role="img" aria-label="ONHA Vietnam Street Food" translate="no">
      <span className="sr-only">ONHA Vietnam Street Food</span>
    </span>
  );
}

/** Badge rond complet. */
export function Badge({ className = "h-24 w-24" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo-rond.svg" alt="ONHA Vietnam Street Food" width={120} height={120} loading="lazy" className={className} />;
}
