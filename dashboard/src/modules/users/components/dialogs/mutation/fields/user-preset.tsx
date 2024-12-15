import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@marzneshin/common/components';
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface UserPresetFieldProps { }

export const UserPreset: FC<UserPresetFieldProps> = () => {
    const { t } = useTranslation()
    const form = useFormContext()
    const handleSelect = (value: string) => {
        let val = parseInt(value);
        switch (val) {
            case 5:
                form.setValue('data_limit', 0.25);
                form.setValue('usage_duration', 86400);
                break;
            case 10:
                form.setValue('data_limit', 30);
                form.setValue('usage_duration', 2592000);
                break;
            case 20:
                form.setValue('data_limit', 60);
                form.setValue('usage_duration', 2592000);
                break;
            case 30:
                form.setValue('data_limit', 90);
                form.setValue('usage_duration', 2592000);
                break;
        }
        form.setValue('activation_deadline', undefined);
        form.setValue('data_limit_reset_strategy', 'no_reset');
        form.setValue('expire_date', null);
        form.setValue('expire_strategy', 'start_on_first_use');
    }
    useEffect(()=>{
        handleSelect("5");
    },[])
    return (
        <FormField
            control={form.control}
            name="data_limit_reset_strategy"
            render={() => (
                <FormItem className="w-full">
                    <FormLabel>{t('page.users.user_preset_select')}</FormLabel>
                    <Select onValueChange={(value: string) => handleSelect(value)} defaultValue={"5"}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pick a mode" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="5">1 Day, 256 MB (Only for test)</SelectItem>
                            <SelectItem value="10">30 Days, 30 GB</SelectItem>
                            <SelectItem value="20">30 Days, 60 GB</SelectItem>
                            <SelectItem value="30">30 Days, 90 GB</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
