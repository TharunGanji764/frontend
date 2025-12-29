export default [
  {
    id: "ORD12345",
    date: "2025-01-10",
    status: "Shipped",
    total: 3499,
    itemsCount: 3,
    paymentMethod: "COD",
    address: "Hyderabad, Telangana",
    estimatedDelivery: "2025-01-15",
    items: [
      { id: 1, title: "Product 1", qty: 1 },
      { id: 2, title: "Product 2", qty: 2 },
    ],
  },
  {
    id: "ORD12346",
    date: "2025-01-02",
    status: "Delivered",
    total: 1299,
    itemsCount: 1,
    paymentMethod: "UPI",
    address: "Bangalore, Karnataka",
    estimatedDelivery: "2025-01-06",
    items: [{ id: 3, title: "Product 3", qty: 1 }],
  },
];
