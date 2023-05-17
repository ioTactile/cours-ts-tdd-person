import PersonException from "./PersonException";

export class Person {
    constructor(public firstname: string, public lastname: string) {}

    static generateGroups(persons: Person[], groupCount: number): Person[][] {
        if (persons.length % groupCount !== 0) {
          throw new PersonException('Le nombre de personnes ne peut pas être réparti également dans les groupes.');
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
}