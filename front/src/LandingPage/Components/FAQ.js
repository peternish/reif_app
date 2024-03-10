import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export function FAQ() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader className="text-3xl" onClick={() => handleOpen(1)}>What is Real Estate Investor Financials?</AccordionHeader>
        <AccordionBody className="text-xl">
            Real Estate Investor Financials is an advanced financial management platform specifically designed
            for real estate
            investors. It streamlines financial operations, optimizes investment tracking, and enhances
            profitability in real estate
            ventures.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader className="text-3xl" onClick={() => handleOpen(2)}>
            How does Real Estate Investor Financials work?
        </AccordionHeader>
        <AccordionBody className="text-xl">
            Real Estate Investor Financials automates various financial tasks such as property income tracking,
            expense management,
            portfolio analysis, and tax reporting. It integrates seamlessly with your real estate investment
            accounts and banking
            systems to provide a comprehensive financial overview.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader className="text-3xl" onClick={() => handleOpen(3)}>
            How can Real Estate Investor Financials benefit my real estate investment business?
        </AccordionHeader>
        <AccordionBody className="text-xl">
            Real Estate Investor Financials helps save time, minimize errors, improve decision-making, and
            maximize returns on real
            estate investments. By automating financial processes, investors can focus more on strategic
            planning and portfolio
            growth.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader className="text-3xl" onClick={() => handleOpen(4)}>
            Is Real Estate Investor Financials suitable for investors of all levels?
        </AccordionHeader>
        <AccordionBody className="text-xl">
            Yes, Real Estate Investor Financials caters to investors of all experience levels, from novice
            investors to seasoned
            professionals. Its user-friendly interface and customizable features make it suitable for managing
            portfolios of any size and complexity.
        </AccordionBody>
      </Accordion>
    </>
  );
}