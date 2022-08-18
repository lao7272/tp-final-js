class Pokemon {
    constructor (id, name, img, quant, types, price) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.quant = quant;
        this.types = types;
        this.price = price;
    }
    funciona(){
        return console.log('funciona')
    }
}

// export {Pokemon}