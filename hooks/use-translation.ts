"use client"

import { useLanguageStore } from "@/lib/store"
import { getTranslation } from "@/lib/i18n"

export function useTranslation() {
    const { locale } = useLanguageStore()
    const t = getTranslation(locale)

    return { t, locale }
}
