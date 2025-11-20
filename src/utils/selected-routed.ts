
import { type NavigateOptions, type ParsedLocation } from "@tanstack/react-router";

export const isRouteSelected = ({
  location,
  to,
  normalizePath
}: {
  to: NavigateOptions['to'], location: ParsedLocation,
  normalizePath: (path: string) => string
}) => {
  const toPath = typeof to === 'string' ? to : to;
  const currentPath = location.pathname;

  return normalizePath(currentPath) === toPath;
};
