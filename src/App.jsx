import { useState, useEffect } from "react";

import "./App.css";
import { DatePicker, Image, Table } from "antd";
import axios from "axios";
import Typography from "antd/es/typography/Typography";

// const product = {
//   id: 4,
//   title: "Handmade Fresh Table",
//   price: 687,
//   description: "Andy shoes are designed to keeping in...",
//   category: {
//     id: 5,
//     name: "Others",
//     image: "https://placeimg.com/640/480/any?r=0.591926261873231",
//   },
//   images: [
//     "https://placeimg.com/640/480/any?r=0.9178516507833767",
//     "https://placeimg.com/640/480/any?r=0.9300320592588625",
//     "https://placeimg.com/640/480/any?r=0.8807778235430017",
//   ],
// };

const columns = [
  {
    title: "Name",
    dataIndex: "title",
    key: "title",
    render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
    filters: [
      { text: "Others", value: "Others" },
      { text: "Shoes", value: "Shoes" },
      { text: "Furniture", value: "Furniture" },
      { text: "Clothes", value: "Clothes" },
    ],
    onFilter: (value, item) => {
      return item.categoryName.includes(value);
    },
  },
  {
    title: "Image",
    dataIndex: "categoryImage",
    key: "categoryImage",
    render: (image) => <Image src={image} alt="poster" width={100} />,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price - b.price,
  },
];

function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await axios.get(
      `https://api.escuelajs.co/api/v1/products`
    );
    if (!data) return;

    const modifiedProducts = data.map((product) => {
      const { id: key, title, price, description, category } = product;
      const categoryName = category.name; // Отримуємо поле `name` з об'єкта `category`
      const categoryImage = category.image;

      return { key, title, price, description, categoryName, categoryImage };
    });
    setProducts(modifiedProducts);
  };

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Table dataSource={products} columns={columns} />
      {/* <DatePicker /> */}
    </>
  );
}

export default App;
