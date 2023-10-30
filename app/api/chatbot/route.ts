import axios from "axios";

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;

interface Message {
    author: string;
    content: string;
  }

// Buat fungsi untuk mengambil semua obrolan dari API
const getChats = async () => {
  const response = await axios.get(`${API_HOST}:${API_PORT}/api/chatbot/`);

  // Periksa respons
  if (response.status === 200) {
    // Kembalikan obrolan
    return response.data;
  } else {
    // Tangani kesalahan
    throw new Error("Failed to fetch chats");
  }
};

// Buat fungsi untuk mengirim pesan ke API
const sendMessage = async (message: Message) => {
  const response = await axios.post(`${API_HOST}:${API_PORT}/api/chatbot/`, {
    instances: [
      {
        context: "Kamu adalah Seorang Yang ahli di bidang statistika dan pemrograman R, nama kamu adalah R bot.",
        examples: [
          {
            input: {
              author: "user",
              content: "siapa kamu?",
            },
            output: {
              author: "bot",
              content: "saya adalah Rbot.",
            },
          },
        ],
        messages: [
          {
            message,
          },
        ],
      },
    ],
    parameters: {
      candidateCount: 1,
      maxOutputTokens: 1024,
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
    },
  });

  // Periksa respons
  if (response.status === 200) {
    // Kembalikan respons
    return response;
  } else {
    // Tangani kesalahan
    throw new Error("Failed to get response");
  }
};

// Ekspor fungsi getChats dan sendMessage
export { getChats, sendMessage };
