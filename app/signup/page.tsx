"use client"

import { SignupForm } from "@/components/auth/signup-form"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import Link from "next/link"
import { Globe } from "lucide-react"
import { useLanguageStore } from "@/lib/store"
import { getTranslation } from "@/lib/i18n"

export default function SignupPage() {
    const { locale } = useLanguageStore()
    const t = getTranslation(locale)

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="absolute right-4 top-4 md:right-8 md:top-8 z-50 flex gap-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>

            <div className="absolute left-4 top-4 md:left-8 md:top-8 z-50 flex items-center gap-2 font-medium">
                <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <Globe className="h-5 w-5" />
                </div>
                <span className="hidden md:inline-block">NtumiaHub</span>
            </div>

            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {t.auth.signupTitle}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t.auth.signupSubtitle}
                        </p>
                    </div>

                    <SignupForm />

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        {t.auth.hasAccount}{" "}
                        <Link
                            href="/"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            {t.auth.login}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
