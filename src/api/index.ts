/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchApi<T>(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  } = {}
): Promise<T> {
  const { method = "GET", headers = {}, body } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export const api = {
  get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return fetchApi<T>(url, { method: "GET", headers });
  },
  post<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return fetchApi<T>(url, { method: "POST", body, headers });
  },
  put<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return fetchApi<T>(url, { method: "PUT", body, headers });
  },
  patch<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return fetchApi<T>(url, { method: "PATCH", body, headers });
  },
  delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return fetchApi<T>(url, { method: "DELETE", headers });
  },
};
