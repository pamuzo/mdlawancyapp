"use client";

import { Button } from "@/components/ui/button";

import { addItemToCart } from "@/lib/actions/cart-action";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ item }) => {
  const router = useRouter();
  // const { toast } = useToas;

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast.error(res.message, { className: "bg-red-600 text-white" });
      return;
    }

    toast.success(`${item.name} added to cart`, {
      action: {
        label: "Undo",
        onClick: () => router.push("/cart"),
      },
    });
  };
  return (
    <Button
      type="button"
      onClick={handleAddToCart}
      className="w-full py-2 rounded-md bg-[#00425a] hover:bg-[#00425a] text-white mt-4"
    >
      <Plus /> Add to cart
    </Button>
  );
};

export default AddToCart;
