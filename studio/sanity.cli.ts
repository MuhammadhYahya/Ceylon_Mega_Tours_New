import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "cq59tabb",
    dataset: "production",
  },
  // Deployed as a hosted Studio so the marketing site's build stays lean.
  // Change this if the hostname is taken; it becomes <name>.sanity.studio.
  studioHost: "ceylon-mega-tours",

  // Skips the app-id prompt on future `sanity deploy` runs. Assigned on
  // first deploy at https://ceylon-mega-tours.sanity.studio/
  deployment: {
    appId: "jy5eu6wzjifg8ky5f58gfi56",
  },
});
