import Image from "next/image";

const services = [
  {
    id: 1,
    image: "/studio/s1.webp",
    title: "Interior Design & Space Planning",
    description:
      "Creating environments that balance creativity, efficiency, and comfort.",
    subDescription:
      "Crafting interiors that reflect your brand's personality and culture.",
  },
  {
    id: 2,
    image: "/studio/s2.webp",
    title: "Fit-Out Solutions & Execution Excellence",
    description:
      "End-to-end project delivery crafted with precision — from concept to completion.",
    subDescription:
      "Our team transforms raw spaces into fully functional environments.",
  },
  {
    id: 3,
    image: "/studio/s2.webp",
    title: "Custom Furniture Integration",
    description:
      "Seamlessly blending GRID's ergonomic, modular furniture into your environment for both form and function.",
    subDescription:
      "Each space is thoughtfully designed with tailored furniture solutions.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24 bg-colorBody">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-colorTextBody mb-12 md:mb-16">
          What We Do
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden rounded-lg mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={533}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-colorTextBody mb-4 text-start">
                  {service.title}
                </h3>
                <p className="text-colorTextBody/80 mb-2 leading-relaxed text-justify">
                  {service.description}
                </p>
                <p className="text-colorTextBody/70 text-sm leading-relaxed text-justify">
                  {service.subDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
