"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";
import { HyperText } from "./magicui/hyper-text";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className={`flex items-center gap-1.5 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-white/40 text-base select-none">/</span>}
          <div
            role="button"
            tabIndex={locale === loc ? -1 : 0}
            onClick={() => {
              if (locale !== loc) handleLocaleChange(loc);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && locale !== loc) handleLocaleChange(loc);
            }}
            className={`text-sm uppercase transition-colors duration-300 ${locale === loc
                ? 'text-white cursor-default pointer-events-none'
                : 'text-white/60 hover:text-white cursor-pointer'
              }`}
          >
            <HyperText duration={600}>{loc}</HyperText>
          </div>
        </span>
      ))}
    </div>
  );
}
