<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import * as z from "zod";

import { register } from "@/services/auth";

import InstagramTextLogo from "@/components/InstagramTextLogo.vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const router = useRouter();

const disabled = ref(true);

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        label: z.string().min(2).max(50),
        login: z.string().min(2).max(50),
        password: z.string().min(1),
    }),
);

const errorMessage = ref<boolean>(false);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    if (disabled.value == true) {
        errorMessage.value = true;
        return;
    }
    const data = await register(values.email, values.login, values.label, values.password);
    if (!data) {
        errorMessage.value = true;
        return;
    }
    router.push({ name: "Home" });
});

const { value: email } = useField<string>("email");
const { value: label } = useField<string>("label");
const { value: login } = useField<string>("login");
const { value: password } = useField<string>("password");

watch([email, label, login, password], async (newValue) => {
    if (!newValue[0] || !newValue[1] || !newValue[2] || !newValue[3]) return (disabled.value = true);
    if (newValue[0].length == 0 || newValue[1].length == 0 || newValue[2].length == 0 || newValue[3].length == 0)
        return (disabled.value = true);
    const isEmailValid = await form.validateField("email");
    console.log(isEmailValid.valid);
    if (!isEmailValid.valid) {
        disabled.value = true;
        return;
    }
    disabled.value = false;
});
</script>

<template>
    <div class="flex flex-col items-center gap-2 sm:max-w-[11/12] md:w-[350px]">
        <Card class="w-[100%] p-6">
            <CardHeader class="p-10 pb-6">
                <CardTitle>
                    <InstagramTextLogo class="h-auto w-[100%]" />
                </CardTitle>
                <CardDescription class="text-secondary-foreground text-center font-semibold">
                    Zarejestruj się, aby przeglądać zdjęcia i filmy znajomych
                </CardDescription>
            </CardHeader>
            <CardContent class="pb-0">
                <form class="flex flex-col gap-2" @submit="onSubmit">
                    <div class="mb-4 flex w-[100%] items-center justify-around gap-2">
                        <div class="bg-border relative flex h-[1px] flex-1"></div>
                    </div>

                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Adres email" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="label">
                        <FormItem>
                            <FormControl>
                                <Input type="text" placeholder="Imię nazwisko" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="login">
                        <FormItem>
                            <FormControl>
                                <Input type="text" placeholder="Nazwa użytkownika" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Hasło" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <div class="my-3 flex flex-col items-center">
                        <span v-if="errorMessage" class="text-destructive text-center text-sm font-thin">
                            Wprowadzona przez ciebie nazwa użytkownika lub adres email już istnieją
                        </span>
                    </div>

                    <Button :disabled="disabled" class="mt-2" size="sm" type="submit">Dalej</Button>
                </form>
            </CardContent>
        </Card>
        <Card class="w-[100%]">
            <CardContent class="flex items-center justify-center gap-2 p-5">
                Masz konto? <RouterLink :to="{ name: 'Login' }" class="text-primary">Zaloguj się</RouterLink>
            </CardContent>
        </Card>
    </div>
</template>
