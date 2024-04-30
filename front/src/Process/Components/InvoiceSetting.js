import React, { useState } from 'react';
import CategorySetting from './CategorySetting';

const InvoiceSetting = ({invoiceData, setInvoiceData, businessCategory, expenseCategory, vendorCategory, descriptionCategory, pMethodCategory, pAccountCategory}) => {
    var invoiceData = invoiceData;
    const totalItems = invoiceData.length;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // const [currentPage, setCurrentPage] = useState(1);

    // Logic to fetch and set items for the current page
    // const getCurrentPageItems = () => {
    //     // const startIdx = (currentPage - 1) * itemsPerPage;
    //     // const endIdx = startIdx + itemsPerPage;
    //     return invoiceData.slice(0, 0);
    // };

    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };

    // Generate an array of page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
    }
    return (
    <div>
        {/* Display current page items */}
        
        <div>
            <CategorySetting invoiceData={invoiceData} setInvoice={setInvoiceData}
                            businessCategory={businessCategory} expenseCategory={expenseCategory} vendorCategory={vendorCategory}
                            descriptionCategory={descriptionCategory} pMethodCategory={pMethodCategory} pAccountCategory={pAccountCategory}></CategorySetting>
        {/* ))} */}
        </div>  

        {/* Render pagination buttons */}
        {/* <div className="flex justify-center mt-4">
        {pageNumbers.map((pageNumber) => (
            <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
            {pageNumber}
            </button>
        ))}
        </div> */}
    </div>
    );

    };

export default InvoiceSetting;