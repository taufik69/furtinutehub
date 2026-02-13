const processes = [
  {
    id: 1,
    icon: (
      <svg
        className="w-12 h-12 md:w-16 md:h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
    title: "Discovery & Consultation",
    description: "Understanding your goals, workflow, and brand identity.",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-12 h-12 md:w-16 md:h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Design Development",
    description:
      "Translating your vision into 3D layouts, color palettes, and material concepts.",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-12 h-12 md:w-16 md:h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Execution & Fit-Out",
    description:
      "Managing every detail on-site with precision and craftsmanship.",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-12 h-12 md:w-16 md:h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
    ),
    title: "Delivery & Beyond",
    description: "On-time completion, seamless setup, and long-term support.",
  },
];

export default function OurProcess() {
  return (
    <section className="py-16 md:py-24 bg-colorBodyDim/20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-colorTextBody mb-12 md:mb-16">
          Our Process
        </h2>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {processes.map((process, index) => (
            <div
              key={process.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className="mb-6 text-colorTextBody group-hover:text-colorBtnPrimary transition-colors duration-300">
                {process.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-colorTextBody mb-3">
                {process.title}
              </h3>

              {/* Description */}
              <p className="text-colorTextBody/70 text-sm md:text-base leading-relaxed">
                {process.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
