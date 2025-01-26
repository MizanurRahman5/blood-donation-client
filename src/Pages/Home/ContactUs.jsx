import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Send Us a Message
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Enter your message"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions or need assistance, feel free to reach
              out to us. We're here to help!
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800">Phone:</h4>
              <p className="text-gray-600">+880 1997445834</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800">Email:</h4>
              <p className="text-gray-600">support@example.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Address:</h4>
              <p className="text-gray-600">
                1234 Street Name, City, Country
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
