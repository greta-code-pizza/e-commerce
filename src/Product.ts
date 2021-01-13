const DESCRIPTION_SIZE = 100;

export default class Product {
  static all(products: Array<any>) {
    return products.map(p => {
      return new Product(p.label, p.barCode, p.price, p.description, p.image, p.type)
    })
  }

  static filter(products: Array<Product>, type: string) {
    let f: Array<Product> = [];

    for(let i = 0; i < products.length; i++) {
      if(products[i].type == type) {
        f.push(products[i])
      }
    }

    return f;
  }

  public label: string;
  private barCode: string;
  private price: number;
  public description: string;
  public image: string;
  public type: string;

  constructor(label: string, barCode: string, price: number, description: string, image: string, type: string) {
    this.label = label;
    this.barCode = barCode;
    this.price = price;
    this.description = description;
    this.type = type;
    this.image = this.pathImg(image);
  }

  shortDescription() {
    return this.description.substr(0, DESCRIPTION_SIZE) + "...";
  }

  roundedPrice() {
    return Math.round(this.price * 100)/100;
  }

  private pathImg(imgName: string) {
    let prefix;
    if(this.type == "fromage") {
      prefix = "P.L.S.";
    } else {
      prefix = "EPICERIE";
    }

    return `https://www.carrefour.fr/media/540x540/Photosite/PGC/${prefix}/${imgName}`; 
  }
}