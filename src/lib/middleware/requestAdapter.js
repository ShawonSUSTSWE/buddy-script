export const adaptRequest = async (req, { params } = {}) => {
  let body = {};
  try {
    const cloned = req.clone();
    body = await cloned.json();
  } catch {
    body = {};
  }

  const query = {};
  if (req.nextUrl?.searchParams) {
    Object.assign(
      query,
      Object.fromEntries(req.nextUrl.searchParams.entries()),
    );
  }

  const resolvedParams = params ? await params : {};
  Object.assign(query, resolvedParams);

  return {
    body,
    query,
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    originalUrl: req.nextUrl?.pathname,
    raw: req,
  };
};
