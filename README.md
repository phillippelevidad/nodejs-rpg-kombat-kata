# RPG Combat Kata

Source: [https://github.com/ardalis/kata-catalog](https://github.com/ardalis/kata-catalog)

# Background

These are my solutions to the challenges below.

🌿 The repository has one branch for each iteration.

⚠️ The main branch is just the starting project, without any relevant code.

This is a fun kata that has the programmer building simple combat rules, as for a role-playing game (RPG). It is implemented as a sequence of iterations. The domain doesn't include a map or any other character skills apart from their ability to damage and heal one another.

## Iteration One

✅ [See the changes for this iteration](https://github.com/phillippelevidad/nodejs-rpg-kombat-kata/pull/1/files)

1. All Characters, when created, have:

   - Health, starting at 1000
   - Level, starting at 1
   - May be Alive or Dead, starting Alive (Alive may be a true/false)

1. Characters can Deal Damage to Characters.

   - Damage is subtracted from Health
   - When damage received exceeds current Health, Health becomes 0 and the character dies

1. A Character can Heal a Character.
   - Dead characters cannot be healed
   - Healing cannot raise health above 1000

## Iteration Two

✅ [See the changes for this iteration](https://github.com/phillippelevidad/nodejs-rpg-kombat-kata/pull/2/files)

1. A Character cannot Deal Damage to itself.

1. A Character can only Heal itself.

1. When dealing damage:
   - If the target is 5 or more Levels above the attacker, Damage is reduced by 50%
   - If the target is 5 or more Levels below the attacker, Damage is increased by 50%

## Iteration Three

✅ [See the changes for this iteration](https://github.com/phillippelevidad/nodejs-rpg-kombat-kata/pull/3/files)

1. Characters have an attack Max Range.

1. _Melee_ fighters have a range of 2 meters.

1. _Ranged_ fighters have a range of 20 meters.

1. Characters must be in range to deal damage to a target.

## Iteration Four

✅ [See the changes for this iteration](https://github.com/phillippelevidad/nodejs-rpg-kombat-kata/pull/4/files)

1. Characters may belong to one or more Factions.

   - Newly created Characters belong to no Faction.

1. A Character may Join or Leave one or more Factions.

1. Players belonging to the same Faction are considered Allies.

1. Allies cannot Deal Damage to one another.

1. Allies can Heal one another.

## Iteration Five

🕑 _The code for this iteration is pending._

1. Characters can damage non-character _things_ (props).
   - Anything that has Health may be a target
   - These things cannot be Healed and they do not Deal Damage
   - These things do not belong to Factions; they are neutral
   - When reduced to 0 Health, things are _Destroyed_
   - As an example, you may create a Tree with 2000 Health

- Original Source: http://www.slideshare.net/DanielOjedaLoisel/rpg-combat-kata
