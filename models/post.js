class Post {
  constructor(id, caption, imageUri, lat, lng, address, userId) {
    this.id = id;
    this.caption = caption;
    this.imageUri = imageUri;
    this.lat = lat;
    this.lng = lng;
    this.address = address;
    this.userId = userId;
  }
}

export default Post;
