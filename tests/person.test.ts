import { faker } from "@faker-js/faker";
import { Person } from "../src/classes/Person";
import PersonException from "../src/classes/PersonException";

describe("Person", () => {
  test("Person est défini", () => {
    expect(Person).toBeDefined();
  });

  describe("generateGroups", () => {
    test("devrait générer des groupes composés d'un nombre égal de personnes", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 20; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      const groupCount = 5;
      const groups = Person.generateGroups(persons, groupCount);

      expect(groups.length).toBe(groupCount);

      const groupSize = persons.length / groupCount;
      groups.forEach((group) => {
        expect(group.length).toBe(groupSize);
      });
    });

    test("devrait générer une erreur s'il n'est pas possible de répartir uniformément les personnes dans les groupes", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 19; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      const groupCount = 5;

      expect(() => {
        Person.generateGroups(persons, groupCount);
      }).toThrowError(new PersonException("Le nombre de personnes ne peut pas être réparti également dans les groupes."));
    });
  });
});
