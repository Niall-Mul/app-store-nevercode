import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';

export const Quotes = {
  travel: [
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Basic',
      pros: ['Medical coverage', 'Luggage coverage'],
      price: 74,
    },
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Enhanced',
      pros: ['Personal belongings', 'Cancellation protection'],
      price: 85,
    },
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Premium',
      pros: ['Cancellation protection', 'Personal cash coverage'],
      price: 105,
    },
  ],
  home: [
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Basic',
      pros: ['Fire Brigade Charges', 'Replacement locks'],
      price: 350,
    },
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Enhanced',
      pros: ['Fire Brigade Charges', 'Replacement locks'],
      price: 335,
    },
    {
      logo: `${assetsUriPrefix}assets/boi-blue-transparent.png`,
      plan: 'Premium',
      pros: ['Fire Brigade Charges', 'Replacement locks'],
      price: 340,
    },
  ],
  car: [
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Basic',
      pros: ['Car & Key Rescue', 'Replacement locks'],
      price: 450,
    },
    {
      logo: `${assetsUriPrefix}assets/boi-blue-transparent.png`,
      plan: 'Enhanced',
      pros: ['Protected No Claims Discount', 'Replacement locks'],
      price: 475,
    },
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Premium',
      pros: ['Protected No Claims Discount', 'Car & Key Rescue', 'Replacement locks'],
      price: 500,
    },
  ],
  carRenewal: [
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Basic',
      pros: ['Car & Key Rescue', 'Replacement locks'],
      price: 450,
    },
    {
      currentInsurer: true,
      logo: `${assetsUriPrefix}assets/boi-blue-transparent.png`,
      plan: 'Enhanced',
      pros: ['Protected No Claims Discount', 'Replacement locks'],
      price: 475,
    },
    {
      logo: `${assetsUriPrefix }assets/boi-blue-transparent.png`,
      plan: 'Premium',
      pros: ['Protected No Claims Discount', 'Car & Key Rescue', 'Replacement locks'],
      price: 500,
    },
  ],
};

export const QuoteInformation = {
  home: [
    { name: 'High Risk Items / Valuables Limit', value: '€4,000' },
    { name: 'Specified All Risk Items', value: 'Yes' },
    { name: 'Trace & Access Limit', value: '€750' },
    { name: 'Temp Alt Accomodation', value: '20% of BSI/CSI' },
    { name: 'Contents Temp Removed', value: '15% of CSI' },
    { name: 'Fatal Accident Benefit', value: '€3,250' },
    { name: 'Fridge Contents', value: 'Unlimited' },
    { name: 'Fire Brigade Charges', value: '€2,000' },
    { name: 'Contents in the Open', value: '€500' },
    { name: 'Satellite/Aerials', value: '€650' },
    { name: 'Wedding Gifts', value: '10% over CSI Max' },
    { name: 'Xmas Gifts', value: '10% over CSI Max' },
    { name: 'Public/Legal Liability', value: '€1,300,000' },
    { name: 'Domestic Employee Liability', value: '€2,600,000' },
    { name: 'Loss of oil/water', value: 'up to €2,600,000' },
    { name: 'No claims discount', value: '40% No-claim discount' },
  ],
  travel: [
    { name: 'Emergency medical expenses', value: '€1,000,000' },
    { name: 'Delayed personal possessions', value: '€55' },
    { name: 'Personal accident', value: '€5,500' },
    { name: 'Missing departure', value: '€275' },
    { name: 'Delayed departure', value: '€110' },
    { name: 'Personal liability', value: '€1,000,000' },
  ],
  car: [
    { name: 'Protected No Claims Discount', value: '' },
    { name: 'Car & Key Rescue', value: '€1,500' },
    { name: 'Open Driving', value: '' },
    { name: 'Glass Breakage', value: '€250' },
    { name: 'Comprehensive driving of other cars', value: '€50,000' },
    { name: 'Injury to Driver', value: '€10,000' },
  ],
  carRenewal: [
    { name: 'Protected No Claims Discount', value: '' },
    { name: 'Car & Key Rescue', value: '€1,500' },
    { name: 'Open Driving', value: '' },
    { name: 'Glass Breakage', value: '€250' },
    { name: 'Comprehensive driving of other cars', value: '€50,000' },
    { name: 'Injury to Driver', value: '€10,000' },
  ],  
};
