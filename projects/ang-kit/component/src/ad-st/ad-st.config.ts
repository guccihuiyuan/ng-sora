import {ADSTReqReName, ADSTResReName} from './ad-st.interface';

export class ADSTConfig {
  dataKey = 'id';
  reqMethod: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'POST';
  reqReName?: ADSTReqReName = {
    page: {
      pageNo: 'pageNo',
      pageSize: 'pageSize'
    },
    sortKey: {
      sortName: 'sortName',
      sortValue: 'sortValue'
    },
    sortValue: {
      ascend: 'ascend',
      descend: 'descend'
    },
    sortWrapKey: 'sort',
    filterWrapKey: 'filter'
  };
  resReName?: ADSTResReName = {
    list: 'list',
    total: 'total'
  };
  size: 'small' | 'middle' | 'default' = 'middle';
  showBordered = true;
  showNumber = false;
  maxCheckedCount = 500;
  tdClassName = null;
  tdStyles?: {[key: string]: string} = null;
  thClassName = null;
  thStyles?: {[key: string]: string} = null;
}
