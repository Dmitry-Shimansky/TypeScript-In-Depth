/* eslint-disable no-underscore-dangle */

// const RefItem = class ReferenceItem {
import { timeout } from '../decorators';

abstract class ReferenceItem {
    // title: string;
    // year: number;
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    private _publisher: string;

    #id: number;

    static department: string = 'Research Dep.';

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this.publisher = newPublisher;
    }

    constructor(id: number, public title: string, private year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    @timeout(5000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
        console.log(`Department: ${Object.getPrototypeOf(this).constructor.department}`);
    }

    getID(): number {
        return this.#id;
    }
}

export { ReferenceItem };
