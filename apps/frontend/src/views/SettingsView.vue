<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Trash2 } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import * as z from "zod";

import { UpdateMeDto } from "@repo/types";

import { useUserStore } from "@/stores/user";

import { forgotPassword } from "@/services/auth";
import { pickImages, uploadFile } from "@/services/content";
import { updateUser } from "@/services/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const { t } = useI18n();

const formSchema = toTypedSchema(
    z.object({
        bio: z.string().max(100).optional(),
        label: z.string().min(2).max(50),
    }),
);

const form = useForm({
    validationSchema: formSchema,
});

const { user, refreshUser } = useUserStore();

const changePasswordMsg = ref<boolean>(false);

const onSubmit = form.handleSubmit(async (values) => {
    if (!(await form.validateField("label"))) {
        return;
    }

    const dto: UpdateMeDto = {
        label: values.label,
        bio: values.bio || "",
    };

    await updateUser(dto);
});

async function changePassword() {
    if (!user) return;
    const data = await forgotPassword(user.email);
    if (!data) {
        changePasswordMsg.value = false;
        return;
    }
    changePasswordMsg.value = true;
}

async function changeImage() {
    const formData = await pickImages();
    const image = await uploadFile(formData);
    if (!image) return;

    const dto: UpdateMeDto = {
        avatar_url: image.filename,
    };
    await updateUser(dto);
    refreshUser();
}

async function removeAvatar() {
    const dto: UpdateMeDto = {
        avatar_url: null,
    };
    await updateUser(dto);
    refreshUser();
}
</script>

<style scoped lang="scss">
.avatar-hover {
    &:hover {
        > .hover {
            display: flex;
        }
    }
}
</style>

<template>
    <div class="flex h-[100%] w-[100%] justify-center px-4 pt-10">
        <div class="sm:w-11/12 md:w-6/12">
            <h2 class="mb-10 text-xl font-semibold">{{ t("pages.settings.editProfile") }}</h2>
            <div class="bg-secondary mb-10 flex items-center justify-between rounded-xl p-5">
                <div class="flex gap-2">
                    <Avatar size="base" class="avatar-hover relative h-14 w-14">
                        <AvatarImage :src="useUserStore().userAvatar" alt="avatar" />
                        <AvatarFallback>
                            <img src="@/assets/img/default_avatar.png" alt="avatar" />
                        </AvatarFallback>
                        <div
                            class="hover text-md absolute left-0 top-0 hidden h-full w-full cursor-pointer items-center justify-center bg-black/40 text-white"
                            v-if="user?.avatar_url"
                            @click="removeAvatar"
                        >
                            <Trash2 />
                        </div>
                    </Avatar>
                    <div class="flex flex-col justify-center">
                        <span class="text-sm font-semibold">{{ user?.login }}</span>
                        <span class="text-secondary-foreground text-sm">{{ user?.label }}</span>
                    </div>
                </div>
                <Button size="sm" @click="changeImage">{{ t("pages.settings.changePhoto") }}</Button>
            </div>
            <form class="flex flex-col gap-8" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="label">
                    <FormItem class="grid w-full">
                        <FormLabel class="text-md !text-foreground font-bold">{{
                            t("pages.settings.nameSurname")
                        }}</FormLabel>
                        <FormControl>
                            <Input
                                class="placeholder:text-secondary-foreground resize-none rounded-xl"
                                id="label"
                                :placeholder="t('pages.settings.nameSurname')"
                                v-bind="componentField"
                                :default-value="user?.label"
                            />
                        </FormControl>
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="bio">
                    <FormItem class="grid w-full">
                        <FormLabel class="text-md font-bold">{{ t("pages.settings.bio") }}</FormLabel>
                        <FormControl>
                            <Textarea
                                class="placeholder:text-secondary-foreground no-scrollbar resize-none rounded-xl"
                                id="bio"
                                :placeholder="t('pages.settings.bio')"
                                v-bind="componentField"
                                :default-value="user?.bio"
                                :maxlength="100"
                            />
                        </FormControl>
                    </FormItem>
                </FormField>
                <div class="flex w-full justify-end">
                    <Button type="submit" class="px-8" size="sm">{{ t("pages.settings.submit") }}</Button>
                </div>
            </form>
            <div class="mt-6 flex flex-col">
                <Button @click="changePassword" variant="secondary" class="text-destructive">{{
                    t("pages.settings.changePassword")
                }}</Button>
                <span class="text-primary text-sm" v-if="changePasswordMsg">
                    {{ t("pages.settings.changePasswordMessage") }}
                </span>
            </div>
        </div>
    </div>
</template>
