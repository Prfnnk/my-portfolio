import Image from 'next/image';

const DevIcon = ({ icon, iconName }) => {
  const renderIcon = (icon, iconName) => {
    if (typeof icon === 'string') {
      return (
        <i className={`devicon-${icon} icon-plain`} area-label={iconName}></i>
      );
    }
    return (
      <div className="icon-image">
        <Image src={icon} alt={iconName} />
      </div>
    );
  };
  return <>{renderIcon(icon, iconName)}</>;
};

export default DevIcon;
