import {
    FormControl,
    FormField,
    FormItem,
    Input,
    FormLabel,
    FormMessage,
} from "@marzneshin/common/components";
import { useEffect, type FC, type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RefreshCcw } from 'lucide-react';

export const UsernameField: FC<InputHTMLAttributes<HTMLElement>> = ({
    disabled,
}) => {
    const form = useFormContext();
    const { t } = useTranslation();
    const makeUserName = (length: number = 10) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        form.setValue('username', result);
        return result;
    }
    useEffect(()=>{
        if(!disabled && form.getValues('username').trim().length == 0){
            makeUserName();
        }
    },[])
    return (
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <div className="flex flex-row items-center w-full gap-2 justify-between">
                        <FormLabel>{t("username")}</FormLabel>
                        {!disabled ? <RefreshCcw size={16} className="mr-1 opacity-50" onClick={()=>makeUserName()}/> : null}
                    </div>
                    <FormControl>
                        <Input disabled={disabled} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
