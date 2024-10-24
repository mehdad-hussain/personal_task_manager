import { serialize } from "object-to-formdata";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum ContentType {
  JSON = "application/json",
  FORM_DATA = "multipart/form-data",
  TEXT_PLAIN = "text/plain",
  TEXT_HTML = "text/html",
  IMAGE_JPEG = "image/jpeg",
  IMAGE_PNG = "image/png",
}

const serializeOptions = {
  indices: true,
  // Include array indices in FormData keys, defaults to false
  nullsAsUndefineds: false,
  // Treat null values like undefined values and ignore them, defaults to false
  booleansAsIntegers: false,
  // Convert true or false to 1 or 0 respectively, defaults to false
  allowEmptyArrays: false,
  // Store arrays even if they're empty, defaults to false
  noAttributesWithArrayNotation: false,
  // Don't include array notation in FormData keys for any Attributes excepted Files in arrays, defaults to false
  noFilesWithArrayNotation: false,
  // Don't include array notation in FormData keys for Files in arrays, defaults to false
  dotsForObjectNotation: false,
  // Use dots instead of brackets for object notation in FormData keys, defaults to false
  // here add logic that when photoAlbum is an array, it should be treated as a fil
};

type Options = {
  endpoint: string;
  method?: HttpMethod;
  token?: string;
  body?: unknown;
  contentType?: ContentType;
  query?: { [key: string]: string | number | boolean };
};

export const handleHttpRequest = async ({
  endpoint,
  method = HttpMethod.GET,
  token,
  body,
  contentType = ContentType.JSON,
  query,
}: Options) => {
  const headers: HeadersInit = {
    "Content-Type": contentType,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let responseBody;
  if (contentType === ContentType.JSON) {
    responseBody = body ? JSON.stringify(body) : null;
  } else if (contentType === ContentType.FORM_DATA) {
    responseBody = serialize(body, serializeOptions);
  } else {
    responseBody = body ? body.toString() : null;
  }

  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
  if (query) {
    const queryString = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");
    url += `?${queryString}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: responseBody,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
