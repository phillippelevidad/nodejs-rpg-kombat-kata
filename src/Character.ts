const MAX_HEALTH = 1000;

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
    other.takeDamage(100);
  }

  heal(other: Character): void {
    if (!other.isAlive) throw new Error("Cannot heal dead character.");
    other.receiveHealing(100);
  }

  takeDamage(damage: number): void {
    this.health -= damage;
  }

  receiveHealing(healing: number): void {
    this.health += healing;
  }
}
