import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import BusinessCategory from "./Tabs/BusinessCategory";
import ExpenseCategory from "./Tabs/ExpenseCategory";
import Vendor from "./Tabs/Vendor";

export default function Setup() {

    return (
        <Tabs value="business" className="w-full h-full min-w-[60rem]">
            <TabsHeader
                className="bg-transparent"
                indicatorProps={{
                    className: "bg-gray-900/10 shadow-none !text-gray-900",
                }}
            >
                <Tab key='business' value='business'>
                    Business Categories
                </Tab>
                <Tab key='expense' value='expense'>
                    Expense/Deposit Categories
                </Tab>
                <Tab key='vendor' value='vendor'>
                    Vendors
                </Tab>
            </TabsHeader>
            <TabsBody className="h-full">
                <TabPanel key='business' value='business' className="h-full" >
                    <BusinessCategory />
                </TabPanel>
                <TabPanel key='expense' value='expense' className="h-full flex flex-col items-center" >
                    <ExpenseCategory />
                </TabPanel>
                <TabPanel key='vendor' value='vendor' className="h-full flex flex-col items-center" >
                    <Vendor />
                </TabPanel>
            </TabsBody>
        </Tabs>
    );
}