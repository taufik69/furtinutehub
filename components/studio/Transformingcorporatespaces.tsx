const videos = [
  {
    id: 1,
    title: "Customer Reviews Corporate Office Cha...",
    embedUrl: "https://www.youtube.com/embed/EnGQkXYqk68?si=tCRlyEeQKxVDtkSj",
  },
  {
    id: 2,
    title: "GRID Furniture Customer Review | Doin...",
    embedUrl: "https://www.youtube.com/embed/eaIopb53EvE?si=mZvIlJdjBzVtRyt9",
  },
];

export default function TransformingCorporateSpaces() {
  return (
    <section className="py-16 md:py-24 bg-colorBodyDim/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-colorTextBody mb-4">
            Transforming Corporate Spaces
          </h2>
          <p className="text-colorTextBody/70 text-lg">
            Exploring how we shape modern work and living spaces.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-lg"
            >
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
