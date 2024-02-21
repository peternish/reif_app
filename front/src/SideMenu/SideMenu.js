import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    ListStylesType
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    PaperClipIcon,
    PencilIcon,
    NewspaperIcon,
    BanknotesIcon,
    LifebuoyIcon,
} from "@heroicons/react/24/solid";

export default function SideMenu() {
    return (
        <div className="h-full p-4 bg-primary text-white">
            <List>
                <ListItem className="w-full">
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Dashboard
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PencilIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Set Up
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <BanknotesIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Process
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <NewspaperIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Reports
                </ListItem>
                <hr className="my-2 border-blue-gray-50" />
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <LifebuoyIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Help
                </ListItem>
            </List>
        </div>
    );
}