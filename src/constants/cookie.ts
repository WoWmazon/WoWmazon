const MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

export const COOKIE_OPTIONS = {
  secure: true,
  maxAge: MAX_AGE,
  httpOnly: true,
};
