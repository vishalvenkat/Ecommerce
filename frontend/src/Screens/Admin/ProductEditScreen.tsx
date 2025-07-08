import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { ProductType } from "../../Components/Product";
import { Button, Form } from "react-bootstrap";
import Loader from "../../Components/Loader.tsx";
import CustomFormGroup from "../../Components/CustomFormGroup.tsx";
import FormContainer from "../../Components/FormContainer.tsx";
import GoBackButton from "../../Components/GoBackButton.tsx";

const ProductEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const {
    data,
    isLoading: isProductLoading,
    refetch,
  } = useGetProductsByIdQuery(id);
  const product: ProductType = data as ProductType;
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category as string);
      setBrand(product.brand as string);
      setDescription(product.description as string);
      setImage(product.image as string);
      setCountInStock(product.countInStock as number);
    }
  }, [product]);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const navigate = useNavigate();
  const updateProductHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      id,
      name,
      price,
      category,
      brand,
      description,
      image,
      countInStock,
    };

    const res = await updateProduct(updatedProduct);
    if (res) {
      refetch();
      navigate("/admin/productlist");
    }
  };

  const [uploadImage, { isLoading }] = useUploadProductImageMutation();
  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const res: any = await uploadImage(formData).unwrap();
      if (res) {
        setImage(res.imageUrl);
      }
    }
  };

  const productUpdateForm = (
    <FormContainer>
      <Form onSubmit={updateProductHandler}>
        <CustomFormGroup
          name="name"
          label="Name"
          type="text"
          value={name}
          placeholder="Enter product name"
          onChangeHandler={(e) => setName(e.target.value)}
        />
        <Form.Group controlId="Image" className="my-3">
          <Form.Label>
            <strong>Image</strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={image}
            placeholder="Enter product image URL"
            onChange={(e) => setImage(e.target.value)}
          />
          <Form.Control
            type="file"
            onChange={uploadFileHandler}
            className="mt-2"
          />
        </Form.Group>
        <CustomFormGroup
          name="price"
          label="Price"
          type="number"
          value={price}
          placeholder="Enter product price"
          onChangeHandler={(e) => setPrice(Number(e.target.value))}
        />
        <CustomFormGroup
          name="category"
          label="Category"
          type="text"
          value={category}
          placeholder="Enter product category"
          onChangeHandler={(e) => setCategory(e.target.value)}
        />
        <CustomFormGroup
          name="brand"
          label="Brand"
          type="text"
          value={brand}
          placeholder="Enter product brand"
          onChangeHandler={(e) => setBrand(e.target.value)}
        />
        <CustomFormGroup
          name="description"
          label="Description"
          type="text"
          value={description}
          placeholder="Enter product description"
          onChangeHandler={(e) => setDescription(e.target.value)}
        />
        <CustomFormGroup
          name="image"
          label="Image URL"
          type="text"
          value={image}
          placeholder="Enter product image URL"
          onChangeHandler={(e) => setImage(e.target.value)}
        />
        <CustomFormGroup
          name="countInStock"
          label="Count In Stock"
          type="number"
          value={countInStock}
          placeholder="Enter count in stock"
          onChangeHandler={(e) => setCountInStock(Number(e.target.value))}
        />
        <Button
          type="submit"
          variant="primary"
          className="my-3"
          disabled={isUpdating}
        >
          Update Product
        </Button>
      </Form>
    </FormContainer>
  );

  return (
    <>
      <GoBackButton linkTo="/admin/productlist" />
      {(isProductLoading || isUpdating) && <Loader />}
      {productUpdateForm}
    </>
  );
};

export default ProductEditScreen;
