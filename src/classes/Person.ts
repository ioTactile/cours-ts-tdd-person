import PersonException from "./PersonException";

export class Person {
  constructor(public firstname: string, public lastname: string) {}

  static generateGroups(persons: Person[], groupCount: number): Person[][] {
    if (persons.length % groupCount !== 0) {
      throw new PersonException("Le nombre de personnes ne peut pas être réparti également dans les groupes.");
    }

    const clonedPersons = [...persons];

    const groups: Person[][] = [];
    const groupSize = clonedPersons.length / groupCount;

    for (let i = 0; i < groupCount; i++) {
      const group: Person[] = [];
      for (let j = 0; j < groupSize; j++) {
        const randomIndex = Math.floor(Math.random() * clonedPersons.length);
        const person = clonedPersons.splice(randomIndex, 1)[0];
        group.push(person);
      }
      groups.push(group);
    }

    return groups;
  }

  static generateMembers(persons: Person[], memberCount: number): Person[][] {
    if (memberCount < 2) {
      throw new PersonException("Le nombre de membres doit être supérieur ou égal à 2.");
    }

    if (memberCount > persons.length) {
      throw new PersonException("Le nombre de membres ne peut pas être supérieur à l'effectif total des personnes.");
    }

    if (persons.length % memberCount !== 0) {
      throw new PersonException("Le nombre de personnes ne peut pas être réparti uniformément entre les membres.");
    }

    const clonedPersons = [...persons];

    const groups: Person[][] = [];
    const groupSize = clonedPersons.length / memberCount;

    for (let i = 0; i < memberCount; i++) {
      const group: Person[] = [];

      for (let j = 0; j < groupSize; j++) {
        const randomIndex = Math.floor(Math.random() * clonedPersons.length);
        const person = clonedPersons.splice(randomIndex, 1)[0];
        group.push(person);
      }
      groups.push(group);
    }

    return groups;
  }

  static generateMultipleOfEightGroups(persons: Person[]): Person[][] {
    if (persons.length < 16) {
      throw new PersonException("Le nombre de personnes doit être supérieur ou égal à 16 pour générer des groupes multiples de 8.");
    }

    if (persons.length % 8 !== 0) {
      throw new PersonException("Le nombre de personnes ne permet pas d'obtenir des groupes multiples de 8.");
    }

    const clonedPersons = [...persons];

    const groupCount = persons.length / 8;
    const groups: Person[][] = [];

    for (let i = 0; i < groupCount; i++) {
      const group: Person[] = [];

      for (let j = 0; j < 8; j++) {
        const randomIndex = Math.floor(Math.random() * clonedPersons.length);
        const person = clonedPersons.splice(randomIndex, 1)[0];
        group.push(person);
      }

      groups.push(group);
    }

    return groups;
  }
}
