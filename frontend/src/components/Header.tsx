import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be implemented later
    console.log('Search:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-black rounded-br-lg rounded-tr-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">hd</span>
            </div>
            <span className="text-black font-semibold text-lg">highway delite</span>
          </div>
          
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md ml-4">
            <input
              type="text"
              placeholder="Search experiences"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-light rounded-lg border border-gray-medium text-gray-dark placeholder-gray-dark focus:outline-none focus:ring-2 focus:ring-primary-yellow"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary-yellow text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;

