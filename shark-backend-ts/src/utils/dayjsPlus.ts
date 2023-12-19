import dayjs from 'dayjs';

const getCommonFormatter = () => 'YYYY-MM-DD HH:mm:ss';
const dayjsF = () => dayjs().format(getCommonFormatter());

export default {
  getCommonFormatter,
  dayjsF,
  dayjs,
};
