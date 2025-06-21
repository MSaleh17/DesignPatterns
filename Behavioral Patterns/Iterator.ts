class Book {
  constructor(private title: string) {}
  get bookTitle(): string {
    return this.title;
  }
}

interface Iterator_<T> {
  current(): T;
  next(): T;
  hasNext(): boolean;
  reset(): void;
}

interface Iterable_<T> {
  createIterator(): Iterator_<T>;
}

class BookShelf implements Iterable_<Book> {
  private books: Book[];
  constructor() {
    this.books = new Array<Book>();
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  getBookAt(index: number): Book | null {
    index = Math.trunc(index);
    if (this.getLength() <= index) return null;
    return this.books[index];
  }

  getLength(): number {
    return this.books.length;
  }

  createIterator(): Iterator_<Book> {
    return new BookShelfIterator(this);
  }
}

class BookShelfIterator implements Iterator_<Book> {
  private currentIndex: number;
  constructor(private bookShelf: BookShelf) {
    this.currentIndex = 0;
  }
  current(): Book {
    return this.bookShelf.getBookAt(this.currentIndex) as Book;
  }
  hasNext(): boolean {
    return this.currentIndex < this.bookShelf.getLength();
  }
  next(): Book {
    return this.bookShelf.getBookAt(this.currentIndex++) as Book;
  }
  reset(): void {
    this.currentIndex = 0;
  }
}


const bookShelf: BookShelf = new BookShelf();
bookShelf.addBook(new Book("object oriented design and analysis"));
bookShelf.addBook(new Book("head first design patterns"));
bookShelf.addBook(new Book("clean code"));

const iterator = bookShelf.createIterator();
while (iterator.hasNext())
    console.log(iterator.next().bookTitle);

