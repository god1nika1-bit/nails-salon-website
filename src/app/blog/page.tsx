"use client";

import { useState, useMemo } from "react";
import { FileText, ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, TabTransition } from "@/components/ui/motion";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Все статьи");

  const filtered = useMemo(() => {
    if (activeCategory === "Все статьи") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[var(--brand-surface)] flex flex-col">
      <section className="py-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--brand-text)] mb-6">Журнал о красоте</h1>
            <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed">
              Полезные статьи, свежие тренды и секреты домашнего ухода от наших экспертов.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-indicator">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--brand-text)] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[var(--brand-pink)] hover:text-[var(--brand-text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <TabTransition tabKey={activeCategory}>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filtered.map((post) => (
                <StaggerItem key={post.id}>
                  <article className="group cursor-pointer flex flex-col">
                    <div className="w-full aspect-[4/3] bg-gray-200/40 rounded-3xl mb-6 relative overflow-hidden flex items-center justify-center" role="img" aria-label={`Обложка: ${post.title}`}>
                      <FileText size={48} className="opacity-20 text-gray-500 group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>

                    <div className="flex items-center gap-4 mb-4 font-sans text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-medium">
                      <span className="text-[var(--brand-pink-dark)]">{post.category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-3 group-hover:text-[var(--brand-pink-dark)] transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="font-sans text-sm text-[var(--brand-text)]/60 line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[var(--brand-text)] group-hover:text-[var(--brand-pink-dark)] transition-colors">
                      Читать полностью <ArrowRight size={14} />
                    </span>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TabTransition>

          {filtered.length === 0 && (
            <p className="text-center font-sans text-sm text-[var(--brand-text)]/40 py-16">
              Статьи в этой категории скоро появятся
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
