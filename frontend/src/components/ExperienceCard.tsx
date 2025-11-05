import { useNavigate } from 'react-router-dom';
import type { Experience } from '../types/index';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-48">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-black">{experience.title}</h3>
          <span className="px-3 py-1 bg-gray-light text-gray-dark text-xs rounded-full whitespace-nowrap ml-2">
            {experience.location}
          </span>
        </div>
        <p className="text-sm text-gray-dark mb-4 line-clamp-2">
          {experience.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-dark">From </span>
            <span className="text-lg font-bold text-black">₹{experience.price}</span>
          </div>
          <button
            onClick={() => navigate(`/details/${experience.id}`)}
            className="px-4 py-2 bg-primary-yellow text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

