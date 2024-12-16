import {
    createFileRoute,
    useNavigate,
} from "@tanstack/react-router";
import {
    UsersDeleteConfirmationDialog,
    useRouterUserContext,
} from "@marzneshin/modules/users";
import { useDialog } from "@marzneshin/common/hooks";
import { toast } from "sonner";
import i18n from "@marzneshin/features/i18n";

const UserDelete = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useDialog(true);
    const value = useRouterUserContext()
    const navigate = useNavigate({ from: "/users/$userId/delete" });
    console.log('ehsan', value);
    const canDelete = value?.user?.lifetime_used_traffic === 0;
    if (canDelete) {
        return !!(value?.user) && (
            <UsersDeleteConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                entity={value.user}
                onClose={() => navigate({ to: "/users" })}
            />
        );
    }
    else {
        toast.error(
           "Couldn't delete used users.",
            {
            })
        navigate({ to: "/users" });
    }
}

export const Route = createFileRoute('/_dashboard/users/$userId/delete')({
    component: UserDelete,
})
