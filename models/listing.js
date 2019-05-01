module.exports = class Listing {
    constructor(body) {
        this.propertyName = body.propertyName,
        this.propertyType = body.propertyType,
        this.address = body.address,
        this.city = body.city,
        this.price = body.price;
        this.rentalAllowed = body.rentalAllowed;
        this.description = body.description;
    }
}