import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Product } from "../types";
import Rating from "./Rating";
import styles from "../styles/ProductComponent.module.css";

interface ProductProps {
  product: Product;
}

const ProductComponent: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card className={styles.card+ "my-1 p-3 rounded"} >
      <Link to={`/product/${product.id}`}>
        <div className={styles.wrapper}>
          <Card.Img
            className={styles.card_img}
            src={product.image}
            variant="top"
          ></Card.Img>
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as="div">
            {" "}
            <strong>{product.title}</strong>{" "}
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating.rate}
            text={`${product.rating.count} reviews`}
          ></Rating>
        </Card.Text>

        <Card.Text as="h3">${(Math.round(product.price * 100) / 100).toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductComponent;
