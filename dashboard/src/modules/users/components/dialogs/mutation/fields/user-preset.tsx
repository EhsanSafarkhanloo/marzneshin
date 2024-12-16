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
import { useAuth } from '@marzneshin/modules/auth';
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
    const { isSudo, balance } = useAuth();
    const selectItems = [
        { value: "5", label: "1 Day, 256 MB (Only for test)", disabled: (isSudo() ? false : balance < 0.25) },
        { value: "10", label: "30 Days, 30 GB", disabled: (isSudo() ? false : balance < 30) },
        { value: "20", label: "30 Days, 60 GB", disabled: (isSudo() ? false : balance < 60) },
        { value: "30", label: "30 Days, 90 GB", disabled: (isSudo() ? false : balance < 90) }
    ];
    useEffect(() => {
        handleSelect("5");
    }, [])
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
                            {selectItems.map((item) => (
                                <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
