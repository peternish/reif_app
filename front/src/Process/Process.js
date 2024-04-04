import {
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  ArrowUpOnSquareIcon
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import useErrorHandler from "../helper/handleError";
import Axios from "../helper/axiosApi";
import IncomeContent from "./Components/IncomeContent";
import ExpenseContent from "./Components/ExpenseContent";

export default function Process() {
  const [categories, setCategories] = useState([])
  const[loading, setLoading] = useState(true)
  const inputFile = useRef(null)
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
  const onUploadButtonClick = () => {
    inputFile.current.click();
  }
  const uploadFile = (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    console.log(e.target.files[0])
    Axios().post('/api/uploadInvoiceFile', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      { loading? <p>Loading...</p>
      :
        <div>
          <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept="application/pdf" onChange={uploadFile}/>
          <div className="max-w-[85rem] mx-auto mb-2">
            <Button
              className="flex items-center gap-3 bg-primary" size="sm"
              onClick={onUploadButtonClick}
            >
              <ArrowUpOnSquareIcon strokeWidth={2} className="h-4 w-4" />
                Upload Invoice
            </Button>
          </div>
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
        </div>
      }
    </div>
  );
}
