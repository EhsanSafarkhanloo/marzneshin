
import { Button } from "@marzneshin/common/components";
import { SelectableEntityTable, useRowSelection } from "@marzneshin/libs/entity-table";
import { nonSudoColumns } from "./columns";
import {
    type UserType,
    useUsersUpdateMutation,
} from "@marzneshin/modules/users";
import { useTranslation } from "react-i18next";
import { fetchUserServices } from "@marzneshin/modules/services";
import { useState, useCallback, FC } from "react";
import { useAuth } from "@marzneshin/modules/auth";

interface UserServicesTableProps {
    user: UserType;
}

export const UserServicesTable: FC<UserServicesTableProps> = ({ user }) => {
    const { isSudo } = useAuth();
    const { mutate: updateUser } = useUsersUpdateMutation();
    const { selectedRow, setSelectedRow } =
        useRowSelection(
            Object.fromEntries(
                user.service_ids.map(entityId => [String(entityId), true])
            )
        );
    const [selectedService, setSelectedService] = useState<number[]>(user.service_ids);
    const { t } = useTranslation();

    const handleApply = useCallback(() => {
       if(isSudo()){
        updateUser({ ...user, service_ids: selectedService });
       }
    }, [selectedService, user, updateUser]);

    return (
        <div className="flex flex-col gap-4">
            <SelectableEntityTable
                fetchEntity={fetchUserServices}
                columns={nonSudoColumns}
                primaryFilter="name"
                existingEntityIds={user.service_ids}
                entityKey="services"
                parentEntityKey="users"
                parentEntityId={user.username}
                rowSelection={{ selectedRow: selectedRow, setSelectedRow: setSelectedRow }}
                entitySelection={{ selectedEntity: selectedService, setSelectedEntity: setSelectedService }}
            />

            {isSudo() ? <Button onClick={handleApply} disabled={selectedService.length === 0}>
                {t("apply")}
            </Button> : null}
        </div>
    );
};
