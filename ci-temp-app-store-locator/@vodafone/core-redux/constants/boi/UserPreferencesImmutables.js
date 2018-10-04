/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const PersonalDetails = Record(
  ({
    firstName: null,
    lastName: null,
    eircode: null,
    mobileNumber: null,
    emailAddress: null,
    dateOfBirth: null,
    parkOvernight: false,
    employmentStatus: null,
    currentOccupation: null,
    healthInsurance: false,
    healthInsuranceCompany: null,
    driversLicence: null,
    driversLicenceNumber: null,
  }: {
    firstName: string | null,
    lastName: string | null,
    eircode: string | null,
    mobileNumber: string | null,
    emailAddress: string | null,
    dateOfBirth: string | null,
    parkOvernight: boolean,
    employmentStatus: string | null,
    currentOccupation: string | null,
    healthInsurance: boolean,
    healthInsuranceCompany: string | null,
    driversLicence: string | null,
    driversLicenceNumber: string | null,
  }),
);

const UserPreferences = Record(
  ({
    loading: false,
    errorMsg: null,
    personalDetails: new PersonalDetails(),
  }: {
    loading: boolean,
    errorMsg: string | null,
    personalDetails: PersonalDetails,
  }),
);
export { PersonalDetails, UserPreferences };
