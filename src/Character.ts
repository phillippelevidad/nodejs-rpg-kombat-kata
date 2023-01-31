import { CharacterType, getAttackMaxRange } from "./CharacterType";

const MAX_HEALTH = 1000;
const BASE_ATTACK_POINTS = 100;
const HEALING_POINTS = 100;

export class Character {
  level = 1;
  position = 0;
  readonly attackMaxRange: number;
  readonly factions: Set<string> = new Set();

  constructor(
    startingPosition: number,
    type: CharacterType = CharacterType.Melee
  ) {
    this.position = startingPosition;
    this.attackMaxRange = getAttackMaxRange(type);
  }

  private _health = MAX_HEALTH;

  get health(): number {
    return this._health;
  }
  private set health(value: number) {
    this._health = Math.min(Math.max(0, value), MAX_HEALTH);
  }

  get isAlive(): boolean {
    return this.health > 0;
  }

  attack(other: Character): void {
    if (other === this) throw new Error("Cannot attack self.");
    this.ensureWithRange(other);
    const damage = this.getDamage(other);
    other.takeDamage(damage);
  }

  heal(): void {
    if (!this.isAlive) throw new Error("A dead character cannot heal.");
    this.health += HEALING_POINTS;
  }

  isAlliedWith(other: Character): boolean {
    const myFactions = Array.from(this.factions.keys());
    return myFactions.some((f) => other.factions.has(f));
  }

  private getDamage(target: Character): number {
    if (target.level - this.level >= 5)
      return Math.floor(BASE_ATTACK_POINTS * 0.5);
    if (target.level - this.level <= 5)
      return Math.floor(BASE_ATTACK_POINTS * 1.5);
    return BASE_ATTACK_POINTS;
  }

  private takeDamage(damage: number): void {
    this.health -= damage;
  }

  private ensureWithRange(other: Character): void | never {
    const distance = Math.abs(this.position - other.position);
    if (distance > this.attackMaxRange)
      throw new Error(
        `Target is out of range. Max range is ${this.attackMaxRange}.`
      );
  }
}
