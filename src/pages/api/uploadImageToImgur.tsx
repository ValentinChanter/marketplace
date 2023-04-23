import axios from "axios";

export default async function uploadImageToImgur(file) {
  const formData = new FormData();
  formData.append("image", file);
  try {
    console.log(file);
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      formData,
      {
        headers: {
          Authorization: `Client-ID ${process.env.AdamBoislevant}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.data.link;
  } catch (error) {
    console.error(error);
    return null;
  }
}
