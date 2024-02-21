import React, { useState, useEffect, createElement } from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    Avatar,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ChevronDownIcon, LifebuoyIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="white"
                    className="flex items-center gap-1 rounded-full py-1 px-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="avatar.png"
                    />
                    Graylan Stewart
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

export default function Header() {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <div className="min-w-screen min-h-16 max-h-16">
            <Navbar className="sticky top-0 z-10 h-full max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-opacity-100 bg-header border-none">
                <div className="flex items-center justify-between text-white">
                    <Typography
                        className="mr-4 cursor-pointer py-1.5 text-[1.5rem]"
                        onClick={() => navigate('/')}
                    >
                        REI Financials
                    </Typography>
                    <div className="flex items-center gap-4">
                        <ProfileMenu />
                    </div>
                </div>
            </Navbar>
        </div>
    );
}