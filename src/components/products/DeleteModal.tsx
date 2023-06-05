"use client";
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  id: number
}

export default function DeleteModal({id}: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => setOpen(!open);

  const onDeleteHandler = async() => {
    try {
      const response = await fetch(`/api/products/${id}`, {method: 'DELETE'});
      console.log(response);
      router.push('/')
    } catch (err) {
      return err;
    }finally{
      setOpen(false);
    }
  }
 
  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        Delete
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Product</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this product?
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
          <Button variant="gradient" color="green" onClick={onDeleteHandler}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}