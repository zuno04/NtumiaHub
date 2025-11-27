import { SignupForm } from "@/components/auth/signup-form"
import { ThemeSwitcher } from "@/components/theme-switcher"
import Link from "next/link"
import { Globe } from "lucide-react"

export default function SignupPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="absolute right-4 top-4 md:right-8 md:top-8 z-50">
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
                            Créer un compte média
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Rejoignez la plus grande plateforme d'échange de contenus au Cameroun
                        </p>
                    </div>

                    <SignupForm />

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Vous avez déjà un compte ?{" "}
                        <Link
                            href="/"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
