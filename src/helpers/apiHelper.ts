export const responseFormat = (
  success: boolean,
  data: any = null,
  message: string = "",
  code: number = success ? 200 : 400
) => {
  return {
    success,
    data,
    message,
    code,
  };
};

export const responseFormatPaginated = (
  success: boolean,
  data: {
    data: any[] | null;
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  } = {
    data: null,
    meta: {
      current_page: 1,
      from: 0,
      last_page: 0,
      path: "",
      per_page: 0,
      to: 0,
      total: 0,
    },
  },
  message: string = "",
  code: number = 200
) => {
  return {
    success,
    data,
    message,
    code,
  };
};
