export async function uploadImage(file, isColorFile = false) {

  if (!file) return null;

  const preset = isColorFile ? process.env.REACT_APP_CLOUDINARY_COLOR_PRESET : process.env.REACT_APP_CLOUDINARY_PRESET;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);

  try {
    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return result.url;
  } catch (error) {
    return null;
  }
}
