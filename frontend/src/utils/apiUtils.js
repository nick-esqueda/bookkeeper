export const customFetch = async (path, options = {}) => {
  const customOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...customOptions,
    ...options,
    headers: {
      ...customOptions.headers,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}${path}`,
    mergedOptions
  );

  if (!response.ok) {
    const endpoint = `${mergedOptions.method || "GET"} ${path}`;
    const errorResponse = await response.json();
    console.error(`Backend error response for ${endpoint}: `, errorResponse);
    throw new Error(`Backend request failed: ${endpoint}`);
  }

  // add artificial API response time for smoother UI loading experience
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 200);
  });

  if (response.status === 204) {
    // cannot call response.json() for 204 No Content responses
    return;
  }
  return response.json();
};
