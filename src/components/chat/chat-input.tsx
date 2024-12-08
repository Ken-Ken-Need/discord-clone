"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "querystring"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface ChatInputProps {
    apiUrl: string;
    query: Record<string, string>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1)
})

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                content: ""
            }
        }
    );
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const queryString = qs.stringify(query);
            const url = apiUrl + "?" + queryString;
            // console.log("This is url", url);

            // await axios.post(url, values);
            const response = await fetch(url, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await response.json();
            console.log('Response:', data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="content" render={({ field }) => {
                    return <FormItem>
                        <FormControl>
                            <div className="relative p-4 pb-6">
                                {/* <button type="button" onClick={() => { }} className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600transition rounded-full p-1 flex items-center justify-center">
                                    <Plus className="text-white" />
                                </button> */}
                                <Input disabled={isLoading} className="px-14 py-6 bg-zinc-700/75 border-none  border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200 "
                                    placeholder={`message ${type === "conversation" ? name : "#" + name}`}
                                    {...field}>
                                </Input>
                            </div>
                        </FormControl>
                    </FormItem>;
                }}>

                </FormField>
            </form>
        </Form>
    )
}