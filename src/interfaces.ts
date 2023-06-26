import { Category } from './enums';

interface Book {
    id: number | string;
    title: string;
    category: Category;
    author: string;
    available: boolean;
    pages?: number;
    // markDamaged?: (reason: string) => void;
    // markDamaged?(reason: string): void;
    markDamaged?: DamageLogger;
}

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBookPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

interface A {
    a: number;
}

interface AA extends A, Librarian {

}

interface TOptions {
    duration?: number;
    speed?: number;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LibMgrCallback {
    (err: Error | null, titles: string[] | null): void;
}

interface Callback<T> {
    (err: Error | null, data: T | null): void;
}

export {
    A,
    AA,
    Author,
    Book,
    Callback,
    DamageLogger as Logger,
    Librarian,
    LibMgrCallback,
    Magazine,
    Person,
    TOptions,
    ShelfItem,
};
