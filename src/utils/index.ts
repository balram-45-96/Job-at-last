import voucherCodes from 'voucher-code-generator';
import moment from 'moment';
import { getCookieByName } from './cookies';
/* eslint-disable @typescript-eslint/no-explicit-any */
export const createCustomError = (error: any) => {
  let message;
  if (error) {
    const graphQLErrors =
      error.graphQLErrors.length > 0 ? error.graphQLErrors[0] : null;
    message =
      graphQLErrors?.extensions?.response?.message.length > 0
        ? graphQLErrors?.extensions?.response?.message[0]
        : null;
  }
  return message;
};

export const generateCouponCode = (length: number = 4, count: number = 6) => {
  const couponCodes = voucherCodes.generate({
    length,
    count,
    charset: voucherCodes.charset('alphabetic')
  });
  return couponCodes;
};

export const calculatePercentage = (amount: number, percentage: number) => {
  return Math.round((amount * percentage) / 100);
};

export const calculateMeetingTime = (
  date: string,
  additionalDays: number = 3
) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + additionalDays);
  return newDate;
};

export const formatDate = (date: Date, format: string) => {
  return moment(date).format(format);
};

export const stringToDate = (date: string) => {
  const newDate = new Date(date);
  return newDate;
};

export const isLoggedIn = () => {
  const token = getCookieByName('token');
  return !!token;
};
