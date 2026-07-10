import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  //  ensure two decimal place
  const stringValue = value.toFixed(2);
  // get the in.float value
  const [intvalue, floatvalue] = stringValue.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">₦</span>
      {intvalue}
      <span className="text-xs align-super">.{floatvalue}</span>
    </p>
  );
};

export default ProductPrice;
