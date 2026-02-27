import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";
import type { NodeExecutor } from "@/features/executions/types";

type HttpRequestData = {
  body?: string;
  endpoint?: string;
  variableName?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  step,
  nodeId,
  context,
}) => {
  if (!data.endpoint) {
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  const result = await step.run("http-request", async () => {
    const endpoint = data.endpoint!;
    const method = data.method || "GET";

    const options: KyOptions = { method };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (data.body) {
        options.body = data.body;
        options.headers = {
          "Content-Type": "application/json",
        };
      }
    }

    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };

    return {
      ...context,
      [data.variableName || nodeId]: responsePayload,
    };
  });

  return result;
};
