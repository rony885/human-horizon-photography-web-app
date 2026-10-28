
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const downloadOriginal = async (productId) => {
  const token = localStorage.getItem("humanhorizonAccessToken");

  if (!token) {
    throw new Error("Please log in to download your image.");
  }

  const response = await axios.get(
    `${BASE_URL}/order/download/${productId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    },
  );

  // Create a temporary browser download link.
  const blobUrl = window.URL.createObjectURL(
    new Blob([response.data]),
  );

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `human-horizon-${productId}.jpg`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(blobUrl);
};
