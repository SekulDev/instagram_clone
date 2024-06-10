<script setup lang="ts">
import { CreatePost } from "@/types";

import { UploadImageIcon } from "@repo/icons";

import { pickImages } from "@/services/content";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

defineProps<{
    image: CreatePost["image"];
}>();

const emit = defineEmits<{
    (e: "updateImage", file: CreatePost["image"]): void;
}>();

async function pick() {
    const formData = await pickImages();
    const image = formData.get("file") as File;
    if (!image) {
        emit("updateImage", null);
    } else {
        emit("updateImage", image);
    }
}
</script>
<template>
    <DialogTitle
        class="text-foreground text-md flex w-full items-center justify-center border-b border-white/10 px-2 py-1 text-center"
    >
        Utwórz nowy post
    </DialogTitle>
    <div class="flex aspect-[4/5] h-full flex-col items-center justify-center gap-2">
        <UploadImageIcon />
        <span>Wybierz swoje zdjęcia</span>
        <Button @click="pick">Wybierz z komputera</Button>
    </div>
</template>
