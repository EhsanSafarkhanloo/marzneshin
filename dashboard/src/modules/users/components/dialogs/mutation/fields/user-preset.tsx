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
import { FC } from 'react'
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface UserPresetFieldProps { }

export const UserPreset: FC<UserPresetFieldProps> = () => {
    const { t } = useTranslation()
    const form = useFormContext()
    const handleSelect = (value: string) => {
        let val = parseInt(value);
        switch (val) {
            case 10:
                form.setValue('data_limit', 30);
                break;
            case 20:
                form.setValue('data_limit', 60);
                break;
            case 30:
                form.setValue('data_limit', 90);
                break;
        }
        form.setValue('usage_duration', 2592000);
        form.setValue('activation_deadline', undefined);
        form.setValue('data_limit_reset_strategy', 'no_reset');
        form.setValue('expire_date', '');
        form.setValue('expire_strategy', 'start_on_first_use');
    }
    return (
        <FormField
            control={form.control}
            name="data_limit_reset_strategy"
            render={() => (
                <FormItem className="w-full">
                    <FormLabel>{t('page.users.user_preset_select')}</FormLabel>
                    <Select onValueChange={(value: string) => handleSelect(value)} defaultValue={"20"}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pick a mode" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="10">1 Month, 30 GB</SelectItem>
                            <SelectItem value="20">1 Month, 60 GB</SelectItem>
                            <SelectItem value="30">1 Month, 90 GB</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
