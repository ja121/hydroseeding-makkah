import React from 'react';
import styles from './Dashboard.module.css';
import DataCard from '../DataCard/DataCard';
import MapComponent from '../Map/Map';
import { FaWater, FaSeedling, FaMountain } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>Hydroseeding Project</span>
        </div>
        <div className={styles.userProfile}>
          <button className={styles.profileBtn}>مستخدم</button>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* قسم الخريطة التفاعلية */}
        <div className={styles.mapContainer}>
          <MapComponent />
        </div>

        {/* قسم بطاقات البيانات */}
        <div className={styles.dataCardsGrid}>
          <DataCard 
            title="رطوبة التربة" 
            value="65%" 
            icon={<FaWater />}
          />
          
          <DataCard 
            title="احتمالية نجاح الزراعة" 
            value="85%" 
            icon={<FaSeedling />}
          />
          
          <DataCard 
            title="تحليل الانحدار" 
            value="10%" 
            icon={<FaMountain />}
          />
          
          <DataCard 
            title="المساحة المغطاة" 
            value="6484 هكتار"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
