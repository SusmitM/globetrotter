import axios from "axios";

async function seedDatabase() {
  try {
    const response = await axios.post("http://localhost:3000/api/seed", {
      clearExisting: true
    }, {
      headers: {
        "x-admin-key": process.env.ADMIN_KEY
      }
    });
    
    console.log(response.data);
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seedDatabase(); 