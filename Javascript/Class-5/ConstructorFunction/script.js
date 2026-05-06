
// Car is a constructor function here. Because it is called using a new keyword
function Car(name, price) {
    this.name = name;
    this.price = price;
    // console.log(this);  //this keyword points object being created



    // Getter Method - Used to get the value of property.
    this.getName = function () {
        return this.name;
    }

    this.getPrice = function () {
        return this.price;
    }

    // Setters - Used to set the value of property.
    this.setPrice = function (newPrice) {
        // 1st way to write the code
        // Employ early exit
        if (newPrice < 0) {
            this.price = 0;
            return;
        }
        this.price = newPrice;
    }
}

Car.prototype.printCar = function () {
    console.log('-------------');
    console.log(this.name);
    console.log(this.price);
    console.log('--------------');
}

const c1 = new Car("BMW", 1000);

const c2 = new Car("Ferrari", 2000);