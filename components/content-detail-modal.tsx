"use client"

import { Content } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ContentDetailView } from "@/components/content-detail-view"

interface ContentDetailModalProps {
    content: Content | null
    isOpen: boolean
    onClose: () => void
}

export function ContentDetailModal({ content, isOpen, onClose }: ContentDetailModalProps) {
    if (!content) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{content.title}</DialogTitle>
                </DialogHeader>
                <ContentDetailView content={content} />
            </DialogContent>
        </Dialog>
    )
}
