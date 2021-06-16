import CaregiverForm from '../../components/CaregiverForm/CaregiverForm';

export default function BecomeCaregiverPage({ setUser }) {

  return (
    <main>
      <h1>Become A Caregiver</h1>
      <CaregiverForm setUser={setUser} />
    </main>
  );
}