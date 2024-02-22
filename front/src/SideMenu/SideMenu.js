import {
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UserCircleIcon,
    PencilIcon,
    NewspaperIcon,
    BanknotesIcon,
    LifebuoyIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import YDivider from "../ComponentUtils/YDivider";

export default function SideMenu() {

    const navigate = useNavigate();

    return (
        <div className="h-full p-4 bg-primary text-white">
            <List>
                <ListItem onClick={() => { navigate('/') }}>
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Dashboard
                </ListItem>
                <ListItem onClick={() => { navigate('/setup') }} >
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
                <YDivider />
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
        </div >
    );
}