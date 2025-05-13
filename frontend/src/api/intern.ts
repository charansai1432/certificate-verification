import axios from 'axios';

export const verifyIntern = async (id) => {
  try{
    const response = await axios.get(`http://localhost:5000/api/interns/verify/${id}`);

    const data = response.data;
    return {
    name: data["name"],
    gender: data["gender"],
    role: data["role"],
    department: data["department"] || "Not specified", // optional
    company: data["company"] || "Your Company Name",
    startDate: data["startDate"] || new Date().toISOString(),
    endDate: data["endDate"] || new Date().toISOString(),
  };
} catch (error) {
  throw new Error("Intern not found or API error");
}
};
