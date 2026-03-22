import { ArrowRight, FileText } from "lucide-react";

export function BlogSection() {
  const posts = [1, 2, 3];

  return (
    <section id="blog" className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#222222] mb-4">
              Журнал о красоте
            </h2>
            <p className="font-sans text-sm opacity-60 leading-relaxed">
              Сюда мы подключим CMS или базу данных блога. Текст для презентации: Полезные статьи и тренды от наших экспертов.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-3 px-6 py-3 border border-gray-200 text-[#222222] rounded-full hover:border-[#F5D3D9] transition-colors font-sans text-xs uppercase tracking-[0.1em]">
            Читать всё <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post} className="group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl mb-6 flex flex-col items-center justify-center text-gray-300 group-hover:bg-gray-200 transition-colors overflow-hidden relative">
                 <FileText size={48} className="opacity-50 group-hover:scale-110 transition-transform duration-500" />
                 <span className="mt-4 font-sans text-xs uppercase tracking-widest opacity-50 relative z-10">Обложка статьи</span>
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="flex items-center gap-4 mb-3 font-sans text-xs text-gray-400 uppercase tracking-widest font-medium">
                <span>Категория</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>20 Марта 2026</span>
              </div>
              <h3 className="font-serif text-2xl text-[#222222] mb-3 group-hover:text-[#c7919d] transition-colors leading-tight">
                Заголовок полезной SEO-статьи {post} (Заглушка)
              </h3>
              <p className="font-sans text-sm opacity-60 line-clamp-2 leading-relaxed">
                Краткое описание (экстракт) статьи для SEO и сниппетов поисковых систем. Здесь будет текст-заглушка про новые техники и тренды в бьюти-сфере.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
