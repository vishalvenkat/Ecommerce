import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateProductMutation,
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
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const {
    data,
    isLoading: isProductLoading,
    refetch,
  } = useGetProductsByIdQuery(id, {
    skip: !isEditMode, // Skip the query if not in edit mode
  });
  const product = data as ProductType;
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    brand: "",
    description: "",
    image: "",
    countInStock: 0,
  });

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category || "",
        brand: product.brand || "",
        description: product.description || "",
        image: product.image || "",
        countInStock: product.countInStock || 0,
      });
    }
  }, [isEditMode, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const updateProductHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && !id) {
        await updateProduct({ id, ...formData }).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }
      refetch();
      navigate("/admin/productlist");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("image", file);
      try {
        const res: any = await uploadImage(form).unwrap();
        setFormData((prev) => ({ ...prev, image: res.imageUrl }));
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  if (isProductLoading || isUpdating || isUploading || isCreating)
    return <Loader />;

  return (
    <>
      <GoBackButton linkTo="/admin/productlist" />
      <FormContainer>
        <Form onSubmit={updateProductHandler}>
          <CustomFormGroup
            name="name"
            label="Name"
            type="text"
            value={formData.name}
            placeholder="Enter product name"
            onChangeHandler={handleChange}
          />

          <Form.Group controlId="image" className="my-3">
            <Form.Label>
              <strong>Image</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              placeholder="Enter image URL"
              onChange={handleChange}
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
            value={formData.price}
            placeholder="Enter price"
            onChangeHandler={handleChange}
          />

          <CustomFormGroup
            name="category"
            label="Category"
            type="text"
            value={formData.category}
            placeholder="Enter category"
            onChangeHandler={handleChange}
          />

          <CustomFormGroup
            name="brand"
            label="Brand"
            type="text"
            value={formData.brand}
            placeholder="Enter brand"
            onChangeHandler={handleChange}
          />

          <CustomFormGroup
            name="description"
            label="Description"
            type="text"
            value={formData.description}
            placeholder="Enter description"
            onChangeHandler={handleChange}
          />

          <CustomFormGroup
            name="countInStock"
            label="Count In Stock"
            type="number"
            value={formData.countInStock}
            placeholder="Enter stock quantity"
            onChangeHandler={handleChange}
          />

          <Button
            type="submit"
            variant="primary"
            className="my-3"
            disabled={isUpdating || isCreating || isUploading}
          >
            {isEditMode ? "Update Product" : "Create Product"}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
