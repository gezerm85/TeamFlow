import TeamForm from '../../components/TeamForm/TeamForm';
import TeamEditor from '../../components/TeamEditor/TeamEditor';

const CreateTeamPage = () => {
  return (
    <div className='w-full'>
      <h2 className="text-2xl font-bold mb-4 w-full flex flex-col text-[#1a1a1a] max-md:text-center ">Takım Oluştur ve Düzenle</h2>
      <TeamForm />
      <TeamEditor />
    </div>
  );
};

export default CreateTeamPage;