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
    this.ensureIsEligibleAttackTarget(other);
    const damage = this.getDamagePoints(other);
    other.takeDamage(damage);
  }

  healAlly(ally: Character): void {
    this.heal(ally);
  }

  healSelf(): void {
    this.heal(this);
  }

  isWithinAttackRange(other: Character): boolean {
    const distance = Math.abs(this.position - other.position);
    return distance <= this.attackMaxRange;
  }

  isAlliedWith(other: Character): boolean {
    const myFactions = Array.from(this.factions.keys());
    return myFactions.some((f) => other.factions.has(f));
  }

  private getDamagePoints(target: Character): number {
    if (target.level - this.level >= 5)
      return Math.floor(BASE_ATTACK_POINTS * 0.5);
    if (target.level - this.level <= 5)
      return Math.floor(BASE_ATTACK_POINTS * 1.5);
    return BASE_ATTACK_POINTS;
  }

  private heal(other: Character): void {
    this.ensureIsEligibleHealingTarget(other);
    other.receiveHealing(HEALING_POINTS);
  }

  private takeDamage(damage: number): void {
    this.health -= damage;
  }

  private receiveHealing(healing: number): void {
    this.health += healing;
  }

  private ensureIsEligibleAttackTarget(other: Character): void | never {
    if (other === this) throw new Error("Cannot attack self.");
    if (!this.isWithinAttackRange(other))
      throw new Error("Target is out of range.");
    if (this.isAlliedWith(other)) throw new Error("Cannot attack an ally.");
  }

  private ensureIsEligibleHealingTarget(other: Character): void | never {
    if (other !== this && !this.isAlliedWith(other))
      throw "Can only heal self or allies.";
    if (!other.isAlive) throw new Error("Cannot heal a dead character.");
  }
}
