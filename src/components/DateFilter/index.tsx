import { useEffect } from "react";
import { Button, Flex, Input, Popover, Slider } from "antd";
import moment from "moment";
import { CheckDateError } from "../../helpers";

export const DateFilter = ({
  searchParams,
  setSearchParams,
  range,
  setRange,
}: any) => {
  const minDate = "1900-01-01";
  const maxDate = moment().format("YYYY-MM-DD");
  const minTimestamp = moment(minDate).valueOf();
  const maxTimestamp = moment(maxDate).valueOf();

  useEffect(() => {
    const min = parseInt(
      searchParams.get("start") || minTimestamp.toString(),
      10
    );
    const max = parseInt(
      searchParams.get("end") || maxTimestamp.toString(),
      10
    );
    setRange([min, max]);
  }, [searchParams]);

  const handleSliderChange = (value: any) => {
    setRange(value);
  };

  const handleReset = () => {
    setRange([minTimestamp, maxTimestamp]);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      start: minTimestamp.toString(),
      end: maxTimestamp.toString(),
    });
  };

  const handleApply = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      start: range[0].toString(),
      end: range[1].toString(),
    });
  };

  const content = (
    <Flex vertical>
      <Flex justify="center" align="center" gap="large">
        <Input
          placeholder={moment(minTimestamp).format("YYYY-MM-DD")}
          type="date"
          value={moment(range[0]).format("YYYY-MM-DD")}
          onChange={(e) =>
            handleSliderChange([moment(e.target.value).valueOf(), range[1]])
          }
          min={minDate}
          max={maxDate}
        />
        -
        <Input
          placeholder={moment(maxTimestamp).format("YYYY-MM-DD")}
          type="date"
          value={moment(range[1]).format("YYYY-MM-DD")}
          onChange={(e) =>
            handleSliderChange([range[0], moment(e.target.value).valueOf()])
          }
          min={minDate}
          max={maxDate}
        />
      </Flex>
      <Slider
        range
        value={range}
        onChange={handleSliderChange}
        min={minTimestamp}
        max={maxTimestamp}
        tipFormatter={(value) => moment(value).format("YYYY-MM-DD")}
      />
      {!!CheckDateError(range) && (
        <p className="text-primary opacity-90">{CheckDateError(range)}</p>
      )}
      <Flex gap="small" className="justify-end">
        <Button color="danger" variant="link" onClick={handleReset}>
          Reset
        </Button>
        <Button
          disabled={!!CheckDateError(range)}
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
        Date
      </Button>
    </Popover>
  );
};
