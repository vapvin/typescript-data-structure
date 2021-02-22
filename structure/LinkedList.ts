interface LinkedListItem<T> {
    next: LinkedListItem<T>;
    prev: LinkedListItem<T>;
    value: T;
}

class LinkedList<T> {

    constructor(){
        this.tail.prev = this.head;
        this.head.next = this.tail;
    }
    
    public head:LinkedListItem<T> = LinkedList.emptyListItem<T>();
    public length: number = 0;
    public tail: LinkedListItem<T> = LinkedList.emptyListItem<T>();

    public static emptyListItem<T> (): LinkedListItem<T> {
        return <LinkedListItem<T>>({prev: null, value: null, next: null});
    }

    public static newItem<T> (prev: LinkedListItem<T>, next: LinkedListItem<T>, value: T): LinkedListItem<T> {
        return <LinkedListItem<T>>({prev: prev, next: next, value: value});
    }

    public forEach(callback: (item: T, index:number, list: LinkedList<T>) => void, thisArg: any = null): void {
        let currentItem = this.head.next;
        let counter = 0;
        while(currentItem !== this.tail){
            callback.call(thisArg, currentItem.value, counter, this);
            counter++;
            currentItem = currentItem.next;
        }
    }
}