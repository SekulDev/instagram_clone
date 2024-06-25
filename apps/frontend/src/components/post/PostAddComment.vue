<script setup lang="ts">
import { Comment, Post } from "@/types";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import * as z from "zod";

import { addPostComment } from "@/services/comment";

import { Button } from "@/components/ui/button";
import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const { t } = useI18n();

const props = defineProps<{
    post: Post;
}>();

const disabled = ref<boolean>(true);
const formSchema = toTypedSchema(
    z.object({
        content: z.string().min(1).max(250),
    }),
);

const form = useForm({
    validationSchema: formSchema,
});

const emit = defineEmits<{
    (e: "addComment", comment: Comment): void;
}>();

const { value: content } = useField<string>("content");

const onSubmit = form.handleSubmit(async (values) => {
    if (disabled.value == true) {
        return;
    }
    const data = await addPostComment(props.post.id, values.content);
    content.value = "";
    if (!data) {
        return;
    }
    emit("addComment", data);
});

watch([content], async () => {
    const isContentValid = await form.validateField("content");
    if (!isContentValid.valid) {
        disabled.value = true;
        return;
    }
    disabled.value = false;
});
</script>
<template>
    <form @submit="onSubmit" class="flex items-center gap-3 border-t px-3 py-1">
        <FormField v-slot="{ componentField }" name="content">
            <!-- <FormItem> -->
            <FormControl>
                <Input
                    class="border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                    :placeholder="t('components.post.commentPlaceholder')"
                    v-bind="componentField"
                />
            </FormControl>
            <!-- </FormItem> -->
        </FormField>

        <Button :disabled="disabled" variant="ghost" type="submit" size="sm" class="text-primary">{{
            t("components.post.publishButton")
        }}</Button>
    </form>
</template>
