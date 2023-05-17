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

  describe("generateMembers", () => {
    test("devrait générer des groupes composés d'un nombre égal de personnes", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 20; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      const memberCount = 4;
      const groups = Person.generateMembers(persons, memberCount);

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
        Person.generateMembers(persons, memberCount);
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
        Person.generateMembers(persons, memberCount);
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
        Person.generateMembers(persons, memberCount);
      }).toThrowError(new PersonException("Le nombre de personnes ne peut pas être réparti uniformément entre les membres."));
    });
  });

  describe("generateMultipleOfEightGroups", () => {
    test("devrait générer des groupes multiples de 8", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 32; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      const groups = Person.generateMultipleOfEightGroups(persons);

      expect(groups.length).toBe(4);

      groups.forEach((group) => {
        expect(group.length).toBe(8);
      });
    });

    test("devrait générer une erreur si le nombre de personnes est inférieur à 16", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 15; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      expect(() => {
        Person.generateMultipleOfEightGroups(persons);
      }).toThrowError(new PersonException('Le nombre de personnes doit être supérieur ou égal à 16 pour générer des groupes multiples de 8.'));
    });

    test("devrait générer une erreur si le nombre de personnes ne permet pas d'obtenir des groupes multiples de 8", () => {
      const persons: Person[] = [];
      for (let i = 0; i < 18; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const person = new Person(firstname, lastname);
        persons.push(person);
      }

      expect(() => {
        Person.generateMultipleOfEightGroups(persons);
      }).toThrowError(new PersonException('Le nombre de personnes ne permet pas d\'obtenir des groupes multiples de 8.'));
    });
  });
});
