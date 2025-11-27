"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, FileText, Film, Music, Image as ImageIcon, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

const metadataSchema = z.object({
    title: z.string().min(2, "Le titre est requis"),
    description: z.string().optional(),
    type: z.enum(["video", "audio", "document", "ad"]),
    language: z.string(),
    license: z.enum(["free", "paid", "private", "public"]),
})

export function UploadModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const [step, setStep] = React.useState<'drop' | 'metadata' | 'uploading'>('drop')
    const [uploadProgress, setUploadProgress] = React.useState(0)

    const form = useForm<z.infer<typeof metadataSchema>>({
        resolver: zodResolver(metadataSchema),
        defaultValues: {
            title: "",
            description: "",
            type: "video",
            language: "fr",
            license: "public",
        },
    })

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
        if (acceptedFiles.length > 0) {
            // Auto-fill title with filename
            form.setValue("title", acceptedFiles[0].name.split('.')[0])
            setStep('metadata')
        }
    }, [form])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.mov', '.avi'],
            'audio/*': ['.mp3', '.wav'],
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
        },
        maxFiles: 1, // MVP: Single file upload for now
    })

    const removeFile = () => {
        setFiles([])
        setStep('drop')
        form.reset()
    }

    const onSubmit = async (values: z.infer<typeof metadataSchema>) => {
        setStep('uploading')

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 10
            })
        }, 500)

        // Simulate API completion
        setTimeout(() => {
            clearInterval(interval)
            setUploadProgress(100)
            toast.success("Contenu uploadé avec succès !")
            setOpen(false)

            // Reset state after close
            setTimeout(() => {
                setFiles([])
                setStep('drop')
                setUploadProgress(0)
                form.reset()
            }, 500)
        }, 5500)
    }

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('video')) return <Film className="h-8 w-8 text-blue-500" />
        if (file.type.startsWith('audio')) return <Music className="h-8 w-8 text-purple-500" />
        if (file.type.startsWith('image')) return <ImageIcon className="h-8 w-8 text-green-500" />
        return <FileText className="h-8 w-8 text-orange-500" />
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Uploader du contenu</DialogTitle>
                    <DialogDescription>
                        Partagez vos vidéos, audios ou documents avec la communauté.
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {step === 'drop' && (
                        <motion.div
                            key="drop"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div
                                {...getRootProps()}
                                className={`
                  border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                  flex flex-col items-center justify-center gap-4 min-h-[300px]
                  ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'}
                `}
                            >
                                <input {...getInputProps()} />
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                    <Upload className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium">Glissez-déposez votre fichier ici</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        ou cliquez pour parcourir vos dossiers
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <div className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">MP4</div>
                                    <div className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">MP3</div>
                                    <div className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">PDF</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'metadata' && files.length > 0 && (
                        <motion.div
                            key="metadata"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="mb-6 flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                                {getFileIcon(files[0])}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{files[0].name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={removeFile}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <ScrollArea className="h-[400px] pr-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Titre</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Titre du contenu" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Type</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Type" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="video">Vidéo</SelectItem>
                                                                <SelectItem value="audio">Audio</SelectItem>
                                                                <SelectItem value="document">Document</SelectItem>
                                                                <SelectItem value="ad">Publicité</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="license"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Licence</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Licence" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="public">Public (Gratuit)</SelectItem>
                                                                <SelectItem value="paid">Payant</SelectItem>
                                                                <SelectItem value="private">Privé</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Description détaillée..."
                                                            className="resize-none min-h-[100px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <DialogFooter className="pt-4">
                                            <Button type="button" variant="outline" onClick={removeFile}>
                                                Annuler
                                            </Button>
                                            <Button type="submit">
                                                Uploader
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </ScrollArea>
                        </motion.div>
                    )}

                    {step === 'uploading' && (
                        <motion.div
                            key="uploading"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-10 space-y-6"
                        >
                            <div className="relative h-24 w-24">
                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-muted stroke-current"
                                        strokeWidth="8"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                    />
                                    <circle
                                        className="text-primary stroke-current transition-all duration-500 ease-in-out"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={251.2 - (251.2 * uploadProgress) / 100}
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                                    {uploadProgress}%
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-medium">Upload en cours...</h3>
                                <p className="text-sm text-muted-foreground">
                                    Ne fermez pas cette fenêtre.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}
