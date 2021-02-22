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

    public isEmpty():boolean {
        return this.head.next === this.tail;
    }

    public push(value:T): void {
        this.addAfter(value, this.tail.prev);
    }

    public pop(): T {
        let currentItem = this.tail.prev;
        if(this.isEmpty()){
            throw new Error(`The linked list is empty.`);
        }
        this.removeItem(currentItem);
        return currentItem.value;
    }

    public remove(value: T): void {
        let currentItem = this.search(value);
        if(currentItem){
            this.removeItem(currentItem);
        } else {
            throw new Error(`Caanot remove the value ${value}, it's not present in the linked list.`);
        }
    }

    public shift(): T{
        let item = this.head.next;
        if(this.isEmpty()) {
            throw new Error(`The linked list is empty.`);
        }
        this.removeItem(item);
        return item.value;
    }

    public unshift(value:T): void{
        this.addAfter(value, this.head);
    }

    private addAfter(value:T, itemAfter:LinkedListItem<T>): void{
        let newItem = LinkedList.newItem(itemAfter, itemAfter.next, value);
        itemAfter.next.prev = newItem;
        itemAfter.next = newItem;
        this.length++;
    }

    private removeItem(item:LinkedListItem<T>): void{
        item.prev.next = item.next;
        item.next.prev = item.prev;
        this.length--;
    }

    private search(value:T): LinkedListItem<T>{
        let currentItem = this.head.next;
        while(currentItem !== this.tail) {
            if (value === currentItem.value) {
                return currentItem;
            }
            currentItem = currentItem.next;
        }
        return null;
    }

}