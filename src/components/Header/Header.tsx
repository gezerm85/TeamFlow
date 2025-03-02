import { Link } from 'react-router-dom';
import styles from './styles.module.css'

const Header = () => {
  return (
    <header className="bg-[#e8e8e8] px-8 shadow h-20 flex ">
      <div className=" w-full flex justify-between items-center">
        <Link  to="/" className="text-xl font-bold text-[#1a1a1a] ">Takım Yönetimi Uygulaması</Link>
        <nav className='flex items-center justify-between'>
          <ul className="flex gap-4 items-center justify-center">
      
            <li>
              <Link to="/list" className="text-[#1a1a1a] text-base font-semibold hover:text-gray-300">
                Takımları Listele
              </Link>
            </li>
            <li>
              <Link to="/diagram" className="text-[#1a1a1a] text-base font-semibold hover:text-gray-300">
                 Grafik Analizi
              </Link>
            </li>
            <div className='w-[1px] h-9 border border-[#c7c7c7] mx-2  '></div>
            <li className=''>
              <Link to="/create" className="text-[#1a1a1a]  hover:text-gray-300">
              
                <button className={styles.buttons}>
                  <span className={`${styles.button_top} font-semibold`} > Takım Oluştur </span>
                </button>

              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;