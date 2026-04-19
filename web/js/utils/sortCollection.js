export function sortCollection(collection, key, direction='asc'){
  if ( (!Array.isArray(collection) ) ||
       ( !key || typeof key !== 'string') ||
       ( !collection.some(obj => key in obj) )
    ){ return null }

const collectionSorted=[...collection];

collectionSorted.sort((a, b) => {
  const aHasKey = a[key] !== undefined && a[key] !== null;
  const bHasKey = b[key] !== undefined && b[key] !== null;

  if (!aHasKey && !bHasKey) return 0;          // ambos sin key → se mantiene el orden
  if (!aHasKey) return 1;                      // a sin key → va al final
  if (!bHasKey) return -1;                     // b sin key → va al final

  // ambos con key → comparación normal
  return direction === 'desc'
    ? String(b[key]).localeCompare(String(a[key]))
    : String(a[key]).localeCompare(String(b[key]));
});

  return collectionSorted;
}