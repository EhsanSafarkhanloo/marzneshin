import {
    Sidebar,
    type SidebarItem,
} from "@marzneshin/common/components";
import { useIsCurrentRoute } from "@marzneshin/common/hooks";
import { useEffect, type FC } from "react";
import { sidebarItems as sidebarItemsSudoAdmin, sidebarItemsNonSudoAdmin } from ".";
import { projectInfo, cn } from "@marzneshin/common/utils";
import { useAuth } from "@marzneshin/modules/auth";
import { Button, Card, CardTitle, CardContent } from "@marzneshin/common/components";

interface DashboardSidebarProps {
    collapsed: boolean;
    setCollapsed: (state: boolean) => void;
    open?: boolean;
    setOpen?: (state: boolean) => void;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
    collapsed,
    setCollapsed,
    setOpen,
    open,
}) => {
    const { isSudo, balance } = useAuth();
    const { isCurrentRouteActive } = useIsCurrentRoute()
    const sidebarItems = isSudo() ? sidebarItemsSudoAdmin : sidebarItemsNonSudoAdmin

    return (
        <aside className="size-full py-4  px-4 ">
            <nav className="size-full">
                <Sidebar
                    sidebar={sidebarItems}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    open={open}
                    setOpen={setOpen}
                >
                    <div className="flex size-full flex-col justify-between">
                        <Sidebar.Body>
                            {Object.keys(sidebarItems).map((key) => (
                                <div className="w-full" key={key}>
                                    <Sidebar.Group className="uppercase">{key}</Sidebar.Group>
                                    {sidebarItems[key].map((item: SidebarItem) => (
                                        <Sidebar.Item
                                            variant={isCurrentRouteActive(item.to) ? "active" : "default"}
                                            className={cn("my-2 border-transparent", {
                                                "w-10 h-10": collapsed,
                                            })}
                                            item={item}
                                            key={item.title}
                                        />
                                    ))}
                                </div>
                            ))}
                        </Sidebar.Body>
                        <Sidebar.Footer>
                            {collapsed ?
                                <>
                                    {/* <SupportUs variant="view" donationLink={projectInfo.donationLink} structure="popover" /> */}
                                </>
                                :
                                <>
                                    {/* <SupportUs variant="local-storage" donationLink={projectInfo.donationLink} structure="card" /> */}
                                    <Card>
                                    <CardContent className={cn("p-4 flex flex-col w-fit gap-2 text-muted-foreground text-sm")}>
                                            Your Balance is <strong>{balance.toString()} GB</strong>
                                        </CardContent>
                                    </Card>
                                </>

                            }

                        </Sidebar.Footer>
                    </div>
                </Sidebar>
            </nav>
        </aside>
    );
};
