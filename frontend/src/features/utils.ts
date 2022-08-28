export const utils = () => {
  const formatRes = (res: any) => {
    let errorMsg = '';
    if (res.message) return res.message;
    if (res.Message) return res.Message;
    else if (res.errors) {
      res.errors.forEach((el: { msg: string }) => {
        errorMsg += el.msg + '\n';
      });
      return errorMsg;
    } else return JSON.stringify(res);
  };
  return {
    formatRes
  };
};
