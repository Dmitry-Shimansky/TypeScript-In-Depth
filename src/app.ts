import { Library, RefBook, ReferenceItem, Shelf, UL } from './classes';
import { A, Author, Book, Librarian, Magazine, TOptions } from './interfaces';
import {
    bookTitleTransform,
    calcTotalPages,
    checkoutBooks,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookById,
    getBooksByCategoryPromise,
    getBookTitlesByCategory,
    getObjectProperty,
    getProperty,
    getTitles,
    logBookTitles,
    logFirstAvailable,
    logSearchResult,
    printBook,
    purge,
    setDefaultConfig,
} from './functions';
import { Category } from './enums';
import { BookRequiredFields, PersonBook, UpdateBook } from './types';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}
// ===============================================

console.log(getAllBooks());
logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(0));
console.log(calcTotalPages());

// Task 03.01

const myID: string = createCustomerID('Ann', 10);
console.log(myID);

// let idGenerator: (name: string, id: number) => string;
let idGenerator: typeof createCustomerID;
idGenerator = (name: string, id: number) => `${id}/${name}`;
idGenerator = createCustomerID;
console.log(idGenerator('Bor', 19));

// Task 03.02

createCustomer('', undefined, '');
console.log(getBookById(1));
const myBooks = checkoutBooks('Anna', 1,2,4);
console.log(myBooks);

// Task 03.03

console.log(getTitles(1, false));

// Task 03.04

console.log(bookTitleTransform('TypeScript'));
console.log(bookTitleTransform(12));

// Task 04.01

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 1000,
    markDamaged(reason: string) {
        console.log(`Damaged: ${reason}`);
    }
    // year: 2015,
    // copies: 3
};

printBook(myBook);
myBook.markDamaged('missing back cover');

// Task 04.02

class DamageLogger {
}

const logDamage: DamageLogger = (reason: string) => {
    console.log(`Damaged: ${reason}`);
};

// logDamage('missing something');

// Task 04.03

const favouriteAuthor: Author = {
    name: 'Anna',
    email: 'pip@gmail.com',
    numBookPublished: 2
};

// const favouriteLibrarian: Librarian = {
//     name: 'Petro',
//     email: 'tyt@gmail.com',
//     department: 'Class',
//     assistCustomer(custName: string, bookTitle: string): void {
//         console.log();
//     }
// };

// Task 04.04

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer.book.authors?.[0]);
console.log(offer.book.authors?.[0]?.name);

// Task 04.05

console.log(getProperty(myBook, 'title'));
console.log(getProperty(myBook, 'markDamaged'));

// Task 05.01

const ref = new ReferenceItem(1,'Learn TypeScript', 2023);
console.log(ref);
ref.printItem();
ref.publisher = 'abc';
console.log(ref.publisher);
console.log(ref.getID());

// Task 05.02

// const refBook = new Encyclopedia(1, 'Learn Type Script', 2023, 2);
// const refBook = new RefBook(1, 'Learn Type Script', 2023, 2);
// refBook.printItem();
// console.log(refBook);

// Task 05.03

// refBook.printCitation();

// Task 05.04

const favouriteLibrarian: A & Librarian = new UL.UniversityLibrarian();
favouriteLibrarian.name = 'Anna';
favouriteLibrarian.assistCustomer('Boris', 'All about TS');
console.log(favouriteLibrarian);
favouriteLibrarian.a = 2;

// Task 05.05

const personBook: PersonBook = {
    author: 'Anna',
    name: 'Olga',
    available: true,
    category: Category.TypeScript,
    email: 'anna@mail.ru',
    id: 1,
    title: 'All about sex'
};

const options: TOptions = {duration: 200};
setDefaultConfig(options);
console.log(options);

// Task 06.03

// const refBook = new RefBook(1, 'Learn TypeScript', 2023, 2 );
// printRefBook(refBook);
// const ul = new UL.UniversityLibrarian();
// printRefBook(ul);

// Task 06.05

const isBoolean = true;

if (isBoolean) {
    // import('./classes')
    //     .then(m => {
    //         const reader = new m.Reader();
    //         reader.name = 'Anna';
    //         console.log(reader);
    //     }).catch(err => console.log(err));

    const m = await import('./classes');
    const reader = new m.Reader();
    reader.name = 'Kolik';
    console.log(reader);
}

// Task 06.06

// let lib: Library = new Library();
let lib: Library = {
    id: 1,
    name: 'Anna',
    address: 'Kyiv'
};
console.log(lib);

// Task 07.01

const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

const r1 = purge(inventory);
console.log(r1);
const r2 = purge([1,2,3]);
console.log(r2);

const purgeNumbers = purge<number>;
console.log(purgeNumbers([1,2,3,4]));
// console.log(purgeNumbers(['1','2']));

// Task 07.02

const bookShelf = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst());

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf<Magazine>();
magazines.forEach(mag => magazineShelf.add(mag));
console.log(magazineShelf.getFirst().title);

// Task 07.03

magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));
// const numberShelf = new Shelf<number>();
console.log(getObjectProperty(magazines[0], 'title'));
console.log(getObjectProperty(inventory[0], 'author'));
// console.log(getObjectProperty(123, 'title'));

// Task 07.04

const bookRequiredFields: BookRequiredFields = {
    author: 'Anna',
    available: false,
    category: Category.Angular,
    id: 1,
    markDamaged: (a: string) => {},
    pages: 200,
    title: 'Unknown',
};
const updatedBook: UpdateBook = {};
// const params: Parameters<CreateCustomerFunctionType> = ['Anna'];
const params: Parameters<typeof createCustomer> = ['Anna', 30, 'Kiev'];
createCustomer(...params);

// Task 08.01

// const ul = new UL.UniversityLibrarian();
// UL.UniversityLibrarian['a'] = 1;
//
// const proto = Object.getPrototypeOf(ul);
// proto['b'] = {};
// console.log(ul);

// Task 08.02

// const ul = new UL.UniversityLibrarian();
// ul.name = 'Anna';
// console.log(ul);
// (ul as unknown as { printLibrarian: () => void }).printLibrarian();
// (ul as UL.UniversityLibrarian & { printLibrarian: () => void }).printLibrarian();
// (ul as any)['printLibrarian']();

// Task 08.03

// const ul = new UL.UniversityLibrarian();
// ul.assistFaculty = function() {};
// ul.assistFaculty();
// ul.teachCommunity = function() {};
// Object.getPrototypeOf(ul).teachCommunity = function() {};

// Task 08.04

// const refBook = new RefBook(1, 'Learn TypeScript', 2023, 2 );
// refBook.printItem();

// Task 08.05 Task 08.06

const ul = new UL.UniversityLibrarian();
ul.name = 'Anna';
ul.assistCustomer('Boris', 'Learn TypeScript');
console.log(ul);

// Task 08.07

const refBook = new RefBook(1, 'Learn TypeScript', 2023, 2 );
refBook.copies = 10.5;

// Task 09.01

// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log('End');

// Task 09.02

console.log('Begin');
getBooksByCategoryPromise(Category.JavaScript)
    .then(data => {
        console.log(data);
        return Promise.resolve(data.length);
    })
    .then(len => {
        console.log(len);
    })
    .catch(reason => console.log(reason));
getBooksByCategoryPromise(Category.Software)
    .then(data => console.log(data))
    .catch(reason => console.log(reason));
console.log('End');

// Task 09.03

console.log('Begin');
logSearchResult(Category.JavaScript);
logSearchResult(Category.Software)
    .catch(console.log);
console.log('End');
