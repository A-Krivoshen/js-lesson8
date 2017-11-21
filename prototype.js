'user strict';
// Задание 1

var positions = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    price: 10000,
    discount: 7,
    available: 3
  },
  {
    title: 'Ховерборд Mattel 2016',
    price: 9200,
    discount: 4,
    available: 14
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    price: 57000,
    discount: 0,
    available: 1
  }
];
const itemPrototype = {
  hold(amount = 1) {
    if (this.available < amount) {
      return false;
    }
    this.available -= amount;
    this.holded += amount;
    return true;
  },
   unhold(amount = 0){
    if (this.holded < amount) {
      return false;
    } else if(amount === 0){
      this.available += this.holded;
      this.holded = 0;
    }
      this.available += amount;
      this.holded -= amount;
      return true;
    },
    toString() {
    return `${this.title} (остаток ${this.available}, в резерве ${this.holded})`;
  }
};


function createItem(title, amount) {
  const item = Object.create(itemPrototype);
  item.title = title;
  item.available = amount;
  item.holded = 0;
  return item;
}

const items = [];
for (let item of positions) {
  items.push(createItem(item.title, item.available));
}

items[0].hold(2);
items[0].unhold(1);
items[1].hold(8);
items[1].unhold(3);
items[1].hold(12);
items[2].hold(1);
items[0].unhold(1);

for (let item of items) {
  console.log(`Товар ${item}`);
}


// Задание 2

 const priceWithDiscount = {
	    get () {
		return this.price * (1 - this.discount / 100);
	    },
	    set (finalPrice) {
		    if(finalPrice < this.price) {
		    this.discount = (1 - (finalPrice / this.price)) * 100;
		    } else {
			throw 'Конечная цена больше исходной';
		}
	    }
    };

for (let item of positions) {
  Object.defineProperty(item, 'finalPrice', priceWithDiscount);
}

console.log(positions[0].finalPrice);
 try {
   positions[2].finalPrice = 28500;
  } catch (e) {
   console.log(e);
  }
console.log(`${positions[2].discount} %`);
 try {
   positions[1].finalPrice = 36465733;
  } catch (e) {
   console.log(e);
  }

// Задание 3

const requiredFields = [ 'title', 'price', 'discount' ];
function isValidPosition(form, requiredFields){
      // исправила
      for(var i in requiredFields){
        if(typeof form[requiredFields[i]] === 'undefined'){
          return false;
        }
     }
    return true;
}

let form1 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  price: 7800,
  discount: 0
};
let form2 = {
  title: 'Товар Телепорт бытовой VZHIH-101',
  discount: 10
};

if ( isValidPosition(form1, requiredFields) ) {
  console.log('Форма №1 заполнена верно');
} else {
  console.log('В форме №1 не заполнены необходимые поля');
}

if ( isValidPosition(form2, requiredFields) ) {
  console.log('Форма №2 заполнена верно');
} else {
  console.log('В форме №2 не заполнены необходимые поля');
}
