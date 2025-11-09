import BusinessUnitForm from '../BusinessUnitForm';

export default function BusinessUnitFormExample() {
  return (
    <BusinessUnitForm
      onSubmit={(data) => console.log('Form submitted:', data)}
      onCancel={() => console.log('Form cancelled')}
    />
  );
}
