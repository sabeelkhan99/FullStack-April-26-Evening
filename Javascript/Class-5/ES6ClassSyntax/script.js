

class Car{
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    printCar() {
        console.log('----------');
        console.log(this.name);
        console.log(this.price);
        console.log('-----------');
    }

    // Getters
    get getName() {
        return this.name;
    }

    get getPrice() {
        return this.price;
    }

    // Setter
    set setPrice(newPrice) {
        if (newPrice<0) {
            this.price = 0;
            return;
        }
        this.price = newPrice;
    }
}

const c1 = new Car("BMW",1000);
const c2 = new Car("Ferrari",2000);