export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  console.log(
    "cloudinary upload preset:",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  ); // Log the upload preset for debugging
  console.log("Cloudinary Cloud Name:", cloudName); // Log the cloud name for debugging
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const data = await response.json();
  console.log(data.secure_url); // Log the secure URL for debugging
  return data.secure_url; // this is the URL you'll send to your backend
}
