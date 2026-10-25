
"use client";

import Image from "next/image";
import { Tile } from "@/types/aac";

type PictogramTileProps = {
  tile: Tile;
  onSelect: (tile: Tile) => void;
};

export default function PictogramTile({
  tile,
  onSelect,
}: PictogramTileProps) {
  const imageUrl = `/pictograms/${tile.category}/${tile.id}.webp`;

  return (
    <button
      type="button"
      onClick={() => onSelect(tile)}
      className="
        flex h-full min-h-0 min-w-0
        flex-col items-center justify-center
        overflow-hidden rounded-xl
        border-2 border-[#E7D2BE]
        bg-white px-1.5 py-1
        text-center transition
        hover:border-[#E76F51]
        hover:shadow-sm
        focus-visible:outline-2
        focus-visible:outline-[#E76F51]
        md:flex-row md:px-2 md:text-left
      "
    >
      {/* PICTOGRAM */}
      <div className="flex w-full min-h-0 shrink items-center justify-center md:w-[45%] md:shrink-0">
        <div className="relative h-[48px] w-[65px] shrink-0 md:h-[76px] md:w-[96px]">
          <Image
            src={imageUrl}
            alt={tile.english}
            fill
            sizes="(max-width: 767px) 65px, 96px"
            loading={tile.id === "person_me" ? "eager" : "lazy"}
            className="object-contain"
          />
        </div>
      </div>

      {/* ENGLISH AND URDU LABELS */}
      <div
        className="
          flex min-h-0 min-w-0 w-full
          flex-col items-center justify-center
          gap-0.5
          md:flex-1 md:items-start
          md:gap-1 md:pl-2
        "
      >
        <span
          className="
            block w-full min-w-0
            whitespace-normal break-words
            text-center text-[12px]
            font-bold leading-tight
            text-[#3F241C]
            md:text-left md:text-lg
          "
        >
          {tile.english}
        </span>

        <span
          className="
            block w-full min-w-0
            whitespace-normal break-words
            text-center text-[13px]
            font-semibold leading-snug
            text-[#8A6557]
            md:text-left md:text-xl
          "
          dir="rtl"
          lang="ur"
        >
          {tile.urdu}
        </span>
      </div>
    </button>
  );
}
