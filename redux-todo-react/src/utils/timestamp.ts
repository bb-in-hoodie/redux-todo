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
