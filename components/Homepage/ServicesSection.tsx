import { Phone, Wrench, CreditCard } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: Phone,
      title: "Expert Consultation",
      description:
        "Get personalized advice from our kitchen design specialists",
      details: "Call: +8801741659798 or 01771249206",
      highlight: "Free Appointment",
    },
    {
      id: 2,
      icon: Wrench,
      title: "Professional Assembly",
      description:
        "Hassle-free installation and fitting service at your doorstep",
      details: "Customer Care: 01771249206",
      highlight: "Complimentary Service",
    },
    {
      id: 3,
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Easy EMI options with zero interest on Tk",
      details: "Up to 6 months installment",
      highlight: "0% Interest",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-colorBodyDim/20 to-colorBody">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-colorBtnPrimary/5 text-colorBtnPrimary text-sm font-semibold rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-colorTextBody mb-4 leading-tight">
            Experience Excellence in{" "}
            <span className="text-colorBtnPrimary">Every Detail</span>
          </h2>
          <p className="text-colorTextBody/70 text-base sm:text-lg leading-relaxed">
            From expert guidance to seamless delivery, we're committed to making
            your furniture journey effortless and enjoyable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-colorBody rounded-xl p-8 shadow hover:shadow-md cursor-pointer transition-all duration-300 border border-colorBorder/10 hover:border-colorBtnPrimary/2s0 overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-colorBtnPrimary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                {/* Highlight Badge */}
                <div className="inline-block px-3 py-1 bg-colorBtnPrimary/90 text-colorBtnPrimaryText text-xs font-bold rounded-full mb-6">
                  {service.highlight}
                </div>
                {/* Icon */}
                {/* <div className="w-14 h-14 bg-colorBtnPrimary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-colorBtnPrimary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-colorBtnPrimary group-hover:text-colorBtnPrimaryText transition-colors duration-300" />
                </div> */}
                {/* Content */}
                <h3 className="text-xl font-bold text-colorTextBody mb-3">
                  {service.title}
                </h3>
                <p className="text-colorTextBody/70 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                {/* Contact Details */}
                <div className="pt-4 border-t border-colorBorder/50">
                  <p className="text-colorTextBody font-semibold text-sm">
                    {service.details}
                  </p>
                </div>
                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 w-8 h-8 bg-colorBtnPrimary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-colorBtnPrimaryText"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-colorTextBody/60 text-sm">
            Need more help?{" "}
            <Link
              href="/contact"
              className="text-colorBtnPrimary font-semibold hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
