"use client"
import qs from "querystring";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/user-modal-store";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required"
    }).refine(name => name !== 'public', {
        message: "Channel name cannot be public"
    })
})


export const CreateChannelModal = () => {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === 'createChannel';
    const router = useRouter();
    const params = useParams();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // post
            const query = qs.stringify({
                serverID: params?.serverID
            })
            await fetch(`/api/channels/?${query}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            form.reset();
            router.refresh();
            onClose();
        } catch (e) {
            console.log("dead here");
            console.log(e);
        }

    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-center text-zinc font-bold text-2xl">
                        Create a new channel!
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc">
                        Try not to collide with existing channels.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase font-bold text-xs  text-zinc-500">
                                    Channel name
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading}
                                        className="bg-zinc-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                                        placeholder="Enter channel name"
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
