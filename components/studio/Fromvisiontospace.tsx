import Image from "next/image";

const visionContent = [
  {
    title: "Tech Startups",
    description: "Functional yet vibrant setups that inspire innovation.",
  },
  {
    title: "Corporate Offices",
    description:
      "Clean, ergonomic environments that enhance focus and productivity.",
  },
  {
    title: "Creative Studios",
    description:
      "Unique layouts that blend functionality with artistic expression.",
  },
];

export default function FromVisionToSpace() {
  return (
    <section className="py-16 md:py-24 bg-colorBody">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-colorTextBody mb-6">
              From Vision to Space
            </h2>

            <p className="text-colorTextBody/80 text-lg mb-8 leading-relaxed">
              We've partnered with startups, enterprises, and creative studios
              to design spaces that drive success.
            </p>

            {/* Content List */}
            <div className="space-y-6">
              {visionContent.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-colorTextBody mb-2">
                    {item.title}{" "}
                    <span className="text-colorTextBody/60 font-normal">—</span>
                  </h3>
                  <p className="text-colorTextBody/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative aspect-4/3 lg:aspect-square overflow-hidden rounded-lg">
            <Image
              src="/studio/s1.webp"
              alt="Modern corporate office space"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
