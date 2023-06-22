import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductComponent from "../components/ProductComponent";
import { getProducts } from "../services/apiProduct";
import { Product } from "../types";
import { useParams } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setProductsError] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts(keyword);

        if (data == null) {
          setProductsError("No products found");
        } else {
          setProductsError("");
          setProducts((data as unknown) as Product[]);
        }
      } catch (error) {
        setProductsError("No products found");
        console.error("Error while fetching products:", error);
      }
    };
    loadProducts();
  }, [keyword]);

  return (
    <>
      {products.length < 0 ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h1
                    style={{ fontSize: "2rem", textAlign: "center" }}
                    className="h1 mb-6 mt-6"
                  >
                    Our Products
                  </h1>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                {products.map((product) => (
                  <Col key={product.id} sm={12} md={6} lg={4} xl={4}>
                    <ProductComponent product={product}></ProductComponent>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
