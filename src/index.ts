import { concatenation } from "./concatenation";

const button = document.querySelector("button")!;
const input = document.querySelector("input")!;

if (button && input) {
  button.addEventListener("click", () => {
    concatenation(input.value, "hello!");
  });
}

let name: string = "bob"; //явна типізація, його краще використовувати
name = "5";

let age = 5; // неявна типізація
age = 12;

const numbers: number[] = [1, 2, 3, 4, 5];
numbers.push(7);

//Багатовимірні масиви
const numbersMatrix: number[][] = [
  [1, 2],
  [3, 4],
];

//Масиви з елементами різних типів
let mixedArray: (number | string)[] = [1, "two"];

//У такому масиві можна зберігати будь-що.
let arrAny: any[];

// Ми також можемо вказати тип масиву через узагальнення (generic):
let numbersArray: Array<number> = [1, 2, 3, 4, 5];

//так читати незручно
const user: { name: string; age: number } = {
  name: "Bob",
  age: 12,
};

type User1 = {
  name1: string;
  age1: number;
  // age: number | string;
};
const user1: User1 = {
  name1: "Bob",
  age1: 13,
};
user1.name1 = "12";

type eventType = "lesson";
const event: eventType = "lesson";

//оператор АБО позначається |
type eventType1 = "lesson" | "deadline";
const event1: eventType = "lesson";

// тип any виключає типізацію, не рекомендують використовувати
let cat: any = "catty";
cat = 10;
cat = false;

//unknown включає перевірку, коли до змінної застосов.специфічний метод,що працює зконкретним типом даних
let name2: unknown = "Bob";
name2 = 10;
// name2.toFixed(); // тут видає помилку

// unionType - це знак АБО |
type size = "large" | "medium" | "small";
//або те ж саме можна записати
enum Sizes {
  large = "large",
  medium = "medium",
  small = "small",
}

const button1: size = "large"; // можна помилитись в написанні
const button2: Sizes = Sizes.large;

function add(num1: number, num2: number): string {
  // return num1 + num2; //помилка, бо результат очікує рядок
  return `${num1}` + `${num2}`; //шаблонний рядок, щоб результат додавання був рядок
}
console.log(add(2, 3));

//void говорить, що функція щос виконує, але нічого не повертає
function add1(num1: number, num2: number): void {
  console.log(num1 + num2);
}
add1(3, 3);

//Функція, що приймає обєкт
type User2 = {
  name: string;
};
function great(user: User2): void {
  console.log(`Hello, ${user.name}`);
}

//Функція, яка приймає 3 аргументи і пвертає обєкт
type User3 = {
  name: string;
  age: number;
  hobby: string;
};
function userConstructor(name: string, age: number, hobby: string): User3 {
  return {
    name,
    age,
    hobby,
  };
}

//обєкт, у якого один з ключів - метод
type Car = {
  color: string;
  price: number;
  currency: string;
  start: (color: string) => {};
};
const Car = {
  color: "red",
  price: 1000,
  currency: "UAH",
  start(color) {
    console.log(`hello ${color}`);
  },
};

// Опціональне поле - поле, яке може бути або не бути в обєкті (необовязкое поле) - позначається знаком ?
type User = {
  name: string;
  age: number;
  role?: string;
};

const user4: User = {
  name: "Billy",
  age: 23,
};

const admin: User = {
  name: "Boddy",
  age: 53,
  role: "Admin",
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Індексні властивості

// звичайний запис, тоді кожному обєкту треба прописувати типи. Це незручно, і повторюваний код
// type Fruits = {
//   apple: number;
//   orange: number;
//   banana: number;
// };

// type FrozenGoods = {
//   fish: number;
//   iceCream: number;
//   berry: number;
// };

type Goods = {
  [key: string]: number;
};

const fruits: Goods = {
  apple: 24,
  orange: 35,
  banana: 40,
};

const frozenGoods: Goods = {
  fish: 24,
  iceCream: 35,
  berry: 40,
};

//Визначте інтерфейс для обєкта , де ключем є рядок, а значенням - рядок або число.
// Напишіть декілька прикладів таких обєктів

type Info = {
  [key: string]: string | number;
};

const userInfo: Info = {
  name: "Bob",
  age: 20,
  country: "Ukraine",
};

const BookInfo: Info = {
  title: "Jungle",
  pages: 300,
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//Generic

//Створіть загальну функцію, яка приймає масив будь-якого типу і повертає масив у зворотньоиу порядку
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}

let numbers1 = reverse<number>([1, 2, 3, 4, 5]);
console.log(numbers1);

let strings = reverse(["a", "b", "c", "d"]);
console.log(strings);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//extends аналог слова "перевіряє". extends пишеться після того типу, який треба перевірити (провалідувати)

function lengthOfObject<T extends { length: number }>(obj: T): number {
  return obj.length;
}

lengthOfObject({ name: "Bob", length: 10 });
console.log(lengthOfObject({ name: "Bob", length: 10 }));

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// keyOf - ключ чого
// [] - коли отримуємо щось динамічне
//Створіть загальну функцію getProperty, яка приймає обєкт та ключ як рядок.
//Функія повинна повертати значення цього ключа з обєкта

const student = {
  name: "Bob",
  age: 20,
};

function getProperty<ObjType, KeyType extends keyof ObjType>(
  obj: ObjType,
  key: KeyType
): ObjType[KeyType] {
  return obj[key];
}

let studentName = getProperty(student, "name");
console.log(studentName); //"Bob"

// let studentAddress = getProperty(student, "address");
// console.log(studentAddress); //undefined і помилка TypeScript, бо немає такого поля

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Partial - говорить візьми частинку цього типу <T>. Для оновлення поля чи полей обєкту

type Todo = {
  title: string;
  description: string;
  completed: boolean;
};

function updateTodo(todo: Todo, fieldToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldToUpdate };
}

const todo1: Todo = {
  title: "TypeScript",
  description: "Learning",
  completed: false,
};

const todo2 = updateTodo(todo1, {
  description: "Learned already",
  completed: true,
});
console.log(todo2);

///////////////////////////////////////////////////////////////////////////////////////////////////
//Readonly

type User4 = {
  name: string;
  age: number;
};

const John: Readonly<User> = {
  name: "John",
  age: 20,
};

// John.age = 10; //Cannot assign to 'age' because it is a read-only property.
// console.log(John);

//для масивів ReadonlyArray
const numbers2: ReadonlyArray<number> = [1, 2, 3, 4, 5];

// numbers2.push(6); //Property 'push' does not exist on type 'readonly number[]'.
// numbers2[0] = 5; //Index signature in type 'readonly number[]' only permits reading.

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Pick<T, K> - вибирає поля з вказаного типу

type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonSummary = Pick<Person, "name" | "age">;

//під капотом запис вище напище наступне:
// type PersonSummary = {
//   name: string;
//   age: number;
// };

const BobSummary: PersonSummary = {
  name: "Bob",
  age: 20,
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Omit<T, K> - видаляє вказані ключі типу

type Person2 = {
  name: string;
  age: number;
  address: string;
};

type PersonSummary2 = Omit<Person2, "address">;

const Rally: PersonSummary2 = {
  name: "Rally",
  age: 22,
  //address: "Ukraine", //це поле недопустиме
};

//Record<K, T> - зберігає сталі значення, які не будуть змінюватись. Відмінність від enum - в Record можна добавляти динамічно значення, а в enum - не можна

type CityDatabase = Record<string, number>; //string - тип ключа, number - тип значення

const Database: CityDatabase = {
  Kyiv: 123000,
  Kharkiv: 34200,
  Lviv: 21300,
};

//Додаємо новий запис в базу даних
Database.Odessa = 124000;
