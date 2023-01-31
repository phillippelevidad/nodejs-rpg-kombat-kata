import { Character } from "./Character";
import { describe, expect, it } from "@jest/globals";
import { CharacterType } from "./CharacterType";

const PLAYER_1_POSITION = 10;
const PLAYER_2_POSITION_CLOSE = 9;
const PLAYER_2_POSITION_FAR = -10;
const PLAYER_2_POSITION_TOO_FAR = -11;

describe("Character", () => {
  it("Starts with 1000 health", () => {
    const character = new Character(PLAYER_1_POSITION);
    expect(character.health).toBe(1000);
  });

  it("Starts at level 1", () => {
    const character = new Character(PLAYER_1_POSITION);
    expect(character.level).toBe(1);
  });

  it("Starts alive", () => {
    const character = new Character(PLAYER_1_POSITION);
    expect(character.isAlive).toBe(true);
  });

  it("Can attack other characters", () => {
    const character = new Character(PLAYER_1_POSITION);
    const other = new Character(PLAYER_2_POSITION_CLOSE);
    expect(() => character.attack(other)).not.toThrow();
  });

  it("Can only attack characters within range (melee)", () => {
    const character = new Character(PLAYER_1_POSITION);
    const close = new Character(PLAYER_2_POSITION_CLOSE);
    const far = new Character(PLAYER_2_POSITION_FAR);
    expect(() => character.attack(close)).not.toThrow();
    expect(() => character.attack(far)).toThrow();
  });

  it("Can only attack characters within range (ranged)", () => {
    const character = new Character(PLAYER_1_POSITION, CharacterType.Ranged);
    const far = new Character(PLAYER_2_POSITION_FAR);
    const tooFar = new Character(PLAYER_2_POSITION_TOO_FAR);
    expect(() => character.attack(far)).not.toThrow();
    expect(() => character.attack(tooFar)).toThrow();
  });

  it("Dies when health reaches 0", () => {
    const character = new Character(PLAYER_1_POSITION);
    const target = new Character(PLAYER_2_POSITION_CLOSE);
    while (target.health > 0) character.attack(target);
    expect(target.isAlive).toBe(false);
  });

  it("Dead characters cannot be healed", () => {
    const character = new Character(PLAYER_1_POSITION);
    const target = new Character(PLAYER_2_POSITION_CLOSE);
    while (target.health > 0) character.attack(target);
    expect(() => target.heal()).toThrow();
  });

  it("Healing cannot raise health above 1000", () => {
    const character = new Character(PLAYER_1_POSITION);
    character.heal();
    expect(character.health).toBe(1000);
  });

  it("Cannot deal damage to itself", () => {
    const character = new Character(PLAYER_1_POSITION);
    expect(() => character.attack(character)).toThrow();
  });

  it("If the target is 5 or more Levels above the attacker, Damage is reduced by 50%", () => {
    const character = new Character(PLAYER_1_POSITION);
    const target = new Character(PLAYER_2_POSITION_CLOSE);
    target.level = 6;
    character.attack(target);
    expect(target.health).toBe(950);
  });

  it("If the target is 5 or more Levels below the attacker, Damage is increased by 50%", () => {
    const character = new Character(PLAYER_1_POSITION);
    const target = new Character(PLAYER_2_POSITION_CLOSE);
    character.level = 6;
    character.attack(target);
    expect(target.health).toBe(850);
  });

  it("Starts with no factions", () => {
    const character = new Character(PLAYER_1_POSITION);
    expect(character.factions.size).toBe(0);
  });

  it("Can join or leave one or more factions", () => {
    const character = new Character(PLAYER_1_POSITION);

    expect(() => character.factions.add("Faction 1")).not.toThrow();
    expect(() => character.factions.add("Faction 2")).not.toThrow();
    expect(character.factions.size).toBe(2);

    expect(() => character.factions.delete("Faction 1")).not.toThrow();
    expect(character.factions.size).toBe(1);
  });
});
