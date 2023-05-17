import PersonException from "./PersonException";

export class Person {
    constructor(public firstname: string, public lastname: string) {}

    static generateGroups(persons: Person[], memberCount: number): Person[][] {
        if (memberCount < 2) {
          throw new PersonException('Le nombre de membres doit être supérieur ou égal à 2.');
        }

        if (memberCount > persons.length) {
          throw new PersonException('Le nombre de membres ne peut pas être supérieur à l\'effectif total des personnes.');
        }

        if (persons.length % memberCount !== 0) {
          throw new PersonException('Le nombre de personnes ne peut pas être réparti uniformément entre les membres.');
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
}