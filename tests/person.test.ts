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

      const memberCount = 4;
      const groups = Person.generateGroups(persons, memberCount);

      expect(groups.length).toBe(memberCount);

      groups.forEach((group) => {
        expect(group.length).toBe(persons.length / memberCount);
      });
    });

    test("devrait générer une erreur lorsque le nombre de membres est inférieur à 2", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 20; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      const memberCount = 1;

      expect(() => {
        Person.generateGroups(persons, memberCount);
      }).toThrowError(new PersonException("Le nombre de membres doit être supérieur ou égal à 2."));
    });


    test("devrait générer une erreur lorsque le nombre de membres est supérieur à l'effectif total des personnes", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 20; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      const memberCount = 25;

      expect(() => {
        Person.generateGroups(persons, memberCount);
      }).toThrowError(new PersonException("Le nombre de membres ne peut pas être supérieur à l'effectif total des personnes."));
    });

    test("devrait générer une erreur lorsque le nombre de personnes ne peut pas être réparti uniformément entre les membres", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 19; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      const memberCount = 5;

      expect(() => {
        Person.generateGroups(persons, memberCount);
      }).toThrowError(new PersonException("Le nombre de personnes ne peut pas être réparti uniformément entre les membres."));
    });
  });
});
