export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

      <p className="mb-4">
        At <strong>Dipelz</strong>, we ensure timely and reliable delivery of your orders. All orders are processed within a short timeframe and shipped through trusted delivery partners. Once your order is dispatched, you will receive tracking details via email so you can monitor its progress.
      </p>

      <p className="mb-6">
        Delivery times may vary depending on your location, logistics conditions, and external factors such as weather or high demand periods. While we strive to meet estimated timelines, delays may occasionally occur beyond our control.
      </p>

      <h2 className="text-xl font-semibold mb-3">Key Points:</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Orders are processed and shipped promptly</li>
        <li>Tracking details are provided after dispatch</li>
        <li>Delivery time depends on location and logistics</li>
        <li>Possible delays due to external factors</li>
        <li>Shipping costs shown at checkout or may be free on offers</li>
      </ul>

    </div>
  );
}