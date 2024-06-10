<script setup lang="ts">
import { CreatePost } from "@/types";
import { ArrowLeft } from "lucide-vue-next";
import { ref, watch } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

import { pickImages } from "@/services/content";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

const cropper = ref(null);
const currentIndex = ref<number>(0);

const props = defineProps<{
    image: CreatePost["image"];
    croppedImages: CreatePost["croppedImages"];
}>();

const emit = defineEmits<{
    (e: "setPage", page: number): void;
    (e: "updateCroppedImages", images: CreatePost["croppedImages"]): void;
}>();

const imageUrl = ref<string>(window.URL.createObjectURL(props.image as Blob));

watch(
    () => currentIndex.value,
    (newIndex) => {
        imageUrl.value = props.croppedImages[newIndex].originalUrl;
    },
);

function onImageChange(data: any) {
    if (!data.image) return;

    try {
        data.canvas.toBlob((blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            const images = [...props.croppedImages];
            if (!images[currentIndex.value]) {
                images.push({
                    url: url,
                    originalUrl: imageUrl.value,
                });
            } else {
                images[currentIndex.value] = {
                    url: url,
                    originalUrl: images[currentIndex.value].originalUrl,
                };
            }
            emit("updateCroppedImages", images);
        });
    } catch (e) {
        console.log("error during resizing image");
    }
}

async function addImage() {
    try {
        const formData = await pickImages();
        const image = formData.get("file") as File;
        if (!image) return;
        const images = [...props.croppedImages];
        const url = window.URL.createObjectURL(image as Blob);
        images.push({ url: url, originalUrl: url });
        emit("updateCroppedImages", images);
        currentIndex.value = images.length - 1;
    } catch (e) {
        console.log("error during adding image");
    }
}

function removeImage(index: number) {
    const images = [...props.croppedImages];
    if (images.length == 1) {
        return;
    }
    images.splice(index, 1);
    if (currentIndex.value >= index) {
        currentIndex.value--;
    }

    emit("updateCroppedImages", images);
}
</script>
<template>
    <DialogTitle
        class="text-foreground text-md flex items-center justify-between border-b border-white/10 px-2 py-1 text-center"
    >
        <ArrowLeft class="hover:text-secondary-foreground cursor-pointer" @click="emit('setPage', 0)" />
        <span>Przytnij</span>
        <Button variant="ghost" class="text-primary" @click="emit('setPage', 2)"> Dalej </Button>
    </DialogTitle>
    <div class="flex aspect-[4/5] h-full flex-1 items-center justify-center">
        <Cropper
            :src="imageUrl"
            ref="cropper"
            class="cropper"
            background="transparent"
            :stencil-props="{
                handlers: {},
                movable: false,
                resizable: false,
                aspectRatio: 4 / 5,
            }"
            :resize-image="{
                adjustStencil: false,
            }"
            image-restriction="stencil"
            default-boundaries="fill"
            @change="onImageChange"
        />
        <div class="absolute bottom-8 right-2 flex h-20 gap-2 rounded-lg bg-black/80 p-2">
            <div v-for="(image, index) in props.croppedImages" class="relative h-full">
                <img
                    @click="
                        (e) => {
                            e.preventDefault();
                            currentIndex = index;
                        }
                    "
                    :style="{ opacity: index === currentIndex ? 1.0 : 0.5 }"
                    :src="image.url"
                    class="h-full"
                />
                <div
                    class="absolute right-1 top-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black/80 text-xs"
                    @click="removeImage(index)"
                    v-if="props.croppedImages.length > 1"
                >
                    X
                </div>
            </div>

            <div
                class="flex aspect-[4/5] h-full cursor-pointer items-center justify-center text-2xl text-white hover:text-white/60"
                @click="addImage"
            >
                +
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cropper {
    max-height: none !important;
    max-width: none !important;
    height: 100% !important;
}
</style>
