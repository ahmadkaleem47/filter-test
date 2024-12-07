import { Flex } from "antd";
import { PriceFilter } from "../PriceFilter";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DateFilter } from "../DateFilter";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<any>([0, 1000]);
  const [dateRange, setDateRange] = useState<any>([null, null]);

  return (
    <Flex gap="large">
      <PriceFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        range={priceRange}
        setRange={setPriceRange}
      />
      <DateFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        range={dateRange}
        setRange={setDateRange}
      />
    </Flex>
  );
};
