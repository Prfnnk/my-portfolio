import TransitionLink from '@/app/components/transition/TransitionLink';
import './backButton.scss';

const BackButton = ({ href = '/', className = '', label = 'Experiments' }) => {
  return (
    <TransitionLink
      href={href}
      className={`back-btn ${className}`}
      ariaLabel={`Go back to ${label}`}
      label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="back-btn__icon"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </TransitionLink>
  );
};

export default BackButton;
