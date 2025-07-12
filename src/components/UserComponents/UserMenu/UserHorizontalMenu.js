import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

const UserHorizontalMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { machine } = useParams();

  const HorizontalStyle = {
    display: 'flex',
    gap: '20px',
    wrap: 'no-wrap',
    justifyContent: 'center',
    alignItems: 'center'
  };

  // Jeśli nie ma parametru machine, nie pokazuj menu
  if (!machine) return null;

  // Wyciągamy segment ścieżki (np. "psg1" z "/user/psg1")
  const currentSegment = location.pathname.split('/')[2] || 'main';

  // Uniwersalne opcje menu
  const universalOptions = [
    { id: '0', label: 'Strona Główna', path: `/user/${machine}` },
    { id: '1', label: 'Plany', path: `/user/${machine}/plans` },
    { id: '2', label: 'Zamówienia', path: `/user/${machine}/orders` },
    { id: '3', label: 'Magazyn', path: `/user/${machine}/stock` },
    { id: '4', label: 'Narzędzia', path: `/user/${machine}/tools` },
  ];

  const handleClick = (path) => {
    if (location.pathname !== path) {
      navigate(path, { replace: true });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSegment}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="userHorizontalMenu" style={HorizontalStyle}>
          {universalOptions.map(option => (
            <button
              key={option.id}
              className="menu-item"
              onClick={() => handleClick(option.path)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserHorizontalMenu;
