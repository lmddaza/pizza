export default function Order({ Quantity, Flavor, Size }) {
  return (
    <div>
      <p>Flavor: {Flavor}</p>
      <p>Quantity: {Quantity}</p>
      <p>Size: {Size}</p>
    </div>
  );
}
