"use client";

import { RedocStandalone } from "redoc";
import swaggerJson from "./swagger.json";

export default function Home() {
  return (
    <RedocStandalone
      spec={swaggerJson}
      options={{
        nativeScrollbars: true,
        theme: {
          colors: {
            primary: {
              main: "#1976d2",
            },
          },
          typography: {
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            headings: {
              fontFamily: "Inter, sans-serif",
            },
          },
        },

        scrollYOffset: 60,
        hideDownloadButton: false,
        disableSearch: false,
        expandResponses: "200,201",
        requiredPropsFirst: true,
        sortPropsAlphabetically: true,
        menuToggle: true,
      }}
    />
  );
}
