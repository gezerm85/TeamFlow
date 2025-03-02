import { useContext } from "react";
import { TeamContext } from "../../contexts/TeamContext";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./ListTeamsPage.module.css";

const ListTeamsPage = () => {
  const { teams } = useContext(TeamContext);

  if (teams.length === 0) {
    return (
      <div className="p-4 bg-transparent min-h-screen text-white flex flex-col justify-center items-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <FaInfoCircle className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-white mb-2">Veri bulunamadı</p>
          <p className="text-gray-400 text-center">
            Lütfen takım ekleyin ve kullanıcılarınızı oluşturun.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-8">
      <div className="w-full flex items-center justify-start max-md:justify-center gap-4 flex-wrap">
        {teams.map((e) => (
          <div className={`${styles.book} bg-[#1a1a1a]`}>
            <ul className="  h-full pt-4">
              {e.users.length !== 0 
              ? (
                e.users.map((item, i) => (
                  <li className="text-[#fff] capitalize text-xs">
                    {i + 1}: {item.name}
                  </li>
                ))
              )
              :(
               <div className="flex items-center justify-center h-full ">
                 <p className="text-white text-xs text-center">
                  Kullanıcı Bulunmamaktadır 
                </p>
               </div>
              )
            }
            </ul>
            <div className={`${styles.cover} bg-[#e6e6e6]`}>
              <p className="text-black capitalize">{e.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTeamsPage;
