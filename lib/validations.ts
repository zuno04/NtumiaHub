import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide.",
    }),
    password: z.string().min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères.",
    }),
    rememberMe: z.boolean().default(false),
})

export const signupStep1Schema = z.object({
    orgName: z.string().min(2, "Le nom de l'organisation est requis"),
    orgType: z.enum(["TV", "Radio", "Press", "WebMedia", "WebTV"], {
        message: "Veuillez sélectionner un type de média",
    }),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
    logo: z.any().optional(), // In a real app, validate File object
})

export const signupStep2Schema = z.object({
    contactName: z.string().min(2, "Le nom du responsable est requis"),
    contactEmail: z.string().email("Email invalide"),
    contactPhone: z.string().min(9, "Numéro de téléphone invalide"),
    position: z.string().min(2, "Le poste est requis"),
})

export const signupStep3Schema = z.object({
    documents: z.any().optional(), // Validate file array
    terms: z.boolean().refine((val) => val === true, {
        message: "Vous devez accepter les conditions d'utilisation",
    }),
})

// Combined schema for final submission if needed
export const signupSchema = z.object({
    ...signupStep1Schema.shape,
    ...signupStep2Schema.shape,
    ...signupStep3Schema.shape,
})
