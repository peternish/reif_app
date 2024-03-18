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
  const[loading, setLoading] = useState(true)

  const handleError = useErrorHandler()
  const fetchCategories = async () => {
    try {
      const res = await Axios().get('/api/businessCategory')
      setLoading(false)
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
      { loading? <p>Loading...</p>
      :
        <Tabs value={categories[0].id} className="max-w-[85rem] mx-auto">
          <TabsHeader
            className="bg-secondary h-14 w-full"
            indicatorProps={{
              className: "bg-secondary shadow-none !text-gray-900",
            }}
          >
            {categories.map(({ name, id }) => (
              <Tab key={id} value={id} className="font-bold text-white text-2xl">
                {name}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {categories.map(({ id, name }) => (
              <TabPanel key={id} value={id} className="text-center">
                <Tabs value="a" className="max-w-[85rem] mx-auto">
                  <TabsHeader
                    className="bg-tertiary ms-4 me-4"
                    indicatorProps={{
                      className: "bg-tertiary shadow-none text-white",
                    }}>
                    <Tab key={"a"} value={"a"} className="font-bold text-white text-xl">
                        Income
                    </Tab>
                    <Tab key={"b"} value={"b"} className="font-bold text-white text-xl">
                        Expense
                    </Tab>
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel key={"a"} value={"a"} className="text-center">
                      <IncomeContent categoryId={id} categoryName={name} />
                    </TabPanel>
                    <TabPanel key={"b"} value={"b"} className="text-center">
                      <ExpenseContent categoryId={id} categoryName={name} />
                    </TabPanel>
                  </TabsBody>
                </Tabs>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      }
    </div>
  );
}
