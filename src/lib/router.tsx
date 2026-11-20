import {
  createContext,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { siteConfig } from '../config/site';

export type AppRoute =
  | '/'
  | '/stay'
  | '/pricing'
  | '/experiences'
  | '/gallery'
  | '/location'
  | '/contact';

const VALID_ROUTES: AppRoute[] = [
  '/',
  '/stay',
  '/pricing',
  '/experiences',
  '/gallery',
  '/location',
  '/contact',
];

function normalizePath(rawPath: string): AppRoute {
  const clean = rawPath.replace(/\/+$/, '') || '/';
  return VALID_ROUTES.includes(clean as AppRoute)
    ? (clean as AppRoute)
    : '/';
}

interface RouterContextValue {
  path: AppRoute;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<AppRoute>(() =>
    normalizePath(window.location.pathname),
  );

  const syncHeadMeta = useCallback((route: AppRoute) => {
    const meta = siteConfig.pageMeta[route] ?? siteConfig.pageMeta['/'];
    document.title = meta.title;

    const desc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (desc) desc.content = meta.description;

    const ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]',
    );
    if (ogTitle) ogTitle.content = meta.title;

    const ogDesc = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]',
    );
    if (ogDesc) ogDesc.content = meta.description;

    const twTitle = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:title"]',
    );
    if (twTitle) twTitle.content = meta.title;

    const twDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:description"]',
    );
    if (twDesc) twDesc.content = meta.description;

    const canonicalUrl = `${window.location.origin}${route === '/' ? '/' : route}`;
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]',
    );
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl;
  }, []);

  useEffect(() => {
    syncHeadMeta(path);
  }, [path, syncHeadMeta]);

  useEffect(() => {
    const handlePopState = () => {
      const next = normalizePath(window.location.pathname);
      setPath(next);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      const target = normalizePath(to);
      if (target !== path) {
        window.history.pushState({}, '', target);
        setPath(target);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    },
    [path],
  );

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { path, navigate } = useRouter();
  const isActive = normalizePath(to) === path;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      onClick?.(event);
      return;
    }

    event.preventDefault();
    onClick?.(event);
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
