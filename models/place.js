export class Place {
  constructor(title, imageUri, location, address) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = location; // {lat: number, lng: number}
    this.address = address;
    this.id = (new Date() * Math.random()).toString();
  }
}
