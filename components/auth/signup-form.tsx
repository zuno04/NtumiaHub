"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Upload, Check, ChevronRight, ChevronLeft, FileText } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { signupStep1Schema, signupStep2Schema, signupStep3Schema } from "@/lib/validations"

const steps = [
    { id: 1, name: "Organisation", schema: signupStep1Schema },
    { id: 2, name: "Contact", schema: signupStep2Schema },
    { id: 3, name: "Documents", schema: signupStep3Schema },
]

export function SignupForm() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(false)
    const [progress, setProgress] = React.useState(33)
    const [formData, setFormData] = React.useState({})

    // Initialize forms for each step
    const form1 = useForm<z.infer<typeof signupStep1Schema>>({
        resolver: zodResolver(signupStep1Schema),
        defaultValues: {
            orgName: "",
            description: "",
            orgType: "TV", // Default value to avoid undefined
        }
    })

    const form2 = useForm<z.infer<typeof signupStep2Schema>>({
        resolver: zodResolver(signupStep2Schema),
        defaultValues: {
            contactName: "",
            contactEmail: "",
            contactPhone: "",
            position: "",
        }
    })

    const form3 = useForm<z.infer<typeof signupStep3Schema>>({
        resolver: zodResolver(signupStep3Schema),
        defaultValues: {
            terms: false,
        }
    })

    const nextStep = async () => {
        let isValid = false
        let data = {}

        if (currentStep === 1) {
            isValid = await form1.trigger()
            data = form1.getValues()
        } else if (currentStep === 2) {
            isValid = await form2.trigger()
            data = form2.getValues()
        }

        if (isValid) {
            setFormData(prev => ({ ...prev, ...data }))
            setCurrentStep(prev => prev + 1)
            setProgress(((currentStep + 1) / steps.length) * 100)
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => prev - 1)
        setProgress(((currentStep - 1) / steps.length) * 100)
    }

    const onSubmit = async () => {
        const isValid = await form3.trigger()
        if (!isValid) return

        const step3Data = form3.getValues()
        const finalData = { ...formData, ...step3Data }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Inscription réussie !", {
                description: "Votre compte est en attente de validation par un administrateur.",
            })
            router.push("/")
        }, 2000)
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Étape {currentStep} sur {steps.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Form {...form1}>
                                <form className="space-y-4">
                                    <FormField
                                        control={form1.control}
                                        name="orgName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom de l'organisation</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: Canal 2 International" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form1.control}
                                        name="orgType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type de média</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionner un type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="TV">Chaîne TV</SelectItem>
                                                        <SelectItem value="Radio">Radio</SelectItem>
                                                        <SelectItem value="Press">Presse Écrite</SelectItem>
                                                        <SelectItem value="WebMedia">Média Web</SelectItem>
                                                        <SelectItem value="WebTV">Web TV</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form1.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Brève description de votre média..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <FormLabel htmlFor="logo">Logo (Optionnel)</FormLabel>
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">Cliquez pour uploader</p>
                                                </div>
                                                <input id="logo-upload" type="file" className="hidden" accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Form {...form2}>
                                <form className="space-y-4">
                                    <FormField
                                        control={form2.control}
                                        name="contactName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom du responsable</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Jean Dupont" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="contactEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email professionnel</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="jean@media.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="contactPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Téléphone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+237 6..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form2.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Poste occupé</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Directeur des programmes" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Form {...form3}>
                                <form className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="rounded-lg border p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium">Documents légaux</h4>
                                                    <p className="text-xs text-muted-foreground">Licence de diffusion, Registre de commerce...</p>
                                                </div>
                                                <Button variant="outline" size="sm" type="button">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Ajouter
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <FormField
                                        control={form3.control}
                                        name="terms"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        J'accepte les conditions d'utilisation
                                                    </FormLabel>
                                                    <FormDescription>
                                                        En cochant cette case, vous acceptez notre politique de confidentialité et nos conditions générales.
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1 || isLoading}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Précédent
                </Button>

                {currentStep < steps.length ? (
                    <Button onClick={nextStep}>
                        Suivant
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={onSubmit} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Traitement...
                            </>
                        ) : (
                            <>
                                Terminer l'inscription
                                <Check className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}
