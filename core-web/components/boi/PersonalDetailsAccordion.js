/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { PersonalDetails } from '@vodafone/core-redux/constants/boi/UserPreferencesImmutables';
import AccordionCard from '../AccordionCard';
import { Occupations, EmploymentStatusOptions } from '../../mocks/homeQuote';
import { DriversLicenceOptions } from '../../mocks/carQuote';
import { HealthInsuranceOptions } from '../../mocks/travelQuote';

interface State {
  personalDetails: PersonalDetails;
}

interface Props {
  quoteType: string;
  completed: boolean;
  personalDetails: PersonalDetails;
  onPersonalDetailChange: (name: string, value: any) => any;
}

class PersonalDetailsAccordion extends React.Component<Props, State> {
  state = {
    personalDetails: new PersonalDetails(),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      personalDetails: props.personalDetails,
    };
  }

  render() {
    const {
      quoteType,
      completed,
      onPersonalDetailChange,
      personalDetails,
    } = this.props;
    const {
      firstName,
      lastName,
      eircode,
      mobileNumber,
      emailAddress,
      dateOfBirth,
      parkOvernight,
      employmentStatus,
      currentOccupation,
      healthInsurance,
      healthInsuranceCompany,
      driversLicence,
      driversLicenceNumber,
    } = personalDetails;

    const personalDetailsAccordionInfo = [
      {
        dataType: 'text',
        label: 'First Name',
        value: firstName,
        name: 'firstName',
      },
      {
        dataType: 'text',
        label: 'Last Name',
        value: lastName,
        name: 'lastName',
      },
      {
        dataType: 'text',
        label: 'Eircode',
        value: eircode,
        name: 'eircode',
      },
      {
        dataType: 'toggle',
        label: 'Do you park your car at this address overnight?',
        checked: parkOvernight,
        name: 'parkOvernight',
        onlyFor: ['car'],
      },
      {
        dataType: 'text',
        label: 'Mobile number',
        value: mobileNumber,
        name: 'mobileNumber',
      },
      {
        dataType: 'text',
        label: 'Email Address',
        value: emailAddress,
        name: 'emailAddress',
      },
      {
        dataType: 'date',
        label: 'Date of Birth',
        value: dateOfBirth,
        name: 'dateOfBirth',
      },
      {
        dataType: 'selectBox',
        label: 'Employment Status',
        options: EmploymentStatusOptions,
        value: employmentStatus,
        name: 'employmentStatus',
        onlyFor: ['home', 'car'],
      },
      {
        dataType: 'search',
        label: 'Current Occupation',
        options: Occupations,
        value: currentOccupation,
        name: 'currentOccupation',
        onlyFor: ['home', 'car'],
      },
      {
        dataType: 'selectBox',
        label: 'Drivers Licence Type',
        options: DriversLicenceOptions,
        value: driversLicence,
        name: 'driversLicence',
        onlyFor: ['car'],
      },
      {
        dataType: 'text',
        label: 'Drivers Licence Number',
        value: driversLicenceNumber,
        name: 'driversLicenceNumber',
        onlyFor: ['car'],
      },
      {
        dataType: 'toggle',
        label: 'Do you have health insurance?',
        checked: healthInsurance,
        name: 'healthInsurance',
        onlyFor: ['travel'],
      },
      {
        dataType: 'selectBox',
        label: 'With whom?',
        options: HealthInsuranceOptions,
        value: healthInsuranceCompany,
        name: 'healthInsuranceCompany',
        onlyFor: ['travel'],
      },
    ];
    const filteredFields = personalDetailsAccordionInfo.filter((item, idx) => {
      return (
        !item.onlyFor || (item.onlyFor && item.onlyFor.includes(quoteType))
      );
    });

    return (
      <AccordionCard
        cardSubtitle="Please answer these remaining questions"
        title="About you"
        active={true}
        completed={completed}
        fields={filteredFields}
        handleChange={(name, value) => onPersonalDetailChange(name, value)}
      />
    );
  }
}

export default PersonalDetailsAccordion;
