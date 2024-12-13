import { type FC, useEffect, useMemo } from "react";
import {
    Separator,
    DialogTitle,
    DialogContent,
    Dialog,
    DialogHeader,
    Form,
    Button,
    ScrollArea,
    VStack,
} from "@marzneshin/common/components";
import { useTranslation } from "react-i18next";
import {
    DATA_LIMIT_METRIC,
    useUsersCreationMutation,
    useUsersUpdateMutation,
    UserSchema,
    UsernameField,
    type UserMutationType,
} from "@marzneshin/modules/users";
import { ServicesField } from "@marzneshin/modules/services";
import { NoteField } from "./fields";
import { type MutationDialogProps, useMutationDialog } from "@marzneshin/common/hooks";
import { DataLimitFields, ExpirationMethodFields } from "./sections";
import { useAuth } from "@marzneshin/modules/auth";
import { UserPreset } from "./fields/user-preset";

export const UsersMutationDialog: FC<MutationDialogProps<UserMutationType>> = ({
    entity,
    onClose,
}) => {
    const { isSudo } = useAuth();
    const { t } = useTranslation();
    const defaultValue = useMemo(
        () => ({
            service_ids: [],
            username: "",
            data_limit_reset_strategy: "no_reset",
            data_limit: true,
            note: "",
            expire_date: "",
            expire_strategy: "start_on_first_use",
        }),
        [],
    );

    const { open, onOpenChange, form, handleSubmit } = useMutationDialog({
        entity,
        onClose,
        createMutation: useUsersCreationMutation(),
        updateMutation: useUsersUpdateMutation(),
        schema: UserSchema,
        defaultValue,
        loadFormtter: (d) => ({
            ...d,
            data_limit: (d.data_limit ? d.data_limit : 0) / DATA_LIMIT_METRIC,
        }),
    });
    useEffect(()=>{
        console.log('hameddd', form);
        console.log('hameddd', entity);
    },[form.formState, entity])
    return (
        <Dialog open={open} onOpenChange={onOpenChange} defaultOpen={true}>
            <DialogContent className="min-w-full h-full md:h-auto md:min-w-[42rem]">
                <ScrollArea className="flex flex-col justify-between h-full">
                    <DialogHeader className="mb-3">
                        <DialogTitle className="text-primary">
                            {entity
                                ? t("page.users.dialogs.edition.title")
                                : t("page.users.dialogs.creation.title")}
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit}>
                            <div className="flex-col grid-cols-2 gap-2 sm:flex md:grid h-full p-1">
                                <div className="space-y-3">
                                    <UsernameField disabled={!!entity?.username} />
                                    {isSudo() ? (
                                        <>
                                            <Separator />
                                            <DataLimitFields />
                                            <Separator />
                                            <ExpirationMethodFields entity={entity} />
                                            <Separator />
                                            <NoteField />
                                            <UserPreset />
                                        </>

                                    ) :
                                        <>
                                            <UserPreset></UserPreset>
                                        </>}
                                </div>
                                <VStack>
                                    <ServicesField />
                                </VStack>
                            </div>
                            <Button
                                className="mt-3 w-full font-semibold"
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {t("submit")}
                            </Button>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
