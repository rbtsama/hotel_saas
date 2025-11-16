import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./styles/globals.css";
import { ViewModeProvider } from "./contexts/ViewModeContext";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ViewModeProvider>
      <Outlet />
    </ViewModeProvider>
  );
}
