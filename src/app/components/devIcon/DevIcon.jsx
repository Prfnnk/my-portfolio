import Image from 'next/image';
import ShopifyLogo from '@/app/components/svg/ShopifyLogo';

const DevIcon = ({ icon, iconName }) => {
  const renderIcon = (icon, iconName) => {
    if (typeof icon === 'string') {
      if (icon === 'Shopify') {
        return <ShopifyLogo />;
      }
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
