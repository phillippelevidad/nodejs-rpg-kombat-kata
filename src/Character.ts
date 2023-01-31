const MAX_HEALTH = 1000;
const BASE_ATTACK_POINTS = 100;
const HEALING_POINTS = 100;

export class Character {
  level = 1;

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
    const damage = this.getDamage(this, other);
    other.takeDamage(damage);
  }

  heal(): void {
    if (!this.isAlive) throw new Error("A dead character cannot heal.");
    this.health += HEALING_POINTS;
  }

  private getDamage(attacker: Character, target: Character): number {
    if (target.level - attacker.level >= 5)
      return Math.floor(BASE_ATTACK_POINTS * 0.5);
    if (target.level - attacker.level <= 5)
      return Math.floor(BASE_ATTACK_POINTS * 1.5);
    return BASE_ATTACK_POINTS;
  }

  private takeDamage(damage: number): void {
    this.health -= damage;
  }
}
