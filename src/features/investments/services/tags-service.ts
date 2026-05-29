import { apiGet } from "@/lib/api/client";

import { colorForTagId } from "../lib/tag-colors";
import type { InvestmentTag } from "../types";

type ApiTag = Readonly<{
  id: number;
  name: string;
  description: string;
}>;

function isApiTag(value: unknown): value is ApiTag {
  if (!value || typeof value !== "object") return false;
  const tag = value as Record<string, unknown>;
  return (
    typeof tag.id === "number" &&
    typeof tag.name === "string" &&
    typeof tag.description === "string"
  );
}

function normalizeTagsPayload(data: unknown): ApiTag[] {
  if (Array.isArray(data)) {
    return data.filter(isApiTag);
  }

  if (data && typeof data === "object" && "tags" in data) {
    const tags = (data as { tags: unknown }).tags;
    if (Array.isArray(tags)) return tags.filter(isApiTag);
  }

  return [];
}

function toInvestmentTag(tag: ApiTag): InvestmentTag {
  return {
    id: String(tag.id),
    name: tag.name,
    description: tag.description.trim() || undefined,
    color: colorForTagId(tag.id),
  };
}

export async function fetchTags(signal?: AbortSignal): Promise<InvestmentTag[]> {
  const data = await apiGet<unknown>("/v1/tags", { signal });
  return normalizeTagsPayload(data)
    .map(toInvestmentTag)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}
