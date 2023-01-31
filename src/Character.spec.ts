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
    const target = new Character();
    while (target.health > 0) character.attack(target);
    expect(target.isAlive).toBe(false);
  });

  it("Dead characters cannot be healed", () => {
    const character = new Character();
    const target = new Character();
    while (target.health > 0) character.attack(target);
    expect(() => target.heal()).toThrow();
  });

  it("Healing cannot raise health above 1000", () => {
    const character = new Character();
    character.heal();
    expect(character.health).toBe(1000);
  });

  it("Cannot deal damage to itself", () => {
    const character = new Character();
    expect(() => character.attack(character)).toThrow();
  });

  it("If the target is 5 or more Levels above the attacker, Damage is reduced by 50%", () => {
    const character = new Character();
    const target = new Character();
    target.level = 6;
    character.attack(target);
    expect(target.health).toBe(950);
  });

  it("If the target is 5 or more Levels below the attacker, Damage is increased by 50%", () => {
    const character = new Character();
    const target = new Character();
    character.level = 6;
    character.attack(target);
    expect(target.health).toBe(850);
  });
});
