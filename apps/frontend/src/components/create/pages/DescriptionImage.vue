<script setup lang="ts">
import { getAvatarUrl } from "@/lib/utils";
import { CreatePost } from "@/types";
import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeft } from "lucide-vue-next";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import * as z from "zod";

import { useUserStore } from "@/stores/user";

import { uploadFile } from "@/services/content";
import { createPost } from "@/services/post";

import TagsInput from "@/components/TagsInput.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { FormControl, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const { t } = useI18n();

const tags = reactive<{ value: string[] }>({ value: [] });

const props = defineProps<{
    croppedImages: CreatePost["croppedImages"];
}>();

const emit = defineEmits<{
    (e: "setPage", page: number): void;
    (e: "onClose"): void;
}>();

const formSchema = toTypedSchema(
    z.object({
        description: z.string().min(1).max(150),
    }),
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    try {
        let description = values.description;
        if (!(await form.validateField("description"))) {
            description = "";
        }

        const imagesUrls: string[] = [];

        for (const image of props.croppedImages) {
            const response = await fetch(image.url);
            const blob = await response.blob();
            let img = new Image();
            img.src = URL.createObjectURL(blob);

            await new Promise<void>((resolve) => {
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

                    if (image.filter) {
                        ctx.filter = image.filter.filter;
                    }

                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(async (newBlob) => {
                        if (!newBlob) throw Error();
                        let formData = new FormData();

                        formData.append("file", newBlob, "image.png");

                        const data = await uploadFile(formData);
                        if (!data) throw Error();
                        imagesUrls.push(data.filename);
                        resolve();
                    });
                };
            });
        }

        await createPost({
            description: description,
            images: imagesUrls,
            tags: tags.value,
        });

        emit("onClose");
    } catch (e) {
        console.log("error during addding post");
    }
});

const { user } = useUserStore();

const currentIndex = ref<number>(0);

watch(
    () => currentIndex.value,
    (newValue) => {
        if (newValue >= props.croppedImages.length) {
            currentIndex.value = 0;
            return;
        }
        if (newValue < 0) {
            currentIndex.value = props.croppedImages.length - 1;
            return;
        }
    },
);

function changeImage(diff: -1 | 1) {
    diff == 1 ? currentIndex.value++ : currentIndex.value--;
}

const currentImage = computed(() => {
    return props.croppedImages?.[currentIndex.value] || "";
});
</script>
<template>
    <DialogTitle
        class="text-foreground text-md flex items-center justify-between border-b border-white/10 px-2 py-1 text-center"
    >
        <ArrowLeft class="hover:text-secondary-foreground cursor-pointer" @click="emit('setPage', 2)" />
        <span>{{ t("components.create.formDialogTitle") }}</span>
        <Button variant="ghost" class="text-primary" @click="onSubmit">
            {{ t("components.create.shareButton") }}
        </Button>
    </DialogTitle>
    <form class="flex aspect-[8/5] h-full flex-1 items-center">
        <div class="relative h-full w-1/2">
            <img
                :src="currentImage.url"
                class="h-full w-full object-contain"
                :style="{ filter: currentImage.filter?.filter || '' }"
            />
            <div
                v-if="props.croppedImages.length > 1"
                class="absolute left-0 top-0 flex h-full w-full items-center justify-between p-3"
            >
                <div class="h-6 w-6 cursor-pointer rounded-[50%] bg-white/60 text-gray-500" @click="changeImage(-1)">
                    <ChevronLeft />
                </div>
                <div class="h-6 w-6 cursor-pointer rounded-[50%] bg-white/60 text-gray-500" @click="changeImage(1)">
                    <ChevronRight />
                </div>
            </div>
        </div>
        <div class="aspect-[4/5] h-full p-2">
            <div class="flex w-full items-center gap-4 p-3">
                <Avatar size="base">
                    <AvatarImage :src="getAvatarUrl(user?.avatar_url || '')" alt="avatar" />
                    <AvatarFallback>
                        <img src="@/assets/img/default_avatar.png" alt="avatar" />
                    </AvatarFallback>
                </Avatar>
                <span class="text-sm font-semibold">{{ user?.login }}</span>
            </div>
            <FormField v-slot="{ componentField }" name="description">
                <FormControl>
                    <Textarea
                        class="no-scrollbar placeholder:text-secondary-foreground !focus-visible:ring-0 h-40 resize-none border-none bg-transparent outline-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                        :placeholder="t('components.create.addDescriptionPlaceholder')"
                        v-bind="componentField"
                    />
                </FormControl>
            </FormField>
            <TagsInput :placeholder="t('components.create.addTagsPlaceholder')" :model="tags.value" />
        </div>
    </form>
</template>
