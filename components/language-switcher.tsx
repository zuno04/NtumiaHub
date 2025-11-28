"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguageStore } from "@/lib/store"
import { locales, type Locale } from "@/lib/i18n"

const languageNames: Record<Locale, string> = {
    en: "English",
    fr: "Français",
}

const languageFlags: Record<Locale, string> = {
    en: "🇬🇧",
    fr: "🇫🇷",
}

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguageStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Languages className="h-4 w-4" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {locales.map((lang) => (
                    <DropdownMenuItem
                        key={lang}
                        onClick={() => setLocale(lang)}
                        className={locale === lang ? "bg-accent" : ""}
                    >
                        <span className="mr-2">{languageFlags[lang]}</span>
                        {languageNames[lang]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
