export const fetchStats = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/stats`);

  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error("Failed to fetch stats");
  }
  return response.json();
};
