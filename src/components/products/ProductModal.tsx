"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface ProductModalProps {
  categories: [];
  product?: Product;
  action: ProductModalActions;
}

export default function ProductModal({
  categories,
  product,
  action,
}: ProductModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category_id);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleOpen = () => setOpen(!open);
  const onHandleChange = (e: any) => setCategory(e);

  const onAddHandler = async () => {
    try {
      const reqBody: object = { name, description, category, price };

      console.log(reqBody);
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(reqBody),
      });
      router.refresh();
    } catch (err) {
      return err;
    } finally {
      setOpen(false);
    }
  };

  const onEditHandler = async () => {
    try {
      const reqBody: object = { name, description, category, price };
      const response = await fetch(`/api/products/${product?.id}`, {method: 'PATCH', body: JSON.stringify(reqBody)});
      console.log(response);
      router.refresh();
    } catch (err) {
      return err;
    }finally{
      setOpen(false);
    }
  };

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        {action} Product
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{action} Product</DialogHeader>
        <DialogBody divider className="p-10 flex flex-col gap-6">
          <Input
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Select
            label="Select Version"
            value={"1".toString()}
            onChange={(e) => onHandleChange(e)}
          >
            {categories.map((category: Category, idx) => {
              return (
                <Option key={category.id} value={`${category.id}`}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
          <Input
            type="number"
            label="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={action === "Add" ? onAddHandler : onEditHandler}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
