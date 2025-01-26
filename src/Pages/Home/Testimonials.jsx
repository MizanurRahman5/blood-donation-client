import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "I want to help wherever I can and lead by example. Donating blood is a small way to give back and it does so in such a mighty way.",
      name: "OMAR",
      role: "BLOOD DONOR",
      image: "https://www.vitalant.org/getattachment/f1e41117-8b2a-4ee1-9029-877bb7c5b3e6/Omar.png?lang=en-US&ext=.png",
    },
    {
      quote:
        "Remy is living proof that blood is needed and that it works. She couldn’t thrive without it.",
      name: "BECKY",
      role: "MOTHER OF REMY, WHO NEEDS TRANSFUSIONS EVERY 2 WEEKS",
      image: "https://www.vitalant.org/getattachment/7f98db33-6493-4de9-98d6-2ea9b6e0f948/remy.png?lang=en-US&ext=.png",
    },
    {
      quote:
        "One donation can help up to three different people, so that makes me feel really good. The payback is unbelievable.",
      name: "BRUCE",
      role: "BLOOD & PLATELET DONOR, 720+ LIFETIME DONATIONS",
      image: "https://www.vitalant.org/getattachment/1af4b15e-f532-434b-b0e5-8b51f19bc0a9/Bruce.png?lang=en-US&ext=.png",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-10 text-gray-800">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl"
            >
              <div className="text-red-500 text-4xl mb-4">&ldquo;</div>
              <p className="italic mb-4 text-gray-600">{testimonial.quote}</p>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-red-100"
              />
              <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
