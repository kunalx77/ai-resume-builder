import ImageKit from "@imagekit/nodejs";

const {
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT,
} = process.env;


let imageKit = null;

if (
  IMAGEKIT_PUBLIC_KEY &&
  IMAGEKIT_PRIVATE_KEY &&
  IMAGEKIT_URL_ENDPOINT
) {
  imageKit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });
} else {
  console.warn("⚠️ ImageKit not configured. Image uploads disabled.");
}

export default imageKit;
