const storage = async (key) => {
  const value = localStorage.getItem("zz");
  return value;
};

export default storage;
