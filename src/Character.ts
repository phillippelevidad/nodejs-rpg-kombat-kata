export class Character {
  private _health = 1000;
  readonly level = 1;

  get health(): number {
    return this._health;
  }
  private set health(value: number) {
    this._health = value;
  }

  get isAlive(): boolean {
    return this.health > 0;
  }

  attack(other: Character): void {
    other.takeDamage(100);
  }

  takeDamage(damage: number): void {
    this.health -= damage;
  }
}
