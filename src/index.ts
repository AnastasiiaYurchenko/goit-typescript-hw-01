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
