export function pickAtRandom(array: number[]) {
  const pickedIndex = Math.floor(Math.random() * array.length);
  return array[pickedIndex];
}
