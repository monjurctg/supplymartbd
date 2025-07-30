export const charges = [
  // Dont change index sequence
  {
    id: 1,
    code: "China Air",
    country: "cn",
    from: "China",
    method: "air",
    charge: 730,
    foreign: 730,
    status: true,
    time: "12-24",
  },
  {
    id: 2,
    code: "China Sea",
    country: "cn",
    from: "China",
    method: "sea",
    charge: "80-390",
    foreign: 730,
    status: true,
    time: "35-65",
  },
];

export const payablePercentage = 70;

export const getCharges = (country, method) => {
  let item = charges.find(
    (el) => el.country === country && el.method === method
  );
  if (item) {
    return item.charge;
  }
  return 699;
};
