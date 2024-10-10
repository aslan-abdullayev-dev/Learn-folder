import { useLocation } from "react-router-dom";
import { TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";

import { ITenderFilterModalForm } from "../types/all-tenders-filter-modal-props.ts";
import { apiUrls } from "../../../shared/constants/apiUrls.ts";
import { ITender } from "../types/tender-type.ts";
import api from "../../../shared/lib/Api.ts";

const useTenderDataFilter = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [tablePaginationConfigs, setTablePaginationConfigs] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const [tendersData, setTendersData] = useState<ITender[]>([]);

  const createQueryFromObject = (
    paramsObj: URLSearchParams,
    formValues: ITenderFilterModalForm
  ): string => {
    Object.entries(formValues).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => paramsObj.append(key, item));
      } else {
        paramsObj.append(key, value);
      }
    });

    return paramsObj.toString()
  }

  const createObjectFromQuery = (
    paramsObj: URLSearchParams,
  ): ITenderFilterModalForm => {
    return {
      eventStatus: paramsObj.get('eventStatus') ? Number(paramsObj.get('eventStatus')) : 1,
      buyerOrganizationIds: paramsObj.getAll('buyerOrganizationIds').map(Number) || [],
      eventNumber: paramsObj.get('eventNumber') || "",
      fromPublishDate: paramsObj.get('fromPublishDate') || "",
      toPublishDate: paramsObj.get('toPublishDate') || "",
      categoryCodeIds: paramsObj.getAll('categoryCodeIds').map(Number) || [],
      eventName: paramsObj.get('eventName') || "",
      awardedParticipantName: paramsObj.get('awardedParticipantName') || "",
      awardedParticipantVoen: paramsObj.get('awardedParticipantVoen') || ""
    }
  }

  const getTenderFilteredData = (newPaginationConfig: TablePaginationConfig) => {
    api({
      method: "post",
      url: apiUrls.tender.getAll(newPaginationConfig.current!),
      data: createObjectFromQuery(urlParams)
    })
      .then(({ data }) => {
        setTendersData(data.data);
        setTablePaginationConfigs({
          ...tablePaginationConfigs,
          total: data.paginationInfo.totalElements,
          current: data.paginationInfo.currentPage,
        })
      })
  }

  useEffect(() => {
    getTenderFilteredData({ current: tablePaginationConfigs.current!, pageSize: 5 })
  }, [location]);

  return {
    tendersData,
    setTendersData,
    createObjectFromQuery,
    createQueryFromObject,
    getTenderFilteredData,
    tablePaginationConfigs
  };
}

export default useTenderDataFilter;