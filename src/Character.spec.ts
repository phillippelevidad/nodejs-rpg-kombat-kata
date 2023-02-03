import { Character } from "./Character";
import { describe, expect, it } from "@jest/globals";

describe("Character", () => {
  it("Starts with 1000 health", () => {
    const character = new Character();
    expect(character.health).toBe(1000);
  });

  it("Starts at level 1", () => {
    const character = new Character();
    expect(character.level).toBe(1);
  });

  it("Starts alive", () => {
    const character = new Character();
    expect(character.isAlive).toBe(true);
  });

  it("Can attack other characters", () => {
    const character = new Character();
    const other = new Character();
    expect(() => character.attack(other)).not.toThrow();
  });

  it("Dies when health reaches 0", () => {
    const character = new Character();
    const other = new Character();
    while (other.health > 0) character.attack(other);
    expect(other.isAlive).toBe(false);
  });

  it("Can heal other characters", () => {
    const character = new Character();
    const other = new Character();
    expect(() => character.heal(other)).not.toThrow();
  });

  it("Dead characters cannot be healed", () => {
    const character = new Character();
    const other = new Character();
    while (other.health > 0) character.attack(other);
    expect(() => character.heal(other)).toThrow();
  });

  it("Healing cannot raise health above 1000", () => {
    const character = new Character();
    const other = new Character();
    character.heal(other);
    expect(other.health).toBe(1000);
  });
});
