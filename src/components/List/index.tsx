import { Button, Flex, Image, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const minDate = "1900-01-01";
const maxDate = moment().format("YYYY-MM-DD");
const minTimestamp = moment(minDate).valueOf();
const maxTimestamp = moment(maxDate).valueOf();

export const List = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const fetchData = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://stage-elevate.elevatesofts.com/api/external/dummy_users",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyYmQyOGJiZi0yMTcxLTQ4NmEtYTM5ZC1lOTdlZmM2YTRmMDQiLCJzdWIiOjEsImV4dGVybmFsX3R5cGUiOiJkdW1teV91c2VycyIsImlhdCI6MTczMzUwNDg4MSwiZXhwIjoxNzM0MTA5NjgxfQ.ZhZd9iR_MThbo8zO_agZbIQKK65DwcmZDRXEDrL4nzg",
          },
          params: {
            "q[dob_gteq]": moment(
              parseInt(searchParams.get("start") || minTimestamp.toString(), 10)
            ).format("YYYY-MM-DD"),
            "q[dob_lteq]": moment(
              parseInt(searchParams.get("end") || maxTimestamp.toString(), 10)
            ).format("YYYY-MM-DD"),
            "q[price_gteq]": parseInt(searchParams.get("min") || "0", 10),
            "q[price_lteq]": parseInt(searchParams.get("max") || "1000", 10),
            page: currentPage,
            per_page: 10,
          },
        }
      );
      if (response?.status) {
        const res = response?.data;
        setData({
          ...res,
          data:
            currentPage === 1
              ? [...(res?.data || [])]
              : [...(data?.data || []), ...(res?.data || [])],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasMorePages =
    Number(data?.meta?.pagination?.page) <
    Number(data?.meta?.pagination?.pages);

  return (
    <Flex
      justify="start"
      align="start"
      gap="middle"
      vertical
      className="w-full p-4"
    >
      {data?.data?.map((user: any) => {
        return (
          <>
            <div className="h-[1px] bg-gray-50 w-full " />
            <Flex justify="center" align="start" gap="middle">
              <Image
                className="rounded-full"
                width={40}
                src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
              />
              <Flex vertical justify="start" align="start" gap="small">
                <p className="font-bold">{user?.full_name}</p>
                <p className="opacity-50">Email: {user?.email}</p>
                <p className="opacity-50">Price: {user?.price}</p>
                <p className="opacity-50">Date Of Birth: {user?.dob}</p>
              </Flex>
            </Flex>
          </>
        );
      })}

      <div className="h-[1px] bg-gray-50 w-full " />
      {loading ? (
        <Flex className="mt-10 w-full" justify="center" align="center">
          <Spin size="large" />
        </Flex>
      ) : (
        hasMorePages && (
          <Flex justify="center" align="center" className="w-full">
            <Button onClick={() => fetchData(data?.meta?.pagination?.page + 1)}>
              Load More...
            </Button>
          </Flex>
        )
      )}
    </Flex>
  );
};
