import Image from "next/image";
import Link from "next/link";
import { CategoryType } from "@/types/categories";
import { getAllCategories } from "@/services/categories.services";
import TopTitles from "../TopTitles/TopTitles";

export default async function Categories() {
  const categories: CategoryType[] = await getAllCategories();

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        <TopTitles
          title="Shop By"
          sub="Category"
          sideTitle="View All Categories"
          href="/categories"
        />

        {/* تعديل الـ Grid ليكون متجاوب بشكل أفضل على الموبايل والتابلت */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories?.map((category) => (
            <Link
              key={category?._id}
              href={`/categories/${category?._id}`}
              className="group flex flex-col items-center bg-white dark:bg-slate-900 rounded-2xl p-5 text-center shadow-sm hover:shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/60 hover:border-emerald-100 dark:hover:border-emerald-900/50 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* الدائرة الحاضنة للصورة مع تأثيرات Ring & Hover */}
              <div className="relative h-24 w-24 overflow-hidden bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/60 ring-4 ring-transparent group-hover:ring-emerald-50 dark:group-hover:ring-emerald-900/20">
                <Image
                  alt={category?.name || "Category Image"}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover p-2 transition-transform duration-500 group-hover:scale-110"
                  src={category?.image}
                />
              </div>

              {/* اسم القسم */}
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                {category?.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}