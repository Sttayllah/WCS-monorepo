export const mediaUploader = async (files: File[]) => {
  const media = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yeahbuddy");
    formData.append("cloud_name", "dvsg7r2hx");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/yeahbuddy/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      media.push(data.secure_url);
    } catch (e: any) {
      console.log(e);
    }
  }
  return media;
};
