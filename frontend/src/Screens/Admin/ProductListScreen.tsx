import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import { ProductType } from "../../Components/Product";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import Loader from "../../Components/Loader.tsx";
import AlertMessage from "../../Components/AlertMessage.tsx";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductListScreen = () => {
  const { data, isLoading, isError, refetch } = useGetProductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const products = data as ProductType[];
  if (isLoading || isDeleting) {
    return <Loader />;
  }
  if (isError) {
    return (
      <AlertMessage variant="danger">
        An error occurred while fetching products.
      </AlertMessage>
    );
  }

  const noProductsMessage = (
    <AlertMessage variant="info">
      No products found. Please create a product.
    </AlertMessage>
  );

  const createProductButton = (
    <Link to="/admin/product/create">
      <Button variant="primary" className="my-3">
        <CgAdd />
        Create Product
      </Button>
    </Link>
  );

  const editProductButton = (productId: number) => (
    <Link to={`/admin/product/${productId}/edit`}>
      <Button variant="light" className="btn-sm">
        <FaEdit />
      </Button>
    </Link>
  );

  const deleteProductButton = (productId: number) => (
    <Button
      variant="light"
      className="btn-sm"
      onClick={() => deleteProductHandler(productId)}
    >
      <FaTrash />
    </Button>
  );

  const deleteProductHandler = async (productId: number) => {
    // Logic to delete the product
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      refetch(); // Refetch the products after deletion
    }
  };

  const productsHeaderRow = (
    <Row className="align-items-center mb-3">
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className="text-end">{createProductButton}</Col>
    </Row>
  );

  const productTable = (
    <Table striped hover responsive className="table-sm">
      <thead>
        <tr>
          <th>PHOTO</th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>CATEGORY</th>
          <th>BRAND</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                rounded
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
            </td>
            <td>
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>
              {editProductButton(product._id)}
              {deleteProductButton(product._id)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  return (
    <>
      {productsHeaderRow}
      {!products || products.length === 0 ? noProductsMessage : productTable}
    </>
  );
};

export default ProductListScreen;
