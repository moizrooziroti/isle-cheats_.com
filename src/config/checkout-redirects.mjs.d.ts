export declare const CHECKOUT_URLS: {
  readonly theIsle: string;
  readonly hwidSpoofer: string;
  readonly cloudDma: string;
  readonly ugc: string;
  readonly skinChanger: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;
