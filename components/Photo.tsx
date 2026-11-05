import Image from "next/image";
import { firstImg } from "@/lib/media";
import { Illus, type IllusName } from "@/components/Illus";

const TINTS = {
  rice: "bg-rice-soft text-ink",
  herb: "bg-herb text-cream",
  sage: "bg-herb-soft text-herb-ink",
  cream: "bg-cream-deep text-herb-ink",
  chili: "bg-[#f6dcd6] text-chili",
} as const;
export type Tint = keyof typeof TINTS;

/**
 * Photo d'un emplacement (plat, comptoir, salle, façade…). Tant que la photo n'existe pas dans public/media,
 * une illustration au trait sur fond de couleur la remplace : déposez la photo dans assets/<dossier>/ et lancez npm run media.
 */
export function Photo({
  paths,
  alt,
  illus,
  tint = "rice",
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  illusClassName = "h-1/2 w-1/2 max-h-40 max-w-40",
}: {
  paths: readonly string[];
  alt: string;
  illus: IllusName;
  tint?: Tint;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  illusClassName?: string;
}) {
  const p = firstImg(paths);
  if (p)
    return (
      <div className={`zoom bg-cream-deep ${className}`}>
        <Image src={p.src} alt={alt} width={p.width} height={p.height} sizes={sizes} quality={75} priority={priority} fetchPriority={priority ? "high" : undefined} className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
    );
  return (
    <div className={`flex items-center justify-center ${TINTS[tint]} ${className}`} data-photo-slot={paths[0]} role="img" aria-label={alt}>
      <Illus name={illus} className={illusClassName} strokeWidth={3.2} />
    </div>
  );
}
