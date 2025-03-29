import { getCookieByName, isCookieExists, setCookies } from '@/utils/cookies';
import { useState, useMemo } from 'react';

const lookupCountryByDeviceIP = async () => {
  const URL = `https://ipapi.co/json`;
  const res = await fetch(URL);
  const ipDetail = await res.json();
  return ipDetail;
};

const useConutryCode = () => {
  const [countryCode, setCountryCode] = useState('IN');
  const [countryName, setCountryName] = useState('india');
  const [region, setRegion] = useState('');
  const [callingCode, setCallingCode] = useState('+91');
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  useMemo(async () => {
    let countryShortName = '';
    let countryCallingCode = '';
    let countryCurrency = '';
    let currentRegion = '';
    let currentTimezone = '';
    let fetchedCountryName = '';
    if (isCookieExists('country_code')) {
      countryShortName = getCookieByName('country_code') ?? '';
      countryCallingCode = getCookieByName('country_calling_code') ?? '';
      countryCurrency = getCookieByName('currency') ?? '';
      currentRegion = getCookieByName('region') ?? '';
      currentTimezone = getCookieByName('timezone') ?? '';
      fetchedCountryName = getCookieByName('country_name') ?? '';
    } else {
      const ipDetail = await lookupCountryByDeviceIP();
      countryShortName = ipDetail['country_code'];
      countryCallingCode = ipDetail['country_calling_code'];
      countryCurrency = ipDetail['currency'];
      currentRegion = ipDetail['region'];
      currentTimezone = ipDetail['timezone'];
      fetchedCountryName = ipDetail['country_name'];
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30);
      setCookies('country_code', countryShortName, expires);
      setCookies('country_calling_code', countryCallingCode, expires);
      setCookies('currency', countryCurrency, expires);
      setCookies('region', currentRegion, expires);
      setCookies('timezone', currentTimezone, expires);
      setCookies('country_name', fetchedCountryName, expires);
    }
    setCountryCode(countryShortName);
    setCallingCode(countryCallingCode);
    setCurrency(countryCurrency === 'INR' ? 'INR' : 'USD');
    setTimezone(currentTimezone);
    setRegion(currentRegion);
    setCountryName(fetchedCountryName);
  }, []);

  return { countryCode, callingCode, currency, region, countryName, timezone };
};

export default useConutryCode;
