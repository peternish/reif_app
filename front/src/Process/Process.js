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
import { SetConfigModal } from "./Components/SetConfigModal"

export default function Process() {
  const [categories, setCategories] = useState([])
  const [invoiceData, setInvoiceData] = useState([])
  const [businessCategory, setBusinessCategory] = useState([])
  const [expenseCategory, setExpenseCategory] = useState([])
  const [customerCategory, setCustomerCategory] = useState([])
  const [vendorCategory, setVendorCategory] = useState([])
  const [descriptionCategory, setDescriptionCategory] = useState([])
  const [pMethodCategory, setPMethodCategory] = useState([])
  const [pAccountCategory, setPAccountCategory] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isUploadClicked, setIsUploadClicked] = useState(false)
  const [showSetModal, setShowSetModal] = useState(false)
  const [pageUpdate, setPageUpdate] = useState(false)
  const inputFile = useRef(null)
  const handleError = useErrorHandler()
  const handleTabChange = (tabIndex) => {
    setSelectedCategoryId(tabIndex)
  }
  const handlePageUpdate = () => {
    setPageUpdate(!pageUpdate)
  }
  const fetchCategories = async () => {
    try {
      const res = await Axios().get('/api/businessCategory')
      // console.log(res.data)
      setCategories(res.data)
      setSelectedCategoryId(categories[0].id)
      setIsUploadClicked(false)
    } catch (err) {
      handleError(err)
    }
    setLoading(false)
  }
  const onUploadButtonClick = () => {
    inputFile.current.click();
  }
  const uploadFile = async (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    e.target.value = null;
    // console.log(selectedCategoryId)
    if (selectedCategoryId == 0) {
      setSelectedCategoryId(categories[0].id)
      data.append('categoryId', categories[0].id)
    }
    else {
      data.append('categoryId', selectedCategoryId)
    }
    
    const res = await Axios().post('/api/uploadInvoiceFile', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setInvoiceData(res.data.invoiceData)
    setBusinessCategory(res.data.businessCategory)
    setExpenseCategory(res.data.expenseCategory)
    setCustomerCategory(res.data.customerCategory)
    setVendorCategory(res.data.vendorCategory)
    setDescriptionCategory(res.data.descriptionCategory)
    setPMethodCategory(res.data.pMethodCategory)
    setPAccountCategory(res.data.pAccountCategory)
    setIsUploadClicked(res.data.data)
    setShowSetModal(true)
  }

  const fetchInvoiceData = async()  => {
    if (invoiceData.length != 0) {
      // console.log(invoiceData)
      setShowSetModal(true)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchInvoiceData()
  }, [invoiceData])
  
  return (
    <div>
      { loading? <p>Loading...</p>
      :
      <>
        {
          <SetConfigModal showModal={showSetModal} setShowModal={setShowSetModal} handlePageUpdate={handlePageUpdate} invoiceData={invoiceData} setInvoiceData={setInvoiceData}
                          businessCategory={businessCategory} expenseCategory={expenseCategory} customerCategory={customerCategory} vendorCategory={vendorCategory} descriptionCategory={descriptionCategory}
                          pMethodCategory={pMethodCategory} pAccountCategory={pAccountCategory}
          ></SetConfigModal>
        }
        <div>
          <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept="application/pdf" onInput={uploadFile}/>
          <div className="max-w-[85rem] mx-auto mb-2">
            <Button
              className="flex items-center gap-3 bg-primary" size="sm"
              onClick={onUploadButtonClick}
            >
              <ArrowUpOnSquareIcon strokeWidth={2} className="h-4 w-4" />
                Upload Invoice
            </Button>
          </div>
          <Tabs value={categories[0].id} className="mx-auto">
            <TabsHeader
              className="bg-secondary h-14 w-full"
              indicatorProps={{
                className: "bg-secondary shadow-none !text-gray-900",
              }}
            >
              {categories.map(({ name, id }) => (
                <Tab key={id} value={id} className="font-bold text-white" onClick={() => handleTabChange(id)}>
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
                          Deposit
                      </Tab>
                      <Tab key={"b"} value={"b"} className="font-bold text-white text-xl">
                          Expense
                      </Tab>
                    </TabsHeader>
                    <TabsBody>
                      <TabPanel key={"a"} value={"a"} className="text-center">
                        <IncomeContent categoryId={id} categoryName={name} isUploadClicked={isUploadClicked} setIsUploadClicked={setIsUploadClicked} />
                      </TabPanel>
                      <TabPanel key={"b"} value={"b"} className="text-center">
                        <ExpenseContent categoryId={id} categoryName={name} isUploadClicked={isUploadClicked} setIsUploadClicked={setIsUploadClicked}/>
                      </TabPanel>
                    </TabsBody>
                  </Tabs>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </>
      }
    </div>
  );
}
