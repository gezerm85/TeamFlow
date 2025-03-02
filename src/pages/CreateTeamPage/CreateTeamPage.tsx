import TeamForm from '../../components/TeamForm/TeamForm';
import TeamEditor from '../../components/TeamEditor/TeamEditor';

const CreateTeamPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Takım Oluştur ve Düzenle</h2>
      <TeamForm />
      <TeamEditor />
    </div>
  );
};

export default CreateTeamPage;