"use client";

import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BLOG_POSTS } from "@/data/blog";

export function BlogSection() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[var(--brand-text)] mb-4">
                Журнал о красоте
              </h2>
              <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed">
                Полезные статьи и тренды от наших экспертов.
              </p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-3 px-6 py-3 border border-gray-200 text-[var(--brand-text)] rounded-full hover:border-[var(--brand-pink)] transition-colors font-sans text-xs uppercase tracking-[0.1em]">
              Читать всё <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href="/blog" className="group cursor-pointer block">
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl mb-6 flex flex-col items-center justify-center text-gray-300 group-hover:bg-gray-200 transition-colors overflow-hidden relative" role="img" aria-label={`Обложка статьи: ${post.title}`}>
                  <FileText size={48} className="opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <span className="mt-4 font-sans text-xs uppercase tracking-widest opacity-50 relative z-10">Обложка статьи</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="flex items-center gap-4 mb-3 font-sans text-xs text-gray-400 uppercase tracking-widest font-medium">
                  <span className="text-[var(--brand-pink-dark)]">{post.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif text-2xl text-[var(--brand-text)] mb-3 group-hover:text-[var(--brand-pink-dark)] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="font-sans text-sm text-[var(--brand-text)]/60 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
