import {
  AnchorHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";

type To =
  | string
  | {
      pathname?: string;
      search?: string;
      hash?: string;
    };

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: To;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function currentLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null,
    key: "comparison-page",
  };
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useLocation() {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    const update = () => setLocation(currentLocation());
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return location;
}

export function Link({ to, children, ...props }: LinkProps) {
  const href =
    typeof to === "string"
      ? to
      : `${to.pathname ?? window.location.pathname}${to.search ?? ""}${to.hash ?? ""}`;

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
