"use client";

import HeroBanner from "@/components/Homepage/Herobanner";
import Image from "next/image";
import Link from "next/link";

const featuredArticles = [
  {
    id: 1,
    date: "OCT 20, 2023",
    title: "How to Determine the Ideal Standing Desk Height – Step by Step",
    excerpt:
      "If you use a standing workstation, you've already taken a step toward better health. Extended periods of sitting have been linked to health issues such as obesity and metabolic syndrome, a group of disorders characterized by high blood pressure, high...",
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=800",
    slug: "ideal-standing-desk-height",
    layout: "image-left",
  },
  {
    id: 2,
    date: "FEB 18, 2023",
    title: "How the Right Office Chair Can Boost Employee Productivity",
    excerpt:
      "In general, the office worker spends a great deal of time sitting behind a computer desk.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800",
    slug: "office-chair-productivity",
    layout: "image-right",
  },
  {
    id: 3,
    date: "FEB 19, 2023",
    title: "How ergonomic chairs increase productivity at work",
    excerpt:
      "Choosing the right office furniture for your needs can be a difficult task. With a wide range of options,",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    slug: "ergonomic-chairs-productivity",
    layout: "image-left",
  },
];

const bottomArticles = [
  {
    id: 4,
    title: "Exceptional Furniture For The Taskmasters",
    description:
      "We founded GRID, to make it easy for teams of all sizes to create an office you love. We will direct so our collection costs half as much as premium furniture of comparable quality.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600",
    slug: "exceptional-furniture",
  },
  {
    id: 5,
    title: "Ergonomic Design",
    description:
      "Enjoy stylish and ergonomic work setting for every budget, from the home office to the open office. Durable, adjustable and built to inspire, make your office feel like home with customizable desks & chairs from GRID Furniture.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600",
    slug: "ergonomic-design",
  },
  {
    id: 6,
    title: "Wherever you are, work your best.",
    description:
      "Our breathable, mesh material provides air optimal air flow to avoid sweating and sticking, keep air circulation to every cavity, and the mesh office chair resists distortion and transformation.",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600",
    slug: "work-your-best",
  },
];

export default function ArticlesPage() {
  return (
    <div className="bg-colorBody min-h-screen">
      {/* Page Title */}
      <div className="mb-30">
        <HeroBanner title="ARTICLES" />
      </div>

      {/* Featured Articles - Alternating Layout */}
      <div className="container mx-auto px-4 space-y-16 md:space-y-24 mb-24">
        {featuredArticles.map((article) => (
          <article
            key={article.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              article.layout === "image-right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`relative aspect-16/10 overflow-hidden rounded-lg ${
                article.layout === "image-right" ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div
              className={article.layout === "image-right" ? "lg:order-1" : ""}
            >
              <p className="text-xs md:text-sm text-colorTextBody/60 font-medium mb-3 tracking-wide">
                {article.date}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-colorTextBody mb-4 leading-tight">
                {article.title}
              </h2>
              <p className="text-colorTextBody/70 mb-6 leading-relaxed">
                {article.excerpt}
              </p>
              <Link
                href={`/articles/${article.slug}`}
                className="inline-block bg-colorBtnPrimary text-colorBtnPrimaryText px-6 py-3 rounded hover:bg-colorBtnPrimaryDim transition-colors duration-200 font-medium"
              >
                Continue reading
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom 3-Column Grid */}
      <div className="bg-colorBodyDim/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {bottomArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group"
              >
                <article className="text-center">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-6">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-colorTextBody mb-4 group-hover:text-colorLink transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-colorTextBody/70 leading-relaxed text-sm md:text-base">
                    {article.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
