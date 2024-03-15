import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useErrorHandler from "../helper/handleError";
import Axios from "../helper/axiosApi";
import IncomeContent from "./Components/IncomeContent";
import ExpenseContent from "./Components/ExpenseContent";

export default function Process() {
  const [categories, setCategories] = useState([])
  const handleError = useErrorHandler()
  const fetchCategories = async () => {
    try {
      const res = await Axios().get('/api/businessCategory')
      console.log(res.data)
      setCategories(res.data)
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <Tabs value={categories[0]} className="max-w-[80rem] mx-auto">
        <TabsHeader
          className="bg-secondary"
          indicatorProps={{
            className: "bg-secondary shadow-none !text-gray-900",
          }}
        >
          {categories.map(({ name, id }) => (
            <Tab key={id} value={id} className="font-bold text-white">
              {name}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {categories.map(({ id, name }) => (
            <TabPanel key={id} value={id} className="text-center">
              <Tabs value="a" className="max-w-[80rem] mx-auto">
                <TabsHeader
                  className="bg-tertiary"
                  indicatorProps={{
                    className: "bg-tertiary shadow-none text-white",
                  }}>
                  <Tab key={"a"} value={"a"} className="font-bold text-white">
                      Income
                  </Tab>
                  <Tab key={"b"} value={"b"} className="font-bold text-white">
                      Expense
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel key={"a"} value={"a"} className="text-center">
                    <IncomeContent categoryId={id} />
                  </TabPanel>
                  <TabPanel key={"b"} value={"b"} className="text-center">
                    <ExpenseContent categoryId={id} />
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
