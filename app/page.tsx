"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { LoginForm } from "@/components/auth/login-form"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Radio, Tv, Newspaper } from "lucide-react"
import { useLanguageStore } from "@/lib/store"
import { getTranslation } from "@/lib/i18n"

export default function LoginPage() {
  const { locale } = useLanguageStore()
  const t = getTranslation(locale)

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute right-4 top-4 md:right-8 md:top-8 z-50 flex gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-background/60" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex items-center text-lg font-medium"
        >
          <div className="mr-2 h-8 w-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
            <Globe className="h-5 w-5" />
          </div>
          NtumiaHub
        </motion.div>

        <div className="relative z-20 mt-auto">
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-2"
          >
            <p className="text-lg">
              &ldquo;{t.hero.tagline}&rdquo;
            </p>
            <footer className="text-sm">{t.hero.team}</footer>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Tv className="h-4 w-4" /> TV
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Radio className="h-4 w-4" /> Radio
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Newspaper className="h-4 w-4" /> {locale === 'fr' ? 'Presse' : 'Press'}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t.auth.loginTitle}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t.auth.loginSubtitle}
            </p>
          </div>

          <LoginForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            {t.auth.noAccount}{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t.auth.createMediaAccount}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
