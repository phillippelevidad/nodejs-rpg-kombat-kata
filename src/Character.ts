const MAX_HEALTH = 1000;
const ATTACK_POINTS = 100;
const HEALING_POINTS = 100;

export class Character {
  private _health = MAX_HEALTH;
  readonly level = 1;

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
    other.takeDamage(ATTACK_POINTS);
  }

  heal(): void {
    if (!this.isAlive) throw new Error("A dead character cannot heal.");
    this.health += HEALING_POINTS;
  }

  takeDamage(damage: number): void {
    this.health -= damage;
  }
}
