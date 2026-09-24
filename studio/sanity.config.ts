import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { compressedImageAssetSource } from "./components/compressedImageAssetSource";

export default defineConfig({
  name: "ceylon-mega-tours",
  title: "Ceylon Mega Tours CMS",

  projectId: "cq59tabb",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Replaces the default "Upload" source on every image field, project-wide,
  // with one that compresses in the browser before the file reaches Sanity —
  // see components/CompressedImageSource.tsx for why. This is the one place
  // it needs to be wired in; no per-field setup, now or for a field added
  // later.
  form: {
    image: {
      assetSources: [compressedImageAssetSource],
    },
  },
});
