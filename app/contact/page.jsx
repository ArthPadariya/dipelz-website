export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold text-center mb-12">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT FORM */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            We would love to hear from you.
          </h2>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded"
            />

            <textarea
              placeholder="Message"
              rows="6"
              className="w-full border p-3 rounded"
            ></textarea>

            <button className="bg-black text-white px-8 py-3 rounded">
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT INFO */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Our Store
          </h2>

          <p>
            Dipelz Foods <br />
            Surat, Gujarat, India
          </p>

          <p className="mt-4">
            +91 98765 43210 <br />
            dipelzfoods@gmail.com
          </p>

          <p className="mt-4">
            Open Daily: 11 AM – 7 PM
          </p>
        </div>

      </div>

    </div>
  );
}