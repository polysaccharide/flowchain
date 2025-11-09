import BusinessUnitList from '../BusinessUnitList';
import type { BusinessUnit } from '@shared/schema';

const mockBusinessUnits: BusinessUnit[] = [
  {
    id: '1',
    businessUnitCode: 'ANC',
    dc: 'ALL NOW COMPLEX',
    customerSapCode: 'SAP001',
    vehicleGroup: 'Lotus',
    productType: 'Type A',
    remark: 'Sample remark',
    orderTemplate: 'Template 1',
    newJob: true,
    hubAvailable: false,
    firstShipment: true,
    subContractors: ['Sub 1', 'Sub 2'],
  },
  {
    id: '2',
    businessUnitCode: 'ANC',
    dc: 'ALL Complex',
    customerSapCode: 'SAP002',
    vehicleGroup: 'Honda',
    productType: 'Type B',
    remark: '',
    orderTemplate: 'Template 2',
    newJob: false,
    hubAvailable: true,
    firstShipment: false,
    subContractors: [],
  },
];

export default function BusinessUnitListExample() {
  return (
    <BusinessUnitList
      businessUnits={mockBusinessUnits}
      onDelete={(id) => console.log('Delete:', id)}
    />
  );
}
