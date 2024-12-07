import { useEffect } from "react";
import { Button, Flex, Input, Popover, Slider } from "antd";
import { CheckPriceError } from "../../helpers";

export const PriceFilter = ({
  searchParams,
  setSearchParams,
  range,
  setRange,
}: any) => {
  useEffect(() => {
    const min = parseInt(searchParams.get("min") || "0", 10);
    const max = parseInt(searchParams.get("max") || "1000", 10);
    setRange([min, max]);
  }, [searchParams]);

  const handleSliderChange = (value: any) => {
    setRange(value);
  };

  const handleReset = () => {
    setRange([0, 1000]);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      min: "0",
      max: "1000",
    });
  };

  const handleApply = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      min: range[0].toString(),
      max: range[1].toString(),
    });
  };

  const content = (
    <Flex vertical>
      <Flex justify="center" align="center" gap="large">
        <Input
          placeholder="0"
          type="number"
          value={range[0]}
          onChange={(e) => handleSliderChange([+e.target.value, range[1]])}
        />
        -
        <Input
          placeholder="1000"
          type="number"
          value={range[1]}
          onChange={(e) => handleSliderChange([range[0], +e.target.value])}
        />
      </Flex>
      <Slider range value={range} onChange={handleSliderChange} max={1000} />
      {!!CheckPriceError(range) && (
        <p className="text-primary opacity-90">{CheckPriceError(range)}</p>
      )}

      <Flex gap="small" className="justify-end">
        <Button color="danger" variant="link" onClick={handleReset}>
          Reset
        </Button>
        <Button
          disabled={!!CheckPriceError(range)}
          className="text-black"
          variant="outlined"
          onClick={() => handleApply()}
        >
          Apply
        </Button>
      </Flex>
    </Flex>
  );

  return (
    <Popover placement="bottomLeft" className="min-w-80" content={content}>
      <Button
        className="text-gray-400 hover:text-primary w-full flex items-center justify-start px-3 py-5 text-lg"
        variant="outlined"
      >
        Price
      </Button>
    </Popover>
  );
};
