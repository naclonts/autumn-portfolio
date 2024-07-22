/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
// gatsby-browser.js
import React from "react";

// export const onClientEntry = () => {
//   if (typeof window.IntersectionObserver === `undefined`) {
//     import(`intersection-observer`);
//   }
// };

export const onInitialClientRender = () => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bona+Nova+SC:ital,wght@0,400;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};
