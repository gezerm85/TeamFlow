import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <div className="w-64" role="presentation">
      <div className="flex justify-end p-2">
        <button onClick={toggleDrawer(false)}>
          <AiOutlineClose size={24} color="#000" />
        </button>
      </div>
      <ul className="flex flex-col p-4 space-y-4">
        <li>
          <Link
            to="/list"
            className="text-[#1a1a1a] text-base font-semibold hover:text-gray-300"
          >
            Takımları Listele
          </Link>
        </li>
        <li>
          <Link
            to="/diagram"
            className="text-[#1a1a1a] text-base font-semibold hover:text-gray-300"
          >
            Grafik Analizi
          </Link>
        </li>
        <li>
          <Link to="/create" className="text-[#1a1a1a]">
            <button className={styles.buttons}>
              <span className={`${styles.button_top} font-semibold`}>Takım Oluştur</span>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <header className="bg-[#e8e8e8] px-8 shadow h-20 flex">
      <div className="w-full flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#1a1a1a]">
          TeamFlow
        </Link>
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: '#000' }} />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <nav className="flex items-center justify-between">
            <ul className="flex gap-4 items-center justify-center">
              <li>
                <Link
                  to="/list"
                  className="text-[#1a1a1a] text-base font-semibold hover:text-gray-300"
                >
                  Takımları Listele
                </Link>
              </li>
              <li>
                <Link
                  to="/diagram"
                  className="text-[#1a1a1a] text-base font-semibold hover:text-gray-300"
                >
                  Grafik Analizi
                </Link>
              </li>
              <div className="w-[1px] h-9 border border-[#c7c7c7] mx-2"></div>
              <li>
                <Link to="/create" className="text-[#1a1a1a]">
                  <button className={styles.buttons}>
                    <span className={`${styles.button_top} font-semibold`}>Takım Oluştur</span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
