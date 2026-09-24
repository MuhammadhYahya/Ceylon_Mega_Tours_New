import type { AssetSource } from "sanity";
import { UploadIcon } from "@sanity/icons/Upload";
import { CompressedImageSource } from "./CompressedImageSource";

/**
 * Registered in sanity.config.ts as the *only* image asset source, so it
 * replaces Sanity's default "Upload" tab everywhere rather than sitting
 * alongside it — an editor who reaches for the familiar upload button still
 * gets compression, with nothing new to learn or remember to click.
 *
 * `uploadMode: 'component'` hands the Studio's native picker off to
 * CompressedImageSource entirely: it renders its own drop zone, compresses
 * the file, uploads it, and reports the finished asset back itself.
 */
export const compressedImageAssetSource: AssetSource = {
  name: "compressed-upload",
  title: "Загрузить фото (авто-сжатие)",
  component: CompressedImageSource,
  icon: UploadIcon,
  uploadMode: "component",
};
