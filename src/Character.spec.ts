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
});
