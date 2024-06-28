import "../css/app.css";
import "./bootstrap";

import { ThemeProvider } from "@/Providers/Theme";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import { Toaster } from "./Components/ui/toaster";
import { TooltipProvider } from "./Components/ui/tooltip";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} | ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeProvider defaultTheme={"system"}>
        <TooltipProvider>
          <IntlProvider locale="id">
            <App {...props} />
            <Toaster />
          </IntlProvider>
        </TooltipProvider>
      </ThemeProvider>,
    );
  },
  progress: {
    color: "#4B5563",
  },
});
