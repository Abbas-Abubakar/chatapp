 export const handleChange = (e, setUserData) => {
  const { name, type, value, checked } = e.target;

  setUserData(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};