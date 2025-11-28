"use client"

import * as React from "react"
import { Moon, Sun, Laptop, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { applyTheme } from "@/lib/theme-utils"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme()

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme)
        applyTheme(newTheme)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Apparence</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    Clair
                    {theme === 'light' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Sombre
                    {theme === 'dark' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    Système
                    {theme === 'system' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Thèmes</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleThemeChange("brand")}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-blue-600" />
                    NtumiaHub (Défaut)
                    {theme === 'brand' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("ocean")}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-blue-800" />
                    Océan
                    {theme === 'ocean' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("sunset")}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-orange-600" />
                    Coucher de soleil
                    {theme === 'sunset' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("high-contrast")}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-black border border-gray-300" />
                    Contraste Élevé
                    {theme === 'high-contrast' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
