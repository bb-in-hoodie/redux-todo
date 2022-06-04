import { getLastModifiedAt } from "../apis/todoListApi";

/**
 * Return a copy of a target after updating its 'lastModifiedAt' value
 * @param target a target object whose 'lastModifiedAt' should be updated
 * @returns a copy of the target with updated 'lastModifiedAt'
 */
export function getTimestampUpdatedCopy<T extends { lastModifiedAt: string }>(
  target: T
) {
  return {
    ...target,
    lastModifiedAt: new Date().toISOString(),
  };
}

/**
 * Check if client has stale state by comparing its timestamp with server's
 * @param clientModifiedTime client-side 'lastModifiedTime' value
 * @returns true if client state is stale
 */
export async function checkClientStaleness(clientModifiedTime: Date) {
  try {
    // fetch server-side lastModifiedAt value
    const { data } = await getLastModifiedAt();
    const { lastModifiedAt } = data;
    const serverModifiedTime = new Date(lastModifiedAt);

    // compare it with client-side lastModifiedAt value
    return clientModifiedTime < serverModifiedTime; // true if client state is stale
  } catch (e) {
    console.error("an error occurred during comparing tiemstamp with server");
    throw e;
  }
}
