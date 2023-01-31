export enum CharacterType {
  Melee = "Melee",
  Ranged = "Ranged",
}

const RANGE_BY_TYPE = new Map<CharacterType, number>([
  [CharacterType.Melee, 2],
  [CharacterType.Ranged, 20],
]);

export function getAttackMaxRange(type: CharacterType): number {
  const range = RANGE_BY_TYPE.get(type);
  if (range === undefined) throw new Error("Invalid character type.");
  return range;
}
