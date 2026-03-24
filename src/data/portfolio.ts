export interface PortfolioItem {
  id: number;
  category: "Маникюр" | "Педикюр" | "Волосы" | "Брови" | "Косметология";
  title: string;
  description: string;
  masterName: string;
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 1,
    category: "Маникюр",
    title: "Нюдовый маникюр с минималистичным дизайном",
    description: "Нежное покрытие в пастельных тонах с тонкими линиями и точками",
    masterName: "Анна",
  },
  {
    id: 2,
    category: "Маникюр",
    title: "Crazy-маникюр с 3D-элементами",
    description: "Яркий дизайн с объёмными элементами и стразами",
    masterName: "Дарья",
  },
  {
    id: 3,
    category: "Маникюр",
    title: "Французский маникюр классический",
    description: "Элегантный френч с идеальной линией улыбки",
    masterName: "Анна",
  },
  {
    id: 4,
    category: "Волосы",
    title: "Балаяж на длинные волосы",
    description: "Плавный переход от тёмных корней к светлым кончикам",
    masterName: "Елена",
  },
  {
    id: 5,
    category: "Волосы",
    title: "Голливудская волна",
    description: "Классическая вечерняя укладка с глубокой волной",
    masterName: "Елена",
  },
  {
    id: 6,
    category: "Волосы",
    title: "Креативное окрашивание",
    description: "Многослойное окрашивание с эффектом объёма и глубины цвета",
    masterName: "Елена",
  },
  {
    id: 7,
    category: "Брови",
    title: "Архитектура бровей с долговременной укладкой",
    description: "Идеальная форма и фиксация, подобранная под тип лица",
    masterName: "Ольга",
  },
  {
    id: 8,
    category: "Брови",
    title: "Наращивание ресниц 2D эффект",
    description: "Натуральный, но выразительный эффект наращивания",
    masterName: "Ольга",
  },
  {
    id: 9,
    category: "Педикюр",
    title: "Аппаратный педикюр с дизайном",
    description: "Полный комплекс обработки стоп с ярким летним дизайном",
    masterName: "Анна",
  },
  {
    id: 10,
    category: "Педикюр",
    title: "Смарт-педикюр с покрытием",
    description: "Быстрая и качественная обработка с идеальным покрытием",
    masterName: "Дарья",
  },
  {
    id: 11,
    category: "Косметология",
    title: "Результат после курса пилингов",
    description: "До и после 4 процедур поверхностного пилинга — ровный тон кожи",
    masterName: "Марина",
  },
  {
    id: 12,
    category: "Косметология",
    title: "Карбокситерапия — эффект сияния",
    description: "Свежая и подтянутая кожа после одной процедуры карбокситерапии",
    masterName: "Марина",
  },
];

export const PORTFOLIO_CATEGORIES = ["Все", "Маникюр", "Педикюр", "Волосы", "Брови", "Косметология"] as const;

export function getPortfolioByCategory(category: string): PortfolioItem[] {
  if (category === "Все") return PORTFOLIO_DATA;
  return PORTFOLIO_DATA.filter((item) => item.category === category);
}
