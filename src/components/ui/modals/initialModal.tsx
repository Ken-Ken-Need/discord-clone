"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    })
})


export const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            // post
            await fetch("/api/servers/", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            form.reset();
            router.refresh();
            window.location.reload();

        } catch (e) {
            console.log(e);
        }

    }

    if (!isMounted) {
        return null;
    }
    return (
        <Dialog open>
            <DialogContent className="bg-white overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-center text-zinc font-bold text-2xl">
                        Create your own discord server!
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc">
                        You can always change the name of the server later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase font-bold text-xs  text-zinc-500">
                                    Server name
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading}
                                        className="bg-zinc-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                                        placeholder="Enter server name"
                                        {...field} />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )} />
                        <DialogFooter className=" px-6 py-4">
                            <Button disabled={isLoading}>Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
