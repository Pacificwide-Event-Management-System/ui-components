import clsx from "clsx";
import { CustomFlowbiteTheme, Pagination } from "flowbite-react";
import { useTranslations } from "next-intl";
import { FunctionComponent } from "react";
import Select from "react-select";

const customTheme: CustomFlowbiteTheme["pagination"] = {
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
    },
  },
  pages: {
    base: "xs:mt-0 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "py-[6px] ml-0 mr-1 rounded-l-lg border-gray-300 bg-white px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 enabled:hover:rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    next: {
      base: "py-[6px] bg-white px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 enabled:hover:rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5",
    },
    selector: {
      base: "py-[6px] mr-1 w-8 border-gray-300 bg-white leading-tight text-gray-500 enabled:hover:rounded-lg enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      active: "bg-neutral-2 text-neutral-8 rounded-lg border-neutral-2",
      disabled: "opacity-50 cursor-normal",
    },
  },
};

type Props = {
  currentPageNumber: number;
  currentPageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
  minPageSizeTen: boolean;
};

// Custom components
const EmsPagination: FunctionComponent<Props> = (props) => {
  const t = useTranslations();

  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
  ];

  const optionsTwo = [
    { value: 12, label: "12" },
    { value: 24, label: "24" },
    { value: 36, label: "36" },
    { value: 48, label: "48" },
  ];

  return (
    <div className={clsx("flex h-8 gap-4", props.className)}>
      <Pagination
        className="flex h-8 items-center"
        theme={customTheme}
        layout="pagination"
        currentPage={props.currentPageNumber}
        totalPages={props.totalPages}
        onPageChange={props.onPageChange}
        previousLabel={t("common.prev")}
        nextLabel={t("common.next")}
        showIcons
      />
      <div className="flex items-center gap-3">
        <Select
          className="flex h-8 items-center justify-center rounded-lg border-[1px] !bg-neutral-6 px-3 !text-neutral-2 hover:!bg-neutral-5 hover:!text-neutral-1"
          value={options.find((item) => item.value == props.currentPageSize)}
          unstyled
          menuPlacement="auto"
          isSearchable={false}
          options={props.minPageSizeTen ? options : optionsTwo}
          onChange={(item) => props.onPageSizeChange(item.value)}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            container: (baseStyles, state) => ({
              ...baseStyles,
              minHeight: "0",
              maxWidth: "100%",
              borderWidth: state.isDisabled ? 0 : 1,
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "none",
              background: "none",
              padding: "0",
              minHeight: "0",
              cursor: state.isDisabled ? "not-allowed" : "pointer",
            }),
            dropdownIndicator: (base, state) => ({
              ...base,
              transition: "all .2s ease",
              transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              border: "none",
              background: "none",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.5rem",
            }),
            indicatorsContainer: (baseStyles, state) => ({
              ...baseStyles,
              border: "none",
              background: "none",
              paddingLeft: "0.5rem",
              display: state.isDisabled ? "none" : "flex",
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              padding: "0",
              margin: "2px 0 0 0",
              left: "0",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              padding: "0.5rem 0.5rem 0.5rem 0.75rem",
              cursor: "pointer",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.5rem",
              borderRadius: "0.75rem",
              ":hover": {
                backgroundColor: "#F0EEEE",
              },
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,
              padding: "0.5rem",
              display: "flex",
              flexFlow: "column",
              gap: "0.25rem",
              borderRadius: "0.75rem",
              borderWidth: "1px",
              borderColor: "#F0EEEE",
              backgroundColor: "white",
              boxShadow: "0px 16px 32px -8px rgba(3, 22, 32, 0.08)",
              maxWidth: "100%",
            }),
          }}
        />
        <span className="text-sm font-normal text-neutral-2">
          {t("event_page.items_page")}
        </span>
      </div>
    </div>
  );
};

export default EmsPagination;
